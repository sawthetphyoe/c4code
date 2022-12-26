import {
  Container,
  Paper,
  Button,
  CssBaseline,
  TextField,
  Grid,
  Box,
  CircularProgress,
  MenuItem,
  Alert,
} from '@mui/material';
import BreadcrumbsBar from '../components/BreadcrumbsBar';
import { createTheme, ThemeProvider } from '@mui/material/styles';
import { useNavigate } from 'react-router-dom';
import { useEffect, useState } from 'react';
import { useCreateUserMutation } from '../store';

const theme = createTheme();

const roles = [
  {
    value: 'student',
    label: 'Student',
  },
  {
    value: 'instructor',
    label: 'Instructor',
  },
  {
    value: 'admin',
    label: 'Admin',
  },
];

function AddUserPage() {
  const navigate = useNavigate();

  const [createUser, results] = useCreateUserMutation();

  const [firstName, setFirstName] = useState('');
  const [lastName, setLastName] = useState('');
  const [email, setEmail] = useState('');
  const [role, setRole] = useState('');

  useEffect(() => {
    if (results.isSuccess) navigate('/users');
  });

  const handleFirstNameChange = (e) => {
    setFirstName(e.target.value);
  };
  const handleLastNameChange = (e) => {
    setLastName(e.target.value);
  };
  const handleEmailChange = (e) => {
    setEmail(e.target.value);
  };

  const handleRoleChange = (e) => {
    setRole(e.target.value);
  };

  const handleSubmit = (event) => {
    event.preventDefault();
    createUser({
      firstName,
      lastName,
      email,
      role,
    });
  };

  return (
    <Container maxWidth="sm" sx={{ marginTop: 8 }}>
      <Paper square>
        <BreadcrumbsBar
          paths={[
            { pathName: 'Home', path: '/' },
            { pathName: 'Users', path: '/users' },
          ]}
          currentPage="add user"
        />
        <ThemeProvider theme={theme}>
          <Container component="main" maxWidth="xs" sx={{ paddingBottom: 2 }}>
            <CssBaseline />
            <Box
              sx={{
                marginTop: 2,
                display: 'flex',
                flexDirection: 'column',
                alignItems: 'center',
              }}
            >
              <Box
                component="form"
                onSubmit={handleSubmit}
                sx={{ mt: 3 }}
                autoComplete="off"
              >
                <Grid container spacing={2}>
                  <Grid item xs={12} sm={6}>
                    <TextField
                      required
                      fullWidth
                      label="First Name"
                      autoFocus
                      value={firstName}
                      onChange={handleFirstNameChange}
                    />
                  </Grid>
                  <Grid item xs={12} sm={6}>
                    <TextField
                      required
                      fullWidth
                      label="Last Name"
                      value={lastName}
                      onChange={handleLastNameChange}
                    />
                  </Grid>
                  <Grid item xs={12}>
                    <TextField
                      required
                      fullWidth
                      label="Email Address"
                      value={email}
                      onChange={handleEmailChange}
                    />
                  </Grid>
                  <Grid item xs={12}>
                    <TextField
                      fullWidth
                      id="outlined-select-currency"
                      select
                      label="User type *"
                      value={role}
                      onChange={handleRoleChange}
                    >
                      {roles.map((option) => (
                        <MenuItem key={option.value} value={option.value}>
                          {option.label}
                        </MenuItem>
                      ))}
                    </TextField>
                  </Grid>
                </Grid>

                <Button
                  type="submit"
                  fullWidth
                  variant="contained"
                  sx={{
                    mt: 3,
                    mb: 2,
                  }}
                  style={{
                    backgroundColor: results.isLoading && 'grey',
                  }}
                >
                  {results.isLoading ? (
                    <Box>
                      Adding user
                      <CircularProgress
                        sx={{ color: 'white', ml: 2 }}
                        size={16}
                      />
                    </Box>
                  ) : (
                    'Add user'
                  )}
                </Button>

                {results.isError && (
                  <Box fullWidth>
                    <Alert severity="error">{results.error.data.message}</Alert>
                  </Box>
                )}
              </Box>
            </Box>
          </Container>
        </ThemeProvider>
      </Paper>
    </Container>
  );
}

export default AddUserPage;
