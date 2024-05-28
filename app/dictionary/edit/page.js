import { Suspense } from 'react';
import { Container } from '@mui/material';
import Table from '@/components/Table';
export const fetchCache = 'only-no-store';

const url = `${process.env.NEXT_PUBLIC_API_URL}/dictionary/all`;

async function getDictionary() {
    const res = await fetch(url);
    const data = await res.json();
    return data;
}

export default async function DictionaryEdit() {

    const dictionary = await getDictionary();

    return (
        <Container component="main" maxWidth="100%" sx={{ padding: "5px" }}>
            <Suspense fallback={<div>Loading...</div>}>
                <Table rowsInit={dictionary}></Table>
            </Suspense>
        </Container>
    )
}