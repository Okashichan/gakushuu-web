'use client';
import { useState } from 'react';
import { useRouter } from 'next/navigation';
import { FormControl, FormControlLabel, Radio, RadioGroup, Button, Container, Grid, Card } from '@mui/material';

const QuizPage = () => {
    const [quizType, setQuizType] = useState('hiragana');
    const [quizMode, setQuizMode] = useState('basic');
    const [quizSize, setQuizSize] = useState('15');

    const router = useRouter();

    const handleSubmit = () => {
        const query = `${quizType}?basic=${quizMode === 'basic'}${quizMode === 'combinations' ? '&combinations=true' : ''}${quizMode === 'kuten' ? '&kuten=true' : ''}${quizMode === 'kuten_combinations' ? '&kuten_combinations=true' : ''}&size=${quizSize}`;
        router.push(`/quiz/${query}`);
    };

    return (
        <Container sx={{ mt: 4 }}>
            <Card sx={{ p: 4 }} variant="outlined">
                <Grid container spacing={3} justifyContent="center" alignItems="center">
                    <Grid item xs={12}>
                        <FormControl component="fieldset">
                            <RadioGroup name="quizType" value={quizType} onChange={(e) => setQuizType(e.target.value)}>
                                <FormControlLabel value="hiragana" control={<Radio />} label="Хіраґана" />
                                <FormControlLabel value="katakana" control={<Radio />} label="Катакана" />
                            </RadioGroup>
                        </FormControl>
                    </Grid>
                    <Grid item xs={12}>
                        <FormControl component="fieldset">
                            <RadioGroup name="quizMode" value={quizMode} onChange={(e) => setQuizMode(e.target.value)}>
                                <FormControlLabel value="basic" control={<Radio />} label="Базові" />
                                <FormControlLabel value="combinations" control={<Radio />} label="Комбінації" />
                                <FormControlLabel value="kuten" control={<Radio />} label="Дакутен" />
                                <FormControlLabel value="kuten_combinations" control={<Radio />} label="Кобмінації + дакутен" />
                            </RadioGroup>
                        </FormControl>
                    </Grid>
                    <Grid item xs={12}>
                        <FormControl component="fieldset">
                            <RadioGroup name="quizSize" value={quizSize} onChange={(e) => setQuizSize(e.target.value)}>
                                <FormControlLabel value="15" control={<Radio />} label="15 Питань" />
                                <FormControlLabel value="20" control={<Radio />} label="20 Питань" />
                                <FormControlLabel value="30" control={<Radio />} label="30 Питань" />
                            </RadioGroup>
                        </FormControl>
                    </Grid>
                    <Grid item xs={12}>
                        <Button variant="contained" color="secondary" onClick={handleSubmit}>
                            Почати тестування
                        </Button>
                    </Grid>
                </Grid>
            </Card>
        </Container>
    );
};

export default QuizPage;