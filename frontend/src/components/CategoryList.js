import { useState } from 'react';
import {
  useGetAllCategoriesQuery,
  useDeleteCategoryMutation,
  useGetAllCoursesQuery,
} from '../store';
import {
  Box,
  Container,
  TableContainer,
  Table,
  TableHead,
  TableBody,
  TableRow,
  TableCell,
  IconButton,
  Alert,
  CircularProgress,
  Typography,
} from '@mui/material';
import { Link } from 'react-router-dom';
import DeleteIcon from '@mui/icons-material/Delete';
import SkeletonList from './SkeletonList';
import ErrorDisplay from './ErrorDisplay';

const tableHeads = ['NAME', 'NUMBER OF COURSES', ''];

function UserList({ searchTerm }) {
  const { data, error, isFetching } = useGetAllCategoriesQuery();
  const [deleteCategory, categoryDeleteResults] = useDeleteCategoryMutation();

  const {
    data: courseData,
    error: courseError,
    isFetching: courseFetching,
  } = useGetAllCoursesQuery();

  const [deletedId, setDeletedId] = useState('');
  const [deleteAccess, setDeleteAccess] = useState(true);

  const handleUserDeleteSubmit = (e, data) => {
    setDeleteAccess(true);
    e.preventDefault();
    if (data[1] > 0) {
      setDeleteAccess(false);
      return;
    }
    const id = data[0].pathName;
    deleteCategory(id);
    setDeletedId(id);
  };

  const deleteButton = (data, deleting) => {
    return (
      <form onSubmit={(e) => handleUserDeleteSubmit(e, data)}>
        <IconButton aria-label="delete" type="submit">
          {deleting && deletedId === data[0].pathName ? (
            <CircularProgress size={18} />
          ) : (
            <DeleteIcon />
          )}
        </IconButton>
      </form>
    );
  };

  let alert;
  if (!deleteAccess) {
    alert = (
      <Alert severity="error">
        <Typography variant="h6" sx={{ fontSize: 18 }}>
          Access Denied! One or more courses are associated with this category.
        </Typography>
      </Alert>
    );
  } else {
    alert = '';
  }

  let content;
  if (isFetching || courseFetching) {
    content = <SkeletonList times={6} spacing={2} />;
  } else if (error || courseError) {
    content = <ErrorDisplay message={error.data.message} />;
  } else {
    const courses = courseData.data.data;
    const rows = data.data.data.map((cate) => {
      return [
        {
          name: cate.name,
          pathName: `${cate._id}`,
        },
        courses.filter((course) => course.category._id === cate._id).length,
      ];
    });

    const renderedtableHeads = tableHeads.map((title, index) =>
      index === 0 || index === 1 ? (
        <TableCell sx={{ fontSize: 16 }} key={index + title}>
          {title}
        </TableCell>
      ) : (
        <TableCell align="right" sx={{ fontSize: 16 }} key={index + title}>
          {title}
        </TableCell>
      )
    );

    const renderedtableRows = rows
      .filter((row) =>
        row[0].name.toLowerCase().includes(searchTerm.toLowerCase())
      )
      .map((row, index) => (
        <TableRow
          key={index}
          sx={{
            '&:last-child td, &:last-child th': { border: 0 },
          }}
          hover={true}
        >
          {row.map((item, index) =>
            index === 0 || index === 1 ? (
              <TableCell
                component="th"
                scope="row"
                key={index}
                sx={{ fontSize: 16 }}
              >
                {index === 0 ? (
                  <Link
                    to={item.pathName}
                    style={{
                      color: 'inherit',
                      textDecoration: 'none',
                      textTransform: 'capitalize',
                    }}
                    className="hover-underlined"
                  >
                    {item.name}
                  </Link>
                ) : (
                  item
                )}
              </TableCell>
            ) : (
              <TableCell align="right" key={index} sx={{ fontSize: 16 }}>
                {item}
              </TableCell>
            )
          )}

          <TableCell align="right" key={index} sx={{ fontSize: 16 }}>
            {deleteButton(row, categoryDeleteResults.isLoading)}
          </TableCell>
        </TableRow>
      ));

    content = (
      <TableContainer component={Box} sx={{ maxHeight: 800 }}>
        {categoryDeleteResults.isError && (
          <Alert severity="error">
            {categoryDeleteResults.error.data.message}
          </Alert>
        )}
        <Table stickyHeader sx={{ minWidth: 650 }}>
          <TableHead>
            <TableRow>{renderedtableHeads}</TableRow>
          </TableHead>
          <TableBody>{renderedtableRows}</TableBody>
        </Table>
      </TableContainer>
    );
  }

  return (
    <Container maxWidth="xl">
      <Container maxWidth="md" sx={{ height: 60 }}>
        {alert}
      </Container>
      {content}
    </Container>
  );
}

export default UserList;
