"use client";
import * as React from 'react';
import Box from '@mui/material/Box';
import Typography from '@mui/material/Typography';
import Container from '@mui/material/Container';
import Button from '@mui/material/Button';
import Stack from '@mui/material/Stack';

function Home() {
  return (
    <>
      <Box
        sx={{
          bgcolor: 'background.paper',
          pt: 8,
          pb: 6,
        }}
      >
        <Container maxWidth="sm">
          <Typography
            component="h1"
            variant="h2"
            align="center"
            color="text.primary"
            gutterBottom
          >
            About Japanese Learning Portal
          </Typography>
          <Typography variant="h5" align="center" color="text.secondary" paragraph>
            Gakushuu is a dictionary for Japanese learners. It is a
            community-driven dictionary that uses the Japanese language
            itself as a learning tool.
          </Typography>
          <Stack
            sx={{ pt: 4 }}
            direction="row"
            spacing={2}
            justifyContent="center"
          >
            <Button href='/' variant="contained">Go exploring</Button>
            <Button href='/auth/signup' variant="outlined">Create account</Button>
          </Stack>
        </Container>
      </Box>
    </>
  );
}
export default Home;
