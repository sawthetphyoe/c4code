import { Typography } from '@mui/material';
import { Link } from 'react-router-dom';

function Copyright(props) {
  return (
    <Typography
      variant="body2"
      color="text.secondary"
      align="center"
      {...props}
    >
      {'Copyright © '}
      <Link color="inherit" href="/">
        <Typography
          variant="body2"
          component={'span'}
          sx={{ letterSpacing: '.1rem' }}
        >
          C4CODE
        </Typography>
      </Link>{' '}
      {new Date().getFullYear()}
      {'.'}
    </Typography>
  );
}

export default Copyright;
