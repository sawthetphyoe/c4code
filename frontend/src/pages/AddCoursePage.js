import {
  Container,
  Paper,
  Button,
  CssBaseline,
  TextField,
  CircularProgress,
  Box,
} from '@mui/material';
import BreadcrumbsBar from '../components/BreadcrumbsBar';
import { createTheme, ThemeProvider } from '@mui/material/styles';
import { useNavigate } from 'react-router-dom';
import { useEffect, useState } from 'react';
import { useCreateCategoryMutation } from '../store';

const theme = createTheme();

function AddCategoryPage() {
  const navigate = useNavigate();

  const [createCategory, results] = useCreateCategoryMutation();

  const [name, setName] = useState('');

  useEffect(() => {
    if (results.isSuccess) navigate('/categories');
  });

  const handleNameChange = (e) => {
    setName(e.target.value);
  };

  const handleSubmit = (event) => {
    event.preventDefault();
    createCategory({ name });
  };

  return (
    <Container maxWidth="sm" sx={{ marginTop: 8 }}>
      <Paper square>
        <BreadcrumbsBar
          paths={[
            { pathName: 'Home', path: '/' },
            { pathName: 'Categories', path: '/categories' },
          ]}
          currentPage="add category"
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
                <TextField
                  required
                  fullWidth
                  label="Name"
                  autoFocus
                  value={name}
                  onChange={handleNameChange}
                />

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
                      Adding category
                      <CircularProgress
                        sx={{ color: 'white', ml: 2 }}
                        size={16}
                      />
                    </Box>
                  ) : (
                    'Add category'
                  )}
                </Button>
              </Box>
            </Box>
          </Container>
        </ThemeProvider>
      </Paper>
    </Container>
  );
}

export default AddCategoryPage;
