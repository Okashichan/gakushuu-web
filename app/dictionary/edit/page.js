import { Suspense } from 'react';
import { Container } from '@mui/material';
import Table from '@/components/Table';
// import { getCookie } from '@/utils/cookies';
export const fetchCache = 'only-no-store';

const url = `${process.env.NEXT_PUBLIC_API_URL}/dictionary/all`;

async function getDictionary() {
    const res = await fetch(url);
    const data = await res.json();
    return data;
}

export default async function DictionaryEdit({ params }) {

    const dictionary = await getDictionary();

    // This is possible
    // console.log(await getCookie('token'));

    return (
        <Container component="main" maxWidth="100%" sx={{ padding: "5px" }}>
            <Suspense fallback={<div>Loading...</div>}>
                <Table rows={dictionary}></Table>
            </Suspense>
        </Container>
    )
}