import { Suspense } from 'react';
import { Container } from '@mui/material';
import Quiz from '@/components/Quiz';

export const fetchCache = 'only-no-store';

const url = `${process.env.NEXT_PUBLIC_API_URL}/quiz/hiragana`;

async function getHiraganaQuiz({ params }) {
    const query = new URLSearchParams(params).toString();
    const urlWithQuery = query.length > 0 ? `${url}?${query}` : `${url}?basic=false&size=40`;
    const res = await fetch(urlWithQuery);
    const data = await res.json();
    return {
        data: data,
        query: query
    };
}

export default async function HiraganaQuiz({ searchParams }) {
    const quiz = await getHiraganaQuiz({ params: searchParams });

    return (
        <Container component="main" maxWidth="100%" sx={{ padding: "5px" }}>
            <Suspense fallback={<div>Loading...</div>}>
                <Quiz quiz={quiz.data} query={quiz.query}></Quiz>
            </Suspense>
        </Container>
    )
}