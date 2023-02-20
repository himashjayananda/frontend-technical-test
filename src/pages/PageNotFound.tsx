import { FC } from 'react';
import { Container, Typography } from '@mui/material';

interface PageNotFoundProps {}

const PageNotFound: FC<PageNotFoundProps> = () => {
  return (
    <Container maxWidth='xl' className='chart-wrapper'>
      <Typography variant='h3' mt={4}>
        404. Page Not Found
      </Typography>
    </Container>
  );
};

export default PageNotFound;
