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

const BASE_URL = 'http://127.0.0.1:8000';

export default function UserPage({ params }) {
    const router = useRouter();
    const [user, setUser] = useState(null);

    const uploadAvatar = async (event) => {
        event.preventDefault();

        const url = `${BASE_URL}/user/upload_avatar`;

        const data = new FormData();

        console.log(event)
        data.append('image', event.target.files[0]);

        const options = {
            method: 'POST',
            headers: {
                'Authorization': 'Bearer ' + localStorage.getItem('token')
            },
            body: data
        };

        try {
            const response = await fetch(url, options);

            if (!response.ok) {
                throw new Error(`HTTP error! Status: ${response.status}`);
            }

            const responseData = await response.json();
            console.log(responseData);
            localStorage.setItem('avatar', responseData.avatar_url);
            window.location.reload();
        } catch (error) {
            console.error('Error:', error.message);
        }
    }

    const fetchUserData = async () => {
        const url = `${BASE_URL}/user/${params.id}`;

        console.log(localStorage.getItem('token'))

        const options = {
            method: 'GET',
            headers: {
                'Accept': 'application/json',
                'Content-Type': 'application/json',
                'Authorization': 'Bearer ' + localStorage.getItem('token')
            }
        };

        try {
            const response = await fetch(url, options);

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
        <Container component="main" style={{ background: '#f2f6fc' }}>
            <Box
                sx={{
                    marginTop: 8,
                    display: 'flex',
                    flexDirection: 'column',
                    alignItems: 'center',
                }}
            >
                <Paper elevation={3} style={{ padding: 16, maxWidth: 400, margin: 'auto' }}>
                    <Avatar src={user && user.avatar} style={{ width: 80, height: 80, margin: 'auto' }} />
                    <Typography variant="h6" style={{ textAlign: 'center', marginTop: 10 }}>
                        {user && user.username}
                    </Typography>
                    <Typography variant="body2" color="textSecondary" style={{ textAlign: 'center' }}>
                        Created: {user && user.created_at}
                    </Typography>
                    <Typography variant="body2" color="textSecondary" style={{ textAlign: 'center' }}>
                        Email: {user && user.email}
                    </Typography>
                    <Typography variant="body2" color="textSecondary" style={{ textAlign: 'center' }}>
                        Role: {user && user.role.name}
                    </Typography>
                    <Box>
                        <Button>
                            <Link href={`/user/${params.id}/edit`} underline="none" color="inherit">Edit</Link>
                        </Button>
                        <Button component="label" variant="contained" startIcon={<CloudUploadIcon />}>
                            Upload Avatar
                            <VisuallyHiddenInput type="file" onInput={uploadAvatar} />
                        </Button>
                    </Box>
                </Paper>
            </Box>
        </Container >
    );
}