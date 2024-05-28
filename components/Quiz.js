'use client';
import { useState } from 'react';
import { usePathname } from 'next/navigation';
import { Container, Typography, RadioGroup, FormControlLabel, Radio, Button, Paper, Box } from '@mui/material';

export default function Quiz({ quiz, query }) {
    const pathname = usePathname();
    const [currentQuestionIndex, setCurrentQuestionIndex] = useState(0);
    const [answers, setAnswers] = useState([]);
    const [selectedOption, setSelectedOption] = useState('');
    const [isFinished, setIsFinished] = useState(false);

    const handleOptionChange = (event) => {
        setSelectedOption(event.target.value);
    };

    const handleNextQuestion = () => {
        if (selectedOption) {
            const isCorrect = selectedOption === quiz[currentQuestionIndex][1];
            setAnswers([...answers, { question: quiz[currentQuestionIndex][0], selected: selectedOption, correct: quiz[currentQuestionIndex][1], isCorrect }]);
            setSelectedOption('');
            if (currentQuestionIndex < quiz.length - 1) {
                setCurrentQuestionIndex(currentQuestionIndex + 1);
            } else {
                handleFinishQuiz();
            }
        }
    };

    const handleFinishQuiz = () => {
        if (selectedOption) {
            const isCorrect = selectedOption === quiz[currentQuestionIndex][1];
            setAnswers([...answers, { question: quiz[currentQuestionIndex][0], selected: selectedOption, correct: quiz[currentQuestionIndex][1], isCorrect }]);
        }
        setIsFinished(true);

        console.log('Quiz results:', answers);

        const answersPoints = answers.map((answer) => {
            return {
                answer: answer.question, correct: answer.isCorrect ? 1 : -1
            }
        });

        console.log(answersPoints);
    };

    const currentQuestion = quiz[currentQuestionIndex];

    return (
        <Container component={Paper} elevation={3} sx={{ p: 4, mt: 4, mb: 4 }}>
            <Typography variant="h4" gutterBottom>
                Тестування
            </Typography>
            {!isFinished ? (
                <>
                    <Typography variant="h5">
                        Оберіть правильну відповідь: {currentQuestion[0]}?
                    </Typography>
                    <RadioGroup value={selectedOption} onChange={handleOptionChange}>
                        {currentQuestion[2].map((option) => (
                            <FormControlLabel key={option} value={option} control={<Radio />} label={option} />
                        ))}
                    </RadioGroup>
                    <Button variant="contained" color="primary" onClick={handleNextQuestion} disabled={!selectedOption}>
                        {currentQuestionIndex < quiz.length - 1 ? 'Далі' : 'Завершити'}
                    </Button>
                </>
            ) : (
                <>
                    <Typography variant="h5">Результат</Typography>
                    {answers.map((answer, index) => (
                        <Box key={index} sx={{ my: 2, p: 2, border: '1px solid', borderColor: answer.isCorrect ? 'green' : 'red', borderRadius: 1 }}>
                            <Typography>
                                {answer.question}: Ваша відповідь: {answer.selected} {answer.isCorrect ? '✅' : `❌, вірна відповідь: ${answer.correct}`}
                            </Typography>
                        </Box>
                    ))}
                    <Button variant="contained" color="primary" href={`${pathname}?${query}`}>Спробувати ще раз!</Button>
                </>
            )}
        </Container>
    );
};