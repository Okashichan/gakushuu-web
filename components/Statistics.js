import { Box, Container, Grid, Table, TableBody, TableCell, TableContainer, TableHead, TableRow, Typography, Paper } from '@mui/material';

const renderTable = (title, stats) => (
    <Box sx={{ mb: 4 }}>
        <Typography variant="h6" gutterBottom>{title}</Typography>
        <TableContainer>
            <Table size="small">
                <TableHead>
                    <TableRow>
                        <TableCell>Ієрогліф</TableCell>
                        <TableCell align="center">Статистика (+/-)</TableCell>
                        <TableCell align="center">Прогрес (%)</TableCell>
                    </TableRow>
                </TableHead>
                <TableBody>
                    {Object.entries(stats).map(([char, { right, wrong }]) => {
                        const total = right + wrong;
                        const progress = total > 0 ? ((right / total) * 100).toFixed(2) : 0;
                        return (
                            <TableRow key={char}>
                                <TableCell>{char}</TableCell>
                                <TableCell align="center">
                                    <Box component="span" sx={{ color: 'green', mr: 1 }}>{right}</Box> /
                                    <Box component="span" sx={{ color: 'red', ml: 1 }}>{wrong}</Box>
                                </TableCell>
                                <TableCell align="center">{progress} %</TableCell>
                            </TableRow>
                        );
                    })}
                </TableBody>
            </Table>
        </TableContainer>
    </Box>
);

export default function Statistics({ stats }) {
    const { hiragana_basic, hiragana_kuten, hiragana_kuten_combinations,
        katakana_basic, katakana_kuten, katakana_kuten_combinations
    } = stats.stats;

    return (
        <Container sx={{ mt: 4, mb: 4 }}>
            <Grid>
                <Typography variant="h4" gutterBottom>Статистика Хіраґани</Typography>
                <Grid container spacing={2}>
                    <Grid item xs={12} md={4}>
                        <Paper sx={{ p: 2 }}>{renderTable("Базові", hiragana_basic)}</Paper>
                    </Grid>
                    <Grid item xs={12} md={4}>
                        <Paper sx={{ p: 2 }}>{renderTable("Дакутен", hiragana_kuten)}</Paper>
                    </Grid>
                    <Grid item xs={12} md={4}>
                        <Paper sx={{ p: 2 }}>{renderTable("Комбінації + дакутен", hiragana_kuten_combinations)}</Paper>
                    </Grid>
                </Grid>
            </Grid>
            <Grid sx={{ mt: 4 }}>
                <Typography variant="h4" gutterBottom>Статистика Катакани</Typography>
                <Grid container spacing={2}>
                    <Grid item xs={12} md={4}>
                        <Paper sx={{ p: 2 }}>{renderTable("Базові", katakana_basic)}</Paper>
                    </Grid>
                    <Grid item xs={12} md={4}>
                        <Paper sx={{ p: 2 }}>{renderTable("Дакутен", katakana_kuten)}</Paper>
                    </Grid>
                    <Grid item xs={12} md={4}>
                        <Paper sx={{ p: 2 }}>{renderTable("Комбінації дакутен", katakana_kuten_combinations)}</Paper>
                    </Grid>
                </Grid>
            </Grid>
        </Container>
    );
};


