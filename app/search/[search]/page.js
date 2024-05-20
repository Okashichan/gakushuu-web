import { Suspense } from 'react';
import DictionarySearch from '@/components/DictionarySearch';

import { getCurrentUser } from '@/utils/user';

export const fetchCache = 'only-no-store';

async function getUser() {
    const user = await getCurrentUser();
    return user;
}

export default async function Search({ params }) {

    const user = await getUser();

    return (
        <Suspense>
            <DictionarySearch currentUser={user} search={params.search} />
        </Suspense>
    );
}