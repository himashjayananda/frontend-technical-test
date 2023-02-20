import { FC } from 'react';
import { useNavigate } from 'react-router-dom';
import { useFormik } from 'formik';
import { Box, TextField, Button } from '@mui/material';
import { toast } from 'react-toastify';
import { loginSchema } from '../../utils/validationSchemas';
import { LoginUserType, UserType } from '../../types/User';
import { useLazyAuthenticateUserQuery } from '../../behavior/api/login.api';
import { useAppDispatch } from '../../behavior/hooks';
import { setSessionData } from '../../behavior/slices/sessionSlice';

interface LoginFormProps {}

const LoginForm: FC<LoginFormProps> = () => {
  const navigate = useNavigate();
  const dispatch = useAppDispatch();
  const [authenticateUser] = useLazyAuthenticateUserQuery();

  const initialValues = {
    email: '',
    password: '',
  };

  const { values, errors, touched, handleSubmit, handleBlur, handleChange } =
    useFormik({
      initialValues,
      validationSchema: loginSchema,
      onSubmit: async ({ email, password }: LoginUserType) => {
        try {
          const response: UserType[] = await authenticateUser({
            email,
            password,
          }).unwrap();

          if (response.length) {
            dispatch(setSessionData(response[0]));
            navigate('/');
          } else {
            toast.error('Email or password you entered is incorrect.');
          }
        } catch (error) {
          toast.error('Something went wrong!');
          console.error(error);
        }
      },
    });

  return (
    <form onSubmit={handleSubmit}>
      <TextField
        label='Email'
        variant='outlined'
        type='text'
        fullWidth
        margin='normal'
        name='email'
        value={values.email}
        onBlur={handleBlur}
        onChange={handleChange}
        error={touched.email && errors.email ? true : false}
        helperText={(touched.email && errors.email) ?? false}
      />
      <TextField
        label='Password'
        variant='outlined'
        type='password'
        fullWidth
        margin='normal'
        name='password'
        value={values.password}
        onBlur={handleBlur}
        onChange={handleChange}
        error={touched.password && errors.password ? true : false}
        helperText={(touched.password && errors.password) ?? false}
      />
      <Box mt={3}>
        <Button size='large' variant='contained' type='submit'>
          Login
        </Button>
      </Box>
    </form>
  );
};

export default LoginForm;
