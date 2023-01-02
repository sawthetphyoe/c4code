import CssBaseline from '@mui/material/CssBaseline';
import Box from '@mui/material/Box';
import Container from '@mui/material/Container';
import { createTheme, ThemeProvider } from '@mui/material/styles';
import {
  Avatar,
  MenuItem,
  Grid,
  TextField,
  Skeleton,
  Alert,
  Typography,
} from '@mui/material';
import Button from '@mui/material/Button';
import PhotoCamera from '@mui/icons-material/PhotoCamera';
import { useState, useEffect } from 'react';
import {
  useUpdateUserByIdMutation,
  useGetUserByIdQuery,
  useResetPasswordMutation,
} from '../store';
import { useParams } from 'react-router-dom';
import { CircularProgress } from '@mui/material';

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

const theme = createTheme();

function UserInfoForm() {
  const { id } = useParams();
  const { data, error, isLoading } = useGetUserByIdQuery(id);
  const [updateUserById, updateUserResults] = useUpdateUserByIdMutation();
  const [resetPassword, resetPasswordResults] = useResetPasswordMutation();

  const [firstName, setFirstName] = useState('');
  const [lastName, setLastName] = useState('');
  const [email, setEmail] = useState('');
  const [role, setRole] = useState('');
  const [edit, setEdit] = useState(false);
  const [image, setImage] = useState('');

  const handleResetPasswordClick = () => {
    resetPassword(id);
    updateUserResults.reset();
  };

  const handleFirstNameChange = (e) => {
    setFirstName(e.target.value);
    setEdit(true);
    // updateUserResults.reset();
  };

  const handleLastNameChange = (e) => {
    setLastName(e.target.value);
    setEdit(true);
    // updateUserResults.reset();
  };

  const handleEmailChange = (e) => {
    setEmail(e.target.value);
    setEdit(true);
    // updateUserResults.reset();
  };

  const handleRoleChange = (e) => {
    setRole(e.target.value);
    setEdit(true);
    // updateUserResults.reset();
  };

  const updatedUser = {
    id,
    body: {
      firstName,
      lastName,
      email,
      role,
    },
  };

  useEffect(() => {
    if (data && !error) {
      setFirstName(data.data.data.firstName);
      setLastName(data.data.data.lastName);
      setEmail(data.data.data.email);
      setRole(data.data.data.role);
      setImage(data.data.data.image);
    }
  }, [data, error]);

  // useEffect(() => {
  //   if (updateUserResults.isSuccess) updateUserResults.reset();
  // });

  const handleUserUpdateSubmit = (e) => {
    e.preventDefault();
    setEdit(false);
    updateUserById(updatedUser);
    resetPasswordResults.reset();
  };

  const handleCancel = () => {
    setEdit(false);
    setFirstName(data.data.data.firstName);
    setLastName(data.data.data.lastName);
    setEmail(data.data.data.email);
    setRole(data.data.data.role);
    setImage(data.data.data.image);
    updateUserResults.reset();
  };

  let button;
  if (updateUserResults.isLoading) {
    button = (
      <Box>
        SAVING
        <CircularProgress sx={{ color: 'white', ml: 2 }} size={16} />
      </Box>
    );
  } else if (updateUserResults.isSuccess && !edit) {
    button = 'SAVED';
  } else {
    button = 'SAVE';
  }

  // {updateUserResults.isLoading ? (
  //   <Box>
  //     SAVING
  //     <CircularProgress sx={{ color: 'white', ml: 2 }} size={16} />
  //   </Box>
  // ) : updateUserResults.isSuccess && !edit ? (
  //   'SAVED'
  // ) : (
  //   'SAVE'
  // )}

  let alert;
  if (updateUserResults.isError) {
    alert = (
      <Alert severity="error">
        <Typography variant="h6" sx={{ fontSize: 18 }}>
          {updateUserResults.error.data.message}
        </Typography>
      </Alert>
    );
  } else if (resetPasswordResults.isError) {
    alert = (
      <Alert severity="error">
        <Typography variant="h6" sx={{ fontSize: 18 }}>
          {resetPasswordResults.error.data.message}
        </Typography>
      </Alert>
    );
  } else if (updateUserResults.isSuccess) {
    alert = (
      <Alert severity="success">
        <Typography variant="h6" sx={{ fontSize: 18 }}>
          Successfully updated user!
        </Typography>
      </Alert>
    );
  } else if (resetPasswordResults.isSuccess) {
    alert = (
      <Alert severity="success">
        <Typography variant="h6" sx={{ fontSize: 18 }}>
          Successfully reset to default password!
        </Typography>
      </Alert>
    );
  } else {
    alert = '';
  }

  const handleUploadChange = (e) => {
    const formData = new FormData();
    formData.append('image', e.target.files[0]);
    updateUserById({
      id,
      body: formData,
    });
  };

  return (
    <ThemeProvider theme={theme}>
      <Container maxWidth="md" sx={{ height: 60 }}>
        {alert}
      </Container>

      <Container
        component="form"
        maxWidth="md"
        sx={{ paddingBottom: 2 }}
        onSubmit={handleUserUpdateSubmit}
      >
        <CssBaseline />

        <Box
          sx={{
            padding: 4,
            display: 'flex',
            justifyContent: 'space-between',
            alignItems: 'top',
          }}
        >
          <Box noValidate sx={{ maxWidth: 450 }}>
            <Grid container spacing={2}>
              <Grid item sm={12}>
                {isLoading ? (
                  <Skeleton height={60} width={450} variant="rectangular" />
                ) : (
                  <TextField
                    autoComplete="given-name"
                    name="firstName"
                    required
                    fullWidth
                    id="firstName"
                    label="First Name"
                    value={firstName}
                    onChange={handleFirstNameChange}
                  />
                )}
              </Grid>
              <Grid item sm={12}>
                {isLoading ? (
                  <Skeleton height={60} variant="rectangular" />
                ) : (
                  <TextField
                    required
                    fullWidth
                    id="lastName"
                    label="Last Name"
                    name="lastName"
                    autoComplete="family-name"
                    value={lastName}
                    onChange={handleLastNameChange}
                  />
                )}
              </Grid>
              <Grid item xs={12}>
                {isLoading ? (
                  <Skeleton height={60} variant="rectangular" />
                ) : (
                  <TextField
                    required
                    fullWidth
                    id="email"
                    label="Email Address"
                    name="email"
                    autoComplete="email"
                    value={email}
                    onChange={handleEmailChange}
                  />
                )}
              </Grid>
              <Grid item xs={12}>
                {isLoading ? (
                  <Skeleton height={60} variant="rectangular" />
                ) : (
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
                )}
              </Grid>
            </Grid>
          </Box>
          <Box
            sx={{
              display: 'flex',
              flexDirection: 'column',
              alignItems: 'center',
              gap: 3,
            }}
          >
            <Avatar
              src={image && `http://localhost:3005/img/users/${image}`}
              alt={firstName}
              sx={{ height: 150, width: 150 }}
            />

            <Button component="label" variant="outlined">
              <PhotoCamera sx={{ fontSize: 18, mr: 1 }} />
              upload new photo
              <input
                hidden
                accept="image/*"
                multiple
                type="file"
                onChange={handleUploadChange}
              />
            </Button>
          </Box>
        </Box>
        {isLoading ? (
          <Skeleton
            variant="rectangular"
            width={150}
            height={40}
            sx={{ ml: 4 }}
          />
        ) : (
          <>
            <Button
              type="submit"
              variant="contained"
              sx={{
                fontSize: 16,
                marginLeft: 4,
                width: 150,
              }}
              style={{
                backgroundColor:
                  updateUserResults.isLoading || !edit ? 'grey' : '',
              }}
            >
              {button}
            </Button>
            {edit && (
              <Button
                onClick={handleCancel}
                variant="outlined"
                sx={{
                  fontSize: 16,
                  marginLeft: 2,
                  width: 150,
                }}
              >
                CANCEL
              </Button>
            )}
          </>
        )}
      </Container>
      <Container maxWidth="md">
        {isLoading ? (
          <Skeleton
            variant="rectangular"
            width={200}
            height={38}
            sx={{ ml: 4 }}
          />
        ) : (
          <Button
            type="submit"
            variant="outlined"
            // size="small"
            color="error"
            sx={{
              mt: 2,
              ml: 4,
              mb: 4,
              width: 200,
            }}
            onClick={handleResetPasswordClick}
          >
            {resetPasswordResults.isLoading ? 'resetting...' : 'reset password'}
          </Button>
        )}
      </Container>
    </ThemeProvider>
  );
}

export default UserInfoForm;
