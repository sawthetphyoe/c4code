import CssBaseline from '@mui/material/CssBaseline';
import ArrowForwardRoundedIcon from '@mui/icons-material/ArrowForwardRounded';
import CheckIcon from '@mui/icons-material/Check';
import { createTheme, ThemeProvider } from '@mui/material/styles';
import {
  Grid,
  TextField,
  Alert,
  Typography,
  Button,
  CircularProgress,
  Dialog,
  DialogActions,
  DialogContent,
  DialogContentText,
  Container,
  Box,
} from '@mui/material';

import { useState } from 'react';

import { useLoginUserMutation } from '../store';
import { useLocation, useNavigate } from 'react-router-dom';

const theme = createTheme();

function LoginPage() {
  const navigate = useNavigate();
  const location = useLocation();
  const [loginUser, results] = useLoginUserMutation();
  const [email, setEmail] = useState('');
  const [password, setPassword] = useState('');
  const [edit, setEdit] = useState(false);

  const handleEmailChange = (e) => {
    setEmail(e.target.value);
    setEdit(true);
  };

  const handlePasswordChange = (e) => {
    setPassword(e.target.value);
    setEdit(true);
  };

  const handleSubmit = (e) => {
    e.preventDefault();
    setEdit(false);
    loginUser({ email, password });
  };

  return (
    <ThemeProvider theme={theme}>
      {location.state && (
        <Container maxWidth="sm" sx={{ mt: 8 }}>
          <Alert severity="warning">
            <Typography variant="h6" component="span" sx={{ fontSize: 18 }}>
              {location.state.message}
            </Typography>
          </Alert>
        </Container>
      )}
      <Container
        component="form"
        maxWidth="xs"
        sx={{ mt: 4 }}
        onSubmit={handleSubmit}
      >
        <CssBaseline />
        <Box noValidate>
          <Grid container spacing={4}>
            <Grid item xs={12}>
              <TextField
                error={results.isError && !edit ? true : false}
                required
                fullWidth
                autoFocus
                label="Email Address"
                value={email}
                onChange={handleEmailChange}
              />
            </Grid>
            <Grid item xs={12}>
              <TextField
                error={results.isError && !edit ? true : false}
                required
                fullWidth
                label="Password"
                type="password"
                value={password}
                onChange={handlePasswordChange}
              />
            </Grid>
            <Grid item xs={12}>
              <Button
                fullWidth
                type="submit"
                variant="contained"
                sx={{
                  fontSize: 16,
                }}
                style={{
                  backgroundColor: results.isLoading || !edit ? 'grey' : '',
                }}
              >
                {results.isLoading ? (
                  <Box>
                    logging in
                    <CircularProgress
                      sx={{ color: 'white', ml: 2 }}
                      size={16}
                    />
                  </Box>
                ) : (
                  'login'
                )}
              </Button>
            </Grid>
            {results.isError && !edit && (
              <Grid item xs={12}>
                <Alert severity="error">{results.error.data.message}</Alert>
              </Grid>
            )}
          </Grid>
        </Box>
        {results.isSuccess && (
          <Dialog
            open
            aria-labelledby="alert-dialog-title"
            aria-describedby="alert-dialog-description"
          >
            <DialogContent sx={{ width: 600, p: 4 }}>
              <Alert severity="success" icon={<CheckIcon fontSize="inherit" />}>
                <DialogContentText id="alert-dialog-description">
                  <Typography variant="h6" component="span">
                    Successfully Logged In!
                  </Typography>
                </DialogContentText>
              </Alert>
            </DialogContent>
            <DialogActions sx={{ mb: 2 }}>
              <Button
                onClick={() => navigate('/', { replace: true })}
                autoFocus
              >
                Go to home page
                <ArrowForwardRoundedIcon sx={{ ml: 2 }} />
              </Button>
            </DialogActions>
          </Dialog>
        )}
      </Container>
    </ThemeProvider>
  );
}

export default LoginPage;
