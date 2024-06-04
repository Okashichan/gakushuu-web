import { Suspense } from 'react';
import { Container } from '@mui/material';
import { getStats } from '@/utils/user';
import Statistics from '@/components/Statistics';

export const fetchCache = 'only-no-store';

const url = `${process.env.NEXT_PUBLIC_API_URL}/user/me/stats`;

async function getUserStats() {
    const stats = await getStats();
    return stats;
}

export default async function Home() {
    const userStats = await getUserStats();

    return (
        <Container component="main" maxWidth="100%" sx={{ padding: "5px" }}>
            <Suspense fallback={<div>Loading...</div>}>
                <Statistics stats={userStats}></Statistics>
            </Suspense>
        </Container>
    )
}