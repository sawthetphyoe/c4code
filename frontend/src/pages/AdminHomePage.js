import PeopleAltRoundedIcon from '@mui/icons-material/PeopleAltRounded';
import SchoolRoundedIcon from '@mui/icons-material/SchoolRounded';
import CategoryRoundedIcon from '@mui/icons-material/CategoryRounded';
import AssessmentRoundedIcon from '@mui/icons-material/AssessmentRounded';
import { Container, Grid, Paper } from '@mui/material';
import AdminDisplayCard from '../components/AdminDisplayCard';
import BreadcrumbsBar from '../components/BreadcrumbsBar';

function HomePage() {
  return (
    <Container maxWidth="md">
      <Paper
        elevation={3}
        sx={{
          marginTop: 12,
        }}
      >
        <BreadcrumbsBar currentPage="Home" />
        <Grid
          container
          rowSpacing={8}
          maxWidth="md"
          sx={{
            alignItems: 'center',
            paddingTop: 8,
            paddingBottom: 8,
          }}
        >
          <Grid item xs={6}>
            <AdminDisplayCard
              icon={<SchoolRoundedIcon sx={{ fontSize: 56 }} />}
              mainLink={{
                name: 'COURSES',
                path: 'course',
              }}
              links={[
                {
                  name: 'Create Course',
                  path: 'courses/new',
                },
              ]}
            />
          </Grid>

          <Grid item xs={6}>
            <AdminDisplayCard
              icon={<PeopleAltRoundedIcon sx={{ fontSize: 56 }} />}
              mainLink={{
                name: 'USERS',
                path: 'users',
              }}
              links={[
                {
                  name: 'Add User',
                  path: 'users/add-user',
                },
              ]}
            />
          </Grid>

          <Grid item xs={6}>
            <AdminDisplayCard
              icon={<CategoryRoundedIcon sx={{ fontSize: 56 }} />}
              mainLink={{
                name: 'CATEGORIES',
                path: 'categories',
              }}
              links={[
                {
                  name: 'Add new category',
                  path: 'categories/new',
                },
              ]}
            />
          </Grid>

          <Grid item xs={6}>
            <AdminDisplayCard
              icon={<AssessmentRoundedIcon sx={{ fontSize: 56 }} />}
              mainLink={{
                name: 'REPORTS',
                path: 'reports',
              }}
              links={[
                {
                  name: 'User reports',
                  path: 'reports/users',
                },
                {
                  name: 'Course reports',
                  path: 'reports/courses',
                },
              ]}
            />
          </Grid>
        </Grid>
      </Paper>
    </Container>
  );
}

export default HomePage;
