'use server';

import { cookies } from 'next/headers';

export async function setCookie(name, value) {
    cookies().set(name, value, {
        maxAge: 365 * 24 * 60 * 60,
        httpOnly: true,
        sameSite: 'lax'
    });
}

export async function deleteCookie(name) {
    cookies().delete(name);
}

export async function getCookie(name) {
    return cookies().get(name)?.value;
}

export async function getCookies() {
    return cookies().getAll().values();
}