"use client";
import { DataGrid, GridToolbar } from '@mui/x-data-grid';
import { Box, Button } from '@mui/material';
import { ukUA } from '@mui/x-data-grid/locales';

const headers = [
    { field: 'idseq', headerName: 'IDSEQ', width: 80 },
    { field: 'kanji', headerName: 'Kanji', width: 130 },
    { field: 'hiragana', headerName: 'Hiragana', width: 130 },
    { field: 'katakana', headerName: 'Katakana', width: 130 },
    { field: 'romaji', headerName: 'Romaji', width: 130 },
    { field: 'transliteration', headerName: 'Transliteration', width: 130 },
    { field: 'kunyomi', headerName: 'Kunyomi', width: 130 },
    { field: 'onyomi', headerName: 'Onyomi', width: 130 },
    { field: 'ua_translation', headerName: 'Ukrainian Translation', width: 200 },
    { field: 'en_translation', headerName: 'English Translation', width: 200 },
    {
        field: 'approved', headerName: 'Approved', width: 130,
        valueGetter: (value) => value ? "✅" : "❌"
    },
    { field: 'buttons', headerName: '', width: 130, renderCell: () => <Button>Edit</Button> },
    { field: 'approve_button', headerName: '', width: 130, renderCell: () => <Button>Approve</Button> }
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