'use server';

import { getCookie } from '@/utils/cookies';

const url = process.env.NEXT_PUBLIC_API_URL;

export async function getCurrentUser() {
    const token = await getCookie('token');

    if (!token) {
        return null;
    }

    const options = {
        method: 'GET',
        headers: {
            'Accept': 'application/json',
            'Content-Type': 'application/json',
            'Authorization': 'Bearer ' + token
        }
    };

    try {
        const response = await fetch(`${url}/user/me`, options);

        if (!response.ok) {
            throw new Error(`HTTP error! Status: ${response.status}`);
        }

        return await response.json();
    } catch (error) {
        console.error('Error:', error.message);
    }
}