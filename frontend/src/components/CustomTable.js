import Table from '@mui/material/Table';
import TableBody from '@mui/material/TableBody';
import TableCell from '@mui/material/TableCell';
import TableContainer from '@mui/material/TableContainer';
import TableHead from '@mui/material/TableHead';
import TableRow from '@mui/material/TableRow';
import { Alert, Box, CircularProgress } from '@mui/material';
import { Link } from 'react-router-dom';
import DeleteIcon from '@mui/icons-material/Delete';
import { IconButton } from '@mui/material';
import { useDeleteCategoryMutation, useDeleteUserByIdMutation } from '../store';
import { useState } from 'react';

function CustomTable({ tableHeads, rows, deleteAction, searchTerm, data }) {
  const [deleteUserById, userDeleteResults] = useDeleteUserByIdMutation();
  const [deleteCategory, categoryDeleteResults] = useDeleteCategoryMutation();
  const [deletedId, setDeletedId] = useState('');

  const deleting =
    userDeleteResults.isLoading || categoryDeleteResults.isLoading;

  let deleteFn;
  if (data === 'user') {
    deleteFn = deleteUserById;
  } else if (data === 'category') {
    deleteFn = deleteCategory;
  }
  const handleUserDeleteSubmit = (e, id) => {
    e.preventDefault();
    deleteFn(id);
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

  return (
    <TableContainer component={Box} sx={{ maxHeight: 800 }}>
      {/* {error && <Alert severity="error"></Alert>} */}
      <Table stickyHeader sx={{ minWidth: 650 }} aria-label="simple table">
        <TableHead>
          <TableRow>
            {tableHeads.map((title, index) =>
              index === 0 || index === 1 ? (
                <TableCell sx={{ fontSize: 16 }} key={index + title}>
                  {title}
                </TableCell>
              ) : (
                <TableCell
                  align="right"
                  sx={{ fontSize: 16 }}
                  key={index + title}
                >
                  {title}
                </TableCell>
              )
            )}
          </TableRow>
        </TableHead>
        <TableBody>
          {rows
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
                {deleteAction && (
                  <TableCell align="right" key={index} sx={{ fontSize: 16 }}>
                    {deleteButton(row[0].pathName, deleting)}
                  </TableCell>
                )}
              </TableRow>
            ))}
        </TableBody>
      </Table>
    </TableContainer>
  );
}

export default CustomTable;
