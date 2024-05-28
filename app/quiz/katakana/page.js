import { Suspense } from 'react';
import { Container } from '@mui/material';
import Quiz from '@/components/Quiz';

export const fetchCache = 'only-no-store';

const url = `${process.env.NEXT_PUBLIC_API_URL}/quiz/katakana`;

async function getKatakanaQuiz({ params }) {
    const query = new URLSearchParams(params).toString();
    const urlWithQuery = `${url}?${query}`;
    const res = await fetch(urlWithQuery);
    const data = await res.json();
    return {
        data: data,
        query: query
    };
}

export default async function KatakanaQuiz({ searchParams }) {
    const quiz = await getKatakanaQuiz({ params: searchParams });

    return (
        <Container component="main" maxWidth="100%" sx={{ padding: "5px" }}>
            <Suspense fallback={<div>Loading...</div>}>
                <Quiz quiz={quiz.data} query={quiz.query}></Quiz>
            </Suspense>
        </Container>
    )
}