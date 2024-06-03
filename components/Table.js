"use client";
import {
    GridRowModes,
    DataGrid,
    GridToolbar,
    GridActionsCellItem,
    GridRowEditStopReasons
} from '@mui/x-data-grid';
import {
    Edit as EditIcon,
    Save as SaveIcon,
    Cancel as CancelIcon
} from '@mui/icons-material';
import { Box, Button, TextField } from '@mui/material';
import { ukUA } from '@mui/x-data-grid/locales';
import { getCookie } from '@/utils/cookies';
import { useRouter } from 'next/navigation';
import { useState } from 'react';
import Link from 'next/link';
import { useSearchParams } from 'next/navigation'

const url = `${process.env.NEXT_PUBLIC_API_URL}/dictionary/entry`;

function ApproveButton({ uuid }) {

    const router = useRouter();

    const handleApprove = async () => {
        const options = {
            method: 'PATCH',
            headers: {
                'Accept': 'application/json',
                'Content-Type': 'application/json',
                'Authorization': 'Bearer ' + await getCookie('token')
            },
        };

        const response = await fetch(`${url}/${uuid}`, options);

        router.refresh();
    }

    return <Button onClick={handleApprove} color={'success'}>Схвалити</Button>
}

function DeleteButton({ uuid }) {

    const router = useRouter();

    const handleDelete = async () => {
        const options = {
            method: 'DELETE',
            headers: {
                'Accept': 'application/json',
                'Content-Type': 'application/json',
                'Authorization': 'Bearer ' + await getCookie('token')
            },
        };

        const response = await fetch(`${url}/${uuid}`, options);

        router.refresh();
    }

    return <Button onClick={handleDelete} color={'error'}>Видалити</Button>
}

export default function Table({ rowsInit }) {
    const searchParams = useSearchParams();
    const router = useRouter();
    const [rows, setRows] = useState([]);
    const [rowModesModel, setRowModesModel] = useState({});

    const handleRowEditStop = (params, event) => {
        if (params.reason === GridRowEditStopReasons.rowFocusOut) {
            event.defaultMuiPrevented = true;
        }
    };

    const handleEditClick = (id) => () => {
        setRowModesModel({ ...rowModesModel, [id]: { mode: GridRowModes.Edit } });
    };

    const handleSaveClick = (id) => () => {
        setRowModesModel({ ...rowModesModel, [id]: { mode: GridRowModes.View } });
    };

    const handleCancelClick = (id) => () => {
        setRowModesModel({
            ...rowModesModel,
            [id]: { mode: GridRowModes.View, ignoreModifications: true },
        });

        const editedRow = rows.find((row) => row.id === id);
        if (editedRow?.isNew) {
            setRows(rows.filter((row) => row.id !== id));
        }
    };

    const processRowUpdate = async (newRow) => {
        const updatedRow = { ...newRow, isNew: false };
        setRows(rows.map((row) => (row.id === newRow.id ? updatedRow : row)));

        const unallowed = ['approved_by', 'created_by', 'updated_at', 'isNew', 'approved', 'uuid']

        const filteredRow = Object.keys(updatedRow)
            .filter(key => !unallowed.includes(key))
            .reduce((obj, key) => {
                obj[key] = updatedRow[key];
                return obj;
            }, {});

        const response = await fetch(`${url}/${updatedRow.uuid}`, {
            method: 'POST',
            headers: {
                'Content-Type': 'application/json',
                'Authorization': 'Bearer ' + await getCookie('token'),
            },
            body: JSON.stringify(filteredRow),
        });

        if (!response.ok) {
            throw new Error('Network response was not ok');
        }

        router.refresh();

        return updatedRow;
    };

    const handleRowModesModelChange = (newRowModesModel) => {
        setRowModesModel(newRowModesModel);
    };

    const columns = [
        { field: 'idseq', headerName: 'IDSEQ', width: 80 },
        { field: 'kanji', headerName: 'Канджі', editable: true, width: 70 },
        { field: 'hiragana', headerName: 'Хіраґана', editable: true, width: 100 },
        { field: 'katakana', headerName: 'Катакана', editable: true, width: 100 },
        { field: 'romaji', headerName: 'Ромаджі', editable: true, width: 130 },
        { field: 'transliteration', headerName: 'Транслітерація', editable: true, width: 130 },
        { field: 'kunyomi', headerName: 'Кунйомі', editable: true, width: 130 },
        { field: 'onyomi', headerName: 'Онйомі', editable: true, width: 130 },
        { field: 'ua_translation', headerName: 'Переклад', editable: true, width: 200 },
        { field: 'en_translation', headerName: 'Англійський переклад', editable: true, width: 200 },
        { field: 'created_by', headerName: 'Додано', width: 130, renderCell: (params) => <Link href={`/user/${params.row.created_by.username}`}>{params.row.created_by.username}</Link> },
        {
            field: 'approved', headerName: 'Підтверджено', width: 130,
            renderCell: (params) => <>
                {params.row.approved ? <>✅ <Link href={`/user/${params.row.created_by.username}`}>{params.row.approved_by.username}</Link></> : "❌"}
            </>
        },
        {
            field: 'actions',
            type: 'actions',
            headerName: '',
            width: 100,
            cellClassName: 'actions',
            getActions: ({ id }) => {
                const isInEditMode = rowModesModel[id]?.mode === GridRowModes.Edit;

                if (isInEditMode) {
                    return [
                        <GridActionsCellItem
                            icon={<SaveIcon />}
                            label="Save"
                            sx={{
                                color: 'primary.main',
                            }}
                            onClick={handleSaveClick(id)}
                        />,
                        <GridActionsCellItem
                            icon={<CancelIcon />}
                            label="Cancel"
                            className="textPrimary"
                            onClick={handleCancelClick(id)}
                            color="inherit"
                        />,
                    ];
                }

                return [
                    <GridActionsCellItem
                        icon={<EditIcon />}
                        label="Edit"
                        className="textPrimary"
                        onClick={handleEditClick(id)}
                        color="inherit"
                    />,
                ];
            },
        },
        { field: 'approve_button', headerName: '', width: 100, renderCell: (params) => <ApproveButton uuid={params.row.uuid}></ApproveButton> },
        { field: 'delete_button', headerName: '', width: 100, renderCell: (params) => <DeleteButton uuid={params.row.uuid}></DeleteButton> },
    ];

    return (
        <Box>
            <DataGrid
                rows={rowsInit}
                columns={columns}
                initialState={{
                    pagination: {
                        paginationModel: { page: 0, pageSize: 10 },
                    },
                    columns: {
                        columnVisibilityModel: {
                            uuid: false,
                        }
                    },
                    filter: {
                        filterModel: {
                            items: [{ field: 'idseq', operator: 'equals', value: searchParams.get('idseq') }]
                        },
                    },
                }}
                pageSizeOptions={[10, 15]}
                editMode="row"
                rowModesModel={rowModesModel}
                getRowId={(row) => row.uuid}
                onRowModesModelChange={handleRowModesModelChange}
                onRowEditStop={handleRowEditStop}
                processRowUpdate={processRowUpdate}
                slots={{ toolbar: GridToolbar }}
                slotProps={{
                    toolbar: { setRows, setRowModesModel, showQuickFilter: true, },
                }}
                localeText={ukUA.components.MuiDataGrid.defaultProps.localeText}
                disableRowSelectionOnClick
            />
        </Box>
    )
}