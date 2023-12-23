"use client";
import * as React from 'react';
import { styled } from '@mui/material/styles';
import { useState, useEffect } from 'react';
import { useRouter } from 'next/navigation';
import Avatar from '@mui/material/Avatar';
import Button from '@mui/material/Button';
import CssBaseline from '@mui/material/CssBaseline';
import TextField from '@mui/material/TextField';
import Link from '@mui/material/Link';
import Grid from '@mui/material/Grid';
import Box from '@mui/material/Box';
import Paper from '@mui/material/Paper';
import LockOutlinedIcon from '@mui/icons-material/LockOutlined';
import CloudUploadIcon from '@mui/icons-material/CloudUpload';
import Typography from '@mui/material/Typography';
import Container from '@mui/material/Container';
import Card from '@mui/material/Card';
import CardContent from '@mui/material/CardContent';
import Divider from '@mui/material/Divider';
import { BorderAll } from '@mui/icons-material';

const BASE_URL = 'http://127.0.0.1:8000';


export default function AddToDictionary({ params }) {
    const [data, setData] = useState(null);

    useEffect(() => {
        const fetchData = async () => {
            try {
                const response = await fetch(`${BASE_URL}/dictionary/jamdict/${params.id}`, {
                    method: 'GET',
                    headers: {
                        'Accept': 'application/json',
                    },
                });

                if (!response.ok) {
                    throw new Error('Network response was not ok');
                }

                const result = await response.json();
                setData(result);
            } catch (err) {
                console.log(err.message || 'An error occurred');
            }
        };

        fetchData();
    }, []);

    const submitData = async (data) => {
        try {
            const response = await fetch(`${BASE_URL}/dictionary`, {
                method: 'POST',
                headers: {
                    'Content-Type': 'application/json',
                    'Authorization': 'Bearer ' + localStorage.getItem('token')
                },
                body: JSON.stringify(data),
            });

            if (!response.ok) {
                throw new Error('Network response was not ok');
            }

            const result = await response.json();
            console.log(result);
            window.location.href = `/search/${result.original}`;
        } catch (err) {
            console.log(err.message || 'An error occurred');
        }
    };

    const handleChange = (event) => {
        const { name, value } = event.target;
        setData((prevData) => ({
            ...prevData,
            [name]: value,
        }));
        console.log(data);
    };

    const handleSubmit = (event) => {
        event.preventDefault();
        submitData({ ...data, created_at: new Date().toISOString(), last_modified: new Date().toISOString(), author_id: localStorage.getItem('user_id') })
    };

    return (
        <>
            {data &&
                <Container >
                    <Box
                        sx={{
                            marginTop: 8,
                            display: 'flex',
                            flexDirection: 'column',
                            alignItems: 'center',
                        }}
                    >
                        <form onSubmit={handleSubmit}>
                            <TextField
                                style={{ marginBottom: 10 }}
                                label="Original"
                                name="original"
                                value={data.original}
                                onChange={handleChange}
                                fullWidth
                                required
                            />
                            <TextField
                                style={{ marginBottom: 10 }}
                                label="English Translation"
                                name="en_translation"
                                value={data.en_translation}
                                onChange={handleChange}
                                fullWidth
                                required
                            />
                            <TextField
                                style={{ marginBottom: 10 }}
                                label="Ukrainian Translation"
                                name="ua_translation"
                                value={data.ua_translation}
                                onChange={handleChange}
                                fullWidth
                                required
                            />
                            <TextField
                                style={{ marginBottom: 10 }}
                                label="Romanization"
                                name="romanization"
                                value={data.romanization}
                                onChange={handleChange}
                                fullWidth
                                required
                            />
                            <TextField
                                style={{ marginBottom: 10 }}
                                label="Transliteration"
                                name="transliteration"
                                value={data.transliteration}
                                onChange={handleChange}
                                fullWidth
                                required
                            />
                            <TextField
                                style={{ marginBottom: 10 }}
                                label="Comment"
                                name="comment"
                                value={data.comment}
                                onChange={handleChange}
                                fullWidth
                            />
                            <TextField
                                style={{ marginBottom: 10 }}
                                label="Author ID"
                                name="author_id"
                                type="number"
                                value={localStorage.getItem('user_id')}
                                onChange={handleChange}
                                fullWidth
                                required
                                disabled
                            />
                            <Button type="submit" variant="contained" color="primary" >
                                Додати
                            </Button>
                        </form>
                    </Box>
                </Container>
            }
        </>
    );
}