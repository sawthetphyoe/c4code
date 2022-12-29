import {
  Container,
  Paper,
  Button,
  CssBaseline,
  TextField,
  CircularProgress,
  Box,
  MenuItem,
  Grid,
  Skeleton,
} from '@mui/material';
import BreadcrumbsBar from '../components/BreadcrumbsBar';
import { createTheme, ThemeProvider } from '@mui/material/styles';
import { useNavigate } from 'react-router-dom';
import { useEffect, useState } from 'react';
import { useCreateCourseMutation, useGetAllCategoriesQuery } from '../store';

const theme = createTheme();

function AddCoursePage() {
  const navigate = useNavigate();

  const [createCourse, createResults] = useCreateCourseMutation();
  const { data, error, isLoading } = useGetAllCategoriesQuery();

  const [name, setName] = useState('');
  const [description, setDescription] = useState('');
  const [category, setCategory] = useState('');
  const [categories, setCategories] = useState([]);

  useEffect(() => {
    if (createResults.isSuccess) navigate('/courses');
  });

  useEffect(() => {
    if (data && !error) {
      setCategories([...data.data.data]);
    }
  }, [data, error]);

  const handleNameChange = (e) => {
    setName(e.target.value);
  };

  const handleCateChange = (e) => {
    setCategory(e.target.value);
  };

  const handleDescChange = (e) => {
    setDescription(e.target.value);
  };

  const handleSubmit = (event) => {
    event.preventDefault();
    createCourse({ name, description, category });
  };

  // if (createResults.isError) console.log(createResults.error);

  return (
    <Container maxWidth="lg" sx={{ marginTop: 8 }}>
      <Paper square>
        <BreadcrumbsBar
          paths={[
            { pathName: 'Home', path: '/' },
            { pathName: 'Courses', path: '/courses' },
          ]}
          currentPage="add course"
        />
        <ThemeProvider theme={theme}>
          <Container component="main" maxWidth="md" sx={{ paddingBottom: 2 }}>
            <CssBaseline />
            <Grid
              container
              noValidate
              component="form"
              onSubmit={handleSubmit}
              autoComplete="off"
              spacing={4}
              sx={{ mt: 3, mb: 5 }}
            >
              <Grid item xs={6}>
                {isLoading ? (
                  <Skeleton height={60} width={450} variant="rectangular" />
                ) : (
                  <TextField
                    required
                    fullWidth
                    label="Course Name"
                    autoFocus
                    value={name}
                    onChange={handleNameChange}
                  />
                )}
              </Grid>

              <Grid item sm={6}></Grid>

              <Grid item xs={6}>
                {isLoading ? (
                  <Skeleton height={60} width={450} variant="rectangular" />
                ) : (
                  <TextField
                    fullWidth
                    id="outlined-select-currency"
                    select
                    label="Category *"
                    value={category}
                    onChange={handleCateChange}
                  >
                    {categories.map((cate) => (
                      <MenuItem key={cate.name} value={cate._id}>
                        {cate.name}
                      </MenuItem>
                    ))}
                  </TextField>
                )}
              </Grid>

              <Grid item xs={12}>
                {isLoading ? (
                  <Skeleton height={60} width={450} variant="rectangular" />
                ) : (
                  <TextField
                    fullWidth
                    label="Description *"
                    value={description}
                    onChange={handleDescChange}
                    multiline
                    rows={6}
                  />
                )}
              </Grid>

              <Grid item xs={4}>
                {isLoading ? (
                  <Skeleton height={60} width={450} variant="rectangular" />
                ) : (
                  <Button
                    type="submit"
                    fullWidth
                    variant="contained"
                    style={{
                      backgroundColor: createResults.isLoading && 'grey',
                    }}
                  >
                    {createResults.isLoading ? (
                      <Box>
                        adding course
                        <CircularProgress
                          sx={{ color: 'white', ml: 2 }}
                          size={16}
                        />
                      </Box>
                    ) : (
                      'add course'
                    )}
                  </Button>
                )}
              </Grid>
            </Grid>
          </Container>
        </ThemeProvider>
      </Paper>
    </Container>
  );
}

export default AddCoursePage;
