import * as React from 'react';
import AppBar from '@mui/material/AppBar';
import Box from '@mui/material/Box';
import Toolbar from '@mui/material/Toolbar';
import IconButton from '@mui/material/IconButton';
import Typography from '@mui/material/Typography';
import Container from '@mui/material/Container';
import Avatar from '@mui/material/Avatar';
import Button from '@mui/material/Button';
import CodeIcon from '@mui/icons-material/Code';
import { Link, useNavigate } from 'react-router-dom';
import LogoutRoundedIcon from '@mui/icons-material/LogoutRounded';
import { useCheckLoginQuery, useUserLogoutMutation } from '../store';

const pages = [
  { name: 'Home', path: '/' },
  { name: 'USERS', path: '/users' },
];

function ResponsiveAppBar() {
  const [userLogout] = useUserLogoutMutation();
  const { data, error } = useCheckLoginQuery();
  const navigate = useNavigate();

  const handleLogout = () => {
    userLogout();
    navigate('/login');
  };

  return (
    <AppBar
      position="sticky"
      // sx={{ color: 'black', backgroundColor: 'whitesmoke' }}
    >
      <Container maxWidth="xl">
        <Toolbar disableGutters>
          <CodeIcon
            sx={{ display: { xs: 'none', md: 'flex' }, mr: 1, fontSize: 32 }}
          />
          <Typography
            variant="h6"
            noWrap
            component="a"
            href="/"
            sx={{
              mr: 2,
              display: { xs: 'none', md: 'flex' },
              fontFamily: 'monospace',
              fontWeight: 700,
              letterSpacing: '.1rem',
              color: 'inherit',
              textDecoration: 'none',
            }}
          >
            C4CODE
          </Typography>

          <Box sx={{ flexGrow: 1, display: { xs: 'none', md: 'flex' } }}>
            {pages.map((page) => (
              <Link
                to={page.path}
                key={page.name}
                style={{ textDecoration: 'none' }}
              >
                <Button sx={{ my: 2, color: 'white', display: 'block' }}>
                  {page.name}
                </Button>
              </Link>
            ))}
          </Box>

          <Box sx={{ flexGrow: 0 }}>
            {!error && data && (
              <Box
                style={{
                  display: 'flex',
                  justifyContent: 'center',
                  alignItems: 'center',
                  gap: 10,
                }}
              >
                <span
                  style={{
                    fontSize: 16,
                    fontWeight: 'medium',
                    color: 'inherit',
                    letterSpacing: '.05rem',
                    textTransform: 'uppercase',
                    paddingRight: 8,
                  }}
                >
                  {`${data.data.data.firstName} ${data.data.data.lastName}`}
                </span>

                <IconButton sx={{ p: 0 }}>
                  <Avatar
                    sx={{ width: 48, height: 48 }}
                    alt={data.data.data.firstName}
                    src={
                      data.data.data.image &&
                      `http://localhost:3005/img/users/${data.data.data.image}`
                    }
                  />
                </IconButton>

                <IconButton onClick={handleLogout}>
                  <LogoutRoundedIcon sx={{ color: 'white' }} />
                </IconButton>
              </Box>
            )}
          </Box>
        </Toolbar>
      </Container>
    </AppBar>
  );
}
export default ResponsiveAppBar;
