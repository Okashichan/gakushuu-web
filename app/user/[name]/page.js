"use client";
import * as React from 'react';
import { styled } from '@mui/material/styles';
import { useState, useEffect } from 'react';
import { useRouter } from 'next/navigation';
import Avatar from '@mui/material/Avatar';
import Button from '@mui/material/Button';
import Link from '@mui/material/Link';
import Box from '@mui/material/Box';
import Paper from '@mui/material/Paper';
import CloudUploadIcon from '@mui/icons-material/CloudUpload';
import Typography from '@mui/material/Typography';
import Container from '@mui/material/Container';
import { getCookie } from '@/utils/cookies';

const VisuallyHiddenInput = styled('input')({
    clip: 'rect(0 0 0 0)',
    clipPath: 'inset(50%)',
    height: 1,
    overflow: 'hidden',
    position: 'absolute',
    bottom: 0,
    left: 0,
    whiteSpace: 'nowrap',
    width: 1,
});

const url = process.env.NEXT_PUBLIC_API_URL;

export default function UserPage({ params }) {
    const router = useRouter();
    const [user, setUser] = useState(null);

    const uploadAvatar = async (event) => {
        event.preventDefault();

        const data = new FormData();

        console.log(event)
        data.append('image', event.target.files[0]);

        const options = {
            method: 'POST',
            headers: {
                'Authorization': 'Bearer ' + await getCookie('token')
            },
            body: data
        };

        try {
            const response = await fetch(`${url}/user/upload_avatar`, options);

            if (!response.ok) {
                throw new Error(`HTTP error! Status: ${response.status}`);
            }

            const responseData = await response.json();
            setUser(responseData);
            window.location.reload();
        } catch (error) {
            console.error('Error:', error.message);
        }
    }

    const fetchUserData = async () => {
        const options = {
            method: 'GET',
            headers: {
                'Accept': 'application/json',
                'Content-Type': 'application/json',
                'Authorization': 'Bearer ' + await getCookie('token')
            }
        };

        try {
            const response = await fetch(`${url}/user/me`, options);

            if (!response.ok) {
                throw new Error(`HTTP error! Status: ${response.status}`);
            }

            setUser(await response.json());
        } catch (error) {
            console.error('Error:', error.message);
        }
    };

    useEffect(() => {
        fetchUserData();
    }, []);

    return (
        <Container component="main" maxWidth="xs">
            <Box
                sx={{
                    marginTop: 3,
                    display: 'flex',
                    flexDirection: 'column',
                    alignItems: 'center',
                }}
            >
                {user ? (<Paper elevation={3} style={{ padding: 16, maxWidth: 1000, margin: 'auto' }}>
                    <Avatar src={"http://" + user.avatar_url} style={{ width: 80, height: 80, margin: 'auto' }} />
                    <Typography variant="h6" style={{ textAlign: 'center', marginTop: 10 }}>
                        {user.username}
                    </Typography>
                    <Typography variant="body2" color="textSecondary" style={{ textAlign: 'center' }}>
                        Created: {user.created_at}
                    </Typography>
                    <Typography variant="body2" color="textSecondary" style={{ textAlign: 'center' }}>
                        Email: {user.email}
                    </Typography>
                    <Typography variant="body2" color="textSecondary" style={{ textAlign: 'center' }}>
                        Role: {user.role.name}
                    </Typography>
                    <Box>
                        <Button>
                            <Link href={`/user/${params.name}/edit`} underline="none" color="inherit">Редагувати</Link>
                        </Button>
                        <Button component="label" variant="contained" startIcon={<CloudUploadIcon />}>
                            Завантажити аватар
                            <VisuallyHiddenInput type="file" onInput={uploadAvatar} />
                        </Button>
                    </Box>
                </Paper>) : undefined}
            </Box>
        </Container >
    );
}