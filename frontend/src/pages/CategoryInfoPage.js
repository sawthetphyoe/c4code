import { Container, Paper, CssBaseline } from '@mui/material';
import BreadcrumbsBar from '../components/BreadcrumbsBar';
import { createTheme, ThemeProvider } from '@mui/material/styles';
import { useParams, useNavigate } from 'react-router-dom';
import { useGetCategoryQuery } from '../store';
import {
  Button,
  TextField,
  CircularProgress,
  Box,
  Skeleton,
} from '@mui/material';
import { useEffect, useState } from 'react';
import { useUpdateCategoryMutation } from '../store';
import ErrorDisplay from '../components/ErrorDisplay';

const theme = createTheme();

function CategoryInfoPage() {
  const { id } = useParams();
  const navigate = useNavigate();

  const { data, error, isFetching, isLoading } = useGetCategoryQuery(id);

  const [edit, setEdit] = useState(false);
  const [name, setName] = useState('');
  const [updateCategory, results] = useUpdateCategoryMutation();

  useEffect(() => {
    if (data) {
      setName(data.data.data.name);
    }
  }, [data]);

  useEffect(() => {
    if (results.isSuccess) navigate('/categories');
  });

  const handleNameChange = (e) => {
    setName(e.target.value);
    setEdit(true);
    results.reset();
  };

  const handleCancel = () => {
    setName(category.name);
    setEdit(false);
  };

  const handleSubmit = (e, id) => {
    e.preventDefault();
    setEdit(false);
    updateCategory({ name, id });
  };

  let category;
  let content;
  if (isLoading) {
    content = '';
  } else if (error) {
    content = <ErrorDisplay message={error.data.message} />;
  } else {
    category = data.data.data;
    content = (
      <Container maxWidth="sm" sx={{ marginTop: 8 }}>
        <Paper square>
          <BreadcrumbsBar
            paths={[
              { pathName: 'Home', path: '/' },
              { pathName: 'Categories', path: '/categories' },
            ]}
            currentPage={category.name}
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
                  onSubmit={(e) => handleSubmit(e, category._id)}
                  sx={{ mt: 3 }}
                  autoComplete="off"
                >
                  {isFetching ? (
                    <Skeleton
                      height={60}
                      variant="rectangular"
                      sx={{ minWidth: 400 }}
                    />
                  ) : (
                    <TextField
                      required
                      sx={{ minWidth: 400 }}
                      label="Name"
                      autoFocus
                      value={name}
                      onChange={handleNameChange}
                    />
                  )}

                  <Box>
                    {isFetching ? (
                      <Skeleton
                        variant="rectangular"
                        width={150}
                        height={40}
                        sx={{ width: 150, mt: 3 }}
                      />
                    ) : (
                      <>
                        <Button
                          type="submit"
                          variant="contained"
                          sx={{
                            fontSize: 16,
                            width: 150,
                            mt: 3,
                          }}
                          style={{
                            backgroundColor:
                              results.isLoading || !edit ? 'grey' : '',
                          }}
                        >
                          {results.isLoading ? (
                            <Box>
                              SAVING
                              <CircularProgress
                                sx={{ color: 'white', ml: 2 }}
                                size={16}
                              />
                            </Box>
                          ) : results.isSuccess ? (
                            'SAVED'
                          ) : (
                            'SAVE'
                          )}
                        </Button>
                        {edit && (
                          <Button
                            onClick={handleCancel}
                            variant="outlined"
                            sx={{
                              fontSize: 16,
                              marginLeft: 2,
                              width: 150,
                              mt: 3,
                            }}
                          >
                            CANCEL
                          </Button>
                        )}
                      </>
                    )}
                  </Box>
                </Box>
              </Box>
            </Container>
          </ThemeProvider>
        </Paper>
      </Container>
    );
  }

  return content;
}

export default CategoryInfoPage;
