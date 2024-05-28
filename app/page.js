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
            Про Японський навчальний портал
          </Typography>
          <Typography variant="h5" align="center" color="text.secondary" paragraph>
            Gakushuu - це словник для тих, хто вивчає японську мову. Він
            створений спільнотою, яка використовує японську як навчальний інструмент.
          </Typography>
          <Stack
            sx={{ pt: 4 }}
            direction="row"
            spacing={2}
            justifyContent="center"
          >
            <Button href='/search/学習' variant="contained" color='pink'>Вирушай на пошук</Button>
            <Button href='/auth/signup' variant="outlined" color='pink'>Створити акаунт</Button>
          </Stack>
        </Container>
      </Box>
    </>
  );
}
export default Home;
