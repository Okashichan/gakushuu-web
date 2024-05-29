import { getCurrentUser } from '@/utils/user';
import HeaderUser from './HeaderUser';

async function getUserData() {
    const user = await getCurrentUser();
    return user;
}

export default async function ServerHeaderUser() {
    const user = await getUserData();

    return (
        <HeaderUser user={user}></HeaderUser>
    );
}
