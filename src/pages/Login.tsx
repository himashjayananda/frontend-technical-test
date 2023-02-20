import { FC } from 'react';
import { Container, Box, Typography } from '@mui/material';
import LoginForm from '../components/login/LoginForm';

interface LoginProps {}

const Login: FC<LoginProps> = () => {
  return (
    <Container maxWidth='xl'>
      <Box maxWidth='520px' mx='auto' my={4}>
        <Typography variant='h4' mb={3}>
          Login
        </Typography>
        <LoginForm />
      </Box>
    </Container>
  );
};

export default Login;
