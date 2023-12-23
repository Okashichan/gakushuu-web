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

const TranslationCard = ({ data }) => {
    return (
        <Box>
            <Card variant="outlined">
                <CardContent>
                    <Typography variant="h3" gutterBottom>
                        Український словник
                    </Typography>
                    <ul>
                        {
                            data?.ua_source != null &&
                            data && data.ua_source.map((item, index) => (
                                <li key={item.id}>
                                    <Typography variant="subtitle1">{item.ua_translation}</Typography>
                                    <Typography variant="body2">Original: {item.original}</Typography>
                                    <Typography variant="body2">Romanization: {item.romanization}</Typography>
                                    <Typography variant="body2">Transliteration: {item.transliteration}</Typography>
                                </li>
                            ))}
                    </ul>
                </CardContent>
            </Card>
            <Divider variant="inset" />
            <Card variant="outlined">
                <CardContent>
                    <Typography variant="h3" gutterBottom>
                        Англійський словник
                    </Typography>
                    <ul>
                        {data && data.en_source.map((item, index) => (
                            <li key={index}>
                                <Typography variant="subtitle1">{item.en_translation}</Typography>
                                <Typography variant="body2">Original: {item.original}</Typography>
                                <Typography variant="body2">Romanization: {item.romanization}</Typography>
                                <Typography variant="body2">Transliteration: {item.transliteration}</Typography>
                                <Button href={'/dictionary/' + item.id} variant="contained" color="primary" >Додати до словника</Button>
                            </li>
                        ))}
                    </ul>
                </CardContent>
            </Card>
        </Box >
    );
};

export default function Search({ params }) {
    const [data, setData] = useState(null);

    useEffect(() => {
        const fetchData = async () => {
            try {
                const response = await fetch(`${BASE_URL}/dictionary/search/${params.search}`, {
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

    return (
        <>
            <TranslationCard data={data} />
        </>
    );
}