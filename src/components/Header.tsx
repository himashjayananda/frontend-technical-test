import { FC } from 'react';
import { useNavigate } from 'react-router-dom';
import { Container, Box, Link, Button } from '@mui/material';
import { Link as RouterLink } from 'react-router-dom';
import { useAppDispatch, useAppSelector } from '../behavior/hooks';
import { resetSessionData } from '../behavior/slices/sessionSlice';
import { ROLES } from '../utils/constants';

interface HeaderProps {}

const Header: FC<HeaderProps> = () => {
  const { isAuthenticated, role } = useAppSelector(state => state.session);
  const navigate = useNavigate();
  const dispatch = useAppDispatch();

  const logOut = () => {
    navigate('/login');
    dispatch(resetSessionData());
  };

  return (
    <Box
      className='header-wrapper'
      sx={{
        borderBottom: ({ palette }) => `2px solid ${palette.primary.dark}`,
        zIndex: theme => theme.zIndex.drawer + 1,
        position: 'relative',
        background: 'white',
      }}
    >
      <Container maxWidth={isAuthenticated ? false : 'xl'}>
        <Box
          sx={{
            display: 'flex',
            justifyContent: 'space-between',
            height: '60px',
            alignItems: 'center',
          }}
        >
          <div>
            <Link
              component={RouterLink}
              to='/'
              sx={{
                textDecoration: 'none',
                color: 'text.primary',
                '&:hover': {
                  color: 'primary.main',
                },
                fontSize: '1.25rem',
                fontWeight: '700',
              }}
            >
              Manager App
            </Link>
            {role === ROLES.ADMIN ? (
              <Link
                component={RouterLink}
                to='/chart'
                sx={{
                  textDecoration: 'none',
                  color: 'text.primary',
                  '&:hover': {
                    color: 'primary.main',
                  },
                  fontSize: '1rem',
                  fontWeight: '500',
                  marginLeft: '1.5rem',
                }}
              >
                Chart
              </Link>
            ) : (
              ''
            )}
          </div>

          {isAuthenticated && (
            <Button variant='outlined' onClick={logOut}>
              Log out
            </Button>
          )}
        </Box>
      </Container>
    </Box>
  );
};

export default Header;
