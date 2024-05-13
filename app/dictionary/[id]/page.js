"use client";
import * as React from 'react';
import { useState, useEffect } from 'react';
import Button from '@mui/material/Button';
import TextField from '@mui/material/TextField';
import Box from '@mui/material/Box';
import Container from '@mui/material/Container';
import { getCookie } from '@/utils/cookies';

const url = `${process.env.NEXT_PUBLIC_API_URL}/dictionary/jamdict`;

export default function AddToDictionary({ params }) {
    const [data, setData] = useState(null);

    useEffect(() => {
        const fetchData = async () => {
            try {
                const response = await fetch(`${url}/${params.id}`, {
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
            const response = await fetch(`${url}/dictionary`, {
                method: 'POST',
                headers: {
                    'Content-Type': 'application/json',
                    'Authorization': 'Bearer ' + await getCookie('token'),
                },
                body: JSON.stringify(data),
            });

            if (!response.ok) {
                throw new Error('Network response was not ok');
            }

            const result = await response.json();
            console.log(result);
            window.location.href = `/search/${result.hiragana}`;
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
    };

    const handleSubmit = (event) => {
        event.preventDefault();
        submitData({ ...data })
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
                                label="Kanji"
                                name="kanji"
                                value={data.kanji}
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
                                value={data.romaji}
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
                            {/* <TextField
                                style={{ marginBottom: 10 }}
                                label="Author ID"
                                name="author_id"
                                type="number"
                                value={localStorage.getItem('uuid')}
                                onChange={handleChange}
                                fullWidth
                                required
                                disabled
                            /> */}
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