"use client";
import { DataGrid, GridToolbar } from '@mui/x-data-grid';
import { Box, Button } from '@mui/material';
import { ukUA } from '@mui/x-data-grid/locales';
import { getCookie } from '@/utils/cookies';
import { useRouter } from 'next/navigation';

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

    return <Button onClick={handleApprove}>Approve</Button>
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

    return <Button onClick={handleDelete}>Delete</Button>
}

const headers = [
    { field: 'idseq', headerName: 'IDSEQ', width: 80 },
    { field: 'kanji', headerName: 'Kanji', width: 70 },
    { field: 'hiragana', headerName: 'Hiragana', width: 100 },
    { field: 'katakana', headerName: 'Katakana', width: 100 },
    { field: 'romaji', headerName: 'Romaji', width: 130 },
    { field: 'transliteration', headerName: 'Transliteration', width: 130 },
    { field: 'kunyomi', headerName: 'Kunyomi', width: 130 },
    { field: 'onyomi', headerName: 'Onyomi', width: 130 },
    { field: 'ua_translation', headerName: 'Ukrainian Translation', width: 200 },
    { field: 'en_translation', headerName: 'English Translation', width: 200 },
    { field: 'created_by', headerName: 'Submitter', width: 130, renderCell: (params) => <>{params.row.created_by.username}</> },
    {
        field: 'approved', headerName: 'Approved', width: 130,
        renderCell: (params) => <>
            {params.row.approved ? `✅ by ${params.row.approved_by.username}` : "❌"}</>
    },
    { field: 'buttons', headerName: '', width: 100, renderCell: () => <Button>Edit</Button> },
    { field: 'approve_button', headerName: '', width: 100, renderCell: (params) => <ApproveButton uuid={params.row.uuid}>Approve</ApproveButton> },
    { field: 'delete_button', headerName: '', width: 100, renderCell: (params) => <DeleteButton uuid={params.row.uuid}>Delete</DeleteButton> },
];

export default function Table({ rows }) {

    const handleRowSelection = (row) => {
        console.log(row)
    }

    return (
        <Box>
            <DataGrid
                rows={rows}
                columns={headers}
                initialState={{
                    pagination: {
                        paginationModel: { page: 0, pageSize: 10 },
                    },
                    columns: {
                        columnVisibilityModel: {
                            uuid: false,
                        }
                    }
                }}
                pageSizeOptions={[10, 15]}
                getRowId={(row) => row.uuid}
                onRowDoubleClick={(row) => handleRowSelection(row)}
                slots={{ toolbar: GridToolbar }}
                slotProps={{
                    toolbar: {
                        showQuickFilter: true,
                    },
                }}
                localeText={ukUA.components.MuiDataGrid.defaultProps.localeText}
                disableRowSelectionOnClick
            />
        </Box>
    )
}