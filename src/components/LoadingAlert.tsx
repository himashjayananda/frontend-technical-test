import { FC } from 'react';
import { Box, CircularProgress, Typography } from '@mui/material';

interface LoadingAlertProps {}

const LoadingAlert: FC<LoadingAlertProps> = () => {
  return (
    <Box textAlign='center'>
      <CircularProgress />
      <Typography variant='body1' mt={1}>
        Loading
      </Typography>
    </Box>
  );
};

export default LoadingAlert;
