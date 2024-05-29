import { Suspense } from 'react';
import UserPage from '@/components/UserPage';
import { getCurrentUser, getByUserName } from '@/utils/user';

export const fetchCache = 'only-no-store';

async function getUser(username) {
    const user = await getByUserName(username);
    const currentUser = await getCurrentUser();
    const current = currentUser?.username === user?.username

    if (current) {
        return { ...currentUser, current };
    }

    return { ...user, current, currentUser: currentUser };
}

export default async function User({ params }) {

    const user = await getUser(params.name);

    return (
        <Suspense fallback={<div>Loading...</div>}>
            <UserPage user={user} />
        </Suspense>)
}