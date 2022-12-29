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
import ArrowForwardRoundedIcon from '@mui/icons-material/ArrowForwardRounded';
import BreadcrumbsBar from '../components/BreadcrumbsBar';
import { createTheme, ThemeProvider } from '@mui/material/styles';
import { useNavigate, useParams } from 'react-router-dom';
import { useEffect, useState } from 'react';
import {
  useGetAllCategoriesQuery,
  useGetCourseQuery,
  useUpdateCourseMutation,
} from '../store';

const theme = createTheme();

function CourseInfoPage() {
  const { id } = useParams();
  const navigate = useNavigate();

  const {
    data: courseData,
    error: courseError,
    isLoading: courseLoading,
  } = useGetCourseQuery(id);

  const {
    data: categData,
    error: categError,
    isLoading: categLoading,
  } = useGetAllCategoriesQuery();

  const [updateCourse, results] = useUpdateCourseMutation();

  const [name, setName] = useState('');
  const [description, setDescription] = useState('');
  const [category, setCategory] = useState('');
  const [categories, setCategories] = useState([]);

  useEffect(() => {
    if (categData && !categError) {
      setCategories([...categData.data.data]);
    }
    if (courseData && !courseError) {
      setName(courseData.data.data.name);
      setDescription(courseData.data.data.description);
      setCategory(courseData.data.data.category._id);
    }
  }, [categData, categError, courseData, courseError]);

  useEffect(() => {
    if (results.isSuccess) navigate('/courses');
  });

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
    updateCourse({ id, name, description, category });
  };

  return (
    <Container maxWidth="lg" sx={{ marginTop: 8 }}>
      <Paper square>
        <BreadcrumbsBar
          paths={[
            { pathName: 'Home', path: '/' },
            { pathName: 'Courses', path: '/courses' },
          ]}
          currentPage={courseData ? courseData.data.data.name : '-'}
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
              <Grid item md={6}>
                {categLoading || courseLoading ? (
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

              <Grid item xs={6}></Grid>

              <Grid item xs={6}>
                {categLoading || courseLoading ? (
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
                {categLoading || courseLoading ? (
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

              <Grid item xs={4} mt={2}>
                {categLoading || courseLoading ? (
                  <Skeleton height={60} width={450} variant="rectangular" />
                ) : (
                  <Button
                    type="submit"
                    fullWidth
                    variant="contained"
                    style={{
                      backgroundColor: results.isLoading && 'grey',
                    }}
                  >
                    {results.isLoading ? (
                      <Box>
                        updating course
                        <CircularProgress
                          sx={{ color: 'white', ml: 2 }}
                          size={16}
                        />
                      </Box>
                    ) : (
                      'update course'
                    )}
                  </Button>
                )}
              </Grid>
              <Grid item xs={4} mt={2}></Grid>
              <Grid item xs={4} mt={2} sx={{ textAlign: 'right' }}>
                <Button onClick={() => navigate(`/courses/contents/${id}`)}>
                  Go to course content
                  <ArrowForwardRoundedIcon sx={{ ml: 1 }} />
                </Button>
              </Grid>
            </Grid>
          </Container>
        </ThemeProvider>
      </Paper>
    </Container>
  );
}

export default CourseInfoPage;
