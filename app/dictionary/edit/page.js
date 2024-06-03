import { Suspense } from 'react';
import { Container } from '@mui/material';
import Table from '@/components/Table';
import { getCurrentUser } from '@/utils/user';
import { redirect } from 'next/navigation';

export const fetchCache = 'only-no-store';

const url = `${process.env.NEXT_PUBLIC_API_URL}/dictionary/all`;

async function getDictionary() {
    const res = await fetch(url);
    const data = await res.json();
    return data;
}

export default async function DictionaryEdit() {
    const access = (await getCurrentUser())?.role?.name === 'linguist';

    if (!access) redirect('/');

    const dictionary = await getDictionary();

    return (
        <Container component="main" maxWidth="100%" sx={{ padding: "5px" }}>
            <Suspense fallback={<div>Loading...</div>}>
                <Table rowsInit={dictionary}></Table>
            </Suspense>
        </Container>
    )
}