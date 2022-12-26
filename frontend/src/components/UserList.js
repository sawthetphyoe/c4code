import { useState } from 'react';
import { useGetAllUsersQuery } from '../store';
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
} from '@mui/material';
import DeleteIcon from '@mui/icons-material/Delete';
import { useDeleteUserByIdMutation } from '../store';
import { Link } from 'react-router-dom';
import SkeletonList from './SkeletonList';
import ErrorDisplay from './ErrorDisplay';

const tableHeads = [
  'User',
  'Email',
  'User type',
  'Registered Date',
  'Last Login',
  '',
];

function UserList({ searchTerm }) {
  const { data, error, isFetching } = useGetAllUsersQuery();
  const [deleteUserById, userDeleteResults] = useDeleteUserByIdMutation();
  const [deletedId, setDeletedId] = useState('');

  const handleUserDeleteSubmit = (e, id) => {
    e.preventDefault();
    deleteUserById(id);
    setDeletedId(id);
  };

  const deleteButton = (id, deleting) => {
    return (
      <form onSubmit={(e) => handleUserDeleteSubmit(e, id)}>
        <IconButton aria-label="delete" type="submit">
          {deleting && deletedId === id ? (
            <CircularProgress size={18} />
          ) : (
            <DeleteIcon />
          )}
        </IconButton>
      </form>
    );
  };

  let content;
  if (isFetching) {
    content = <SkeletonList times={6} spacing={2} />;
  } else if (error) {
    content = <ErrorDisplay message={error.data.message} />;
  } else {
    const rows = data.data.data.map((user) => {
      return [
        {
          name: user.firstName + ' ' + user.lastName,
          pathName: `${user._id}`,
        },
        user.email,
        user.role.charAt(0).toUpperCase() + user.role.slice(1),
        new Date(user.registeredAt).toLocaleDateString('en-UK'),
        user.lastLogin
          ? new Date(user.lastLogin).toLocaleDateString('en-UK')
          : 'Never',
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
            {deleteButton(row[0].pathName, userDeleteResults.isLoading)}
          </TableCell>
        </TableRow>
      ));
    content = (
      <TableContainer component={Box} sx={{ maxHeight: 800 }}>
        {userDeleteResults.isError && (
          <Alert severity="error">{userDeleteResults.error.data.message}</Alert>
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

  return <Container maxWidth="xl">{content}</Container>;
}

export default UserList;
// {/* <CustomTable
//         searchTerm={searchTerm}
//         rows={rows}
//         tableHeads={tableHeads}
//         deleteAction
//         data="user"
//       /> */}
