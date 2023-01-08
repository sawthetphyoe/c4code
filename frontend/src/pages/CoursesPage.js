import { Button, Container, Paper } from '@mui/material';
import { Link } from 'react-router-dom';
import CourseList from '../courses/CourseList';
import BreadcrumbsBar from '../components/BreadcrumbsBar';
import AddRoundedIcon from '@mui/icons-material/AddRounded';
import SearchIcon from '@mui/icons-material/Search';
import { styled, alpha } from '@mui/material/styles';
import InputBase from '@mui/material/InputBase';
import { useState } from 'react';

const Search = styled('div')(({ theme }) => ({
  position: 'relative',
  borderRadius: theme.shape.borderRadius,
  backgroundColor: alpha(theme.palette.common.white, 0.15),
  '&:hover': {
    backgroundColor: alpha(theme.palette.common.white, 0.25),
  },
  marginLeft: 0,
  width: '100%',
  [theme.breakpoints.up('sm')]: {
    marginLeft: theme.spacing(1),
    width: 'auto',
  },
}));

const SearchIconWrapper = styled('div')(({ theme }) => ({
  padding: theme.spacing(0, 2),
  height: '100%',
  position: 'absolute',
  pointerEvents: 'none',
  display: 'flex',
  alignItems: 'center',
  justifyContent: 'center',
}));

const StyledInputBase = styled(InputBase)(({ theme }) => ({
  color: 'inherit',
  '& .MuiInputBase-input': {
    padding: theme.spacing(1, 1, 1, 0),
    // vertical padding + font size from searchIcon
    paddingLeft: `calc(1em + ${theme.spacing(4)})`,
    transition: theme.transitions.create('width'),
    width: '100%',
    [theme.breakpoints.up('sm')]: {
      width: '12ch',
      '&:focus': {
        width: '20ch',
      },
    },
  },
}));

function CategoriesPage() {
  const [searchTerm, setSearchTerm] = useState('');

  const handleSearchTermChange = (e) => {
    setSearchTerm(e.target.value);
  };

  return (
    <Container maxWidth="lg" sx={{ marginTop: 8 }}>
      <Paper sx={{ height: '100%', overflow: 'hidden' }}>
        <BreadcrumbsBar
          paths={[
            {
              pathName: 'Home',
              path: '/',
            },
          ]}
          currentPage="courses"
        >
          <Search>
            <SearchIconWrapper>
              <SearchIcon />
            </SearchIconWrapper>
            <StyledInputBase
              placeholder="Search…"
              inputProps={{ 'aria-label': 'search' }}
              value={searchTerm}
              onChange={handleSearchTermChange}
            />
          </Search>
        </BreadcrumbsBar>
        <Link to="new" style={{ textDecoration: 'none' }}>
          <Button
            variant="contained"
            sx={{
              marginLeft: 3,
              marginTop: 3,
              marginBottom: 2,
              pr: 3,
            }}
          >
            <AddRoundedIcon sx={{ fontSize: 22, mr: 1 }} /> Add course
          </Button>
        </Link>
        <CourseList searchTerm={searchTerm} />
      </Paper>
    </Container>
  );
}

export default CategoriesPage;
