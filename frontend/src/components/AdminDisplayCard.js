import { Link } from 'react-router-dom';
import { Box, Typography } from '@mui/material';

function AdminDisplayCard({ icon, mainLink, links }) {
  return (
    <Box
      sx={{
        display: 'flex',
        flexDirection: 'column',
        alignItems: 'center',
        justifyContent: 'center',
        gap: 1,
      }}
    >
      <Box sx={{ marginBottom: 1 }}>{icon}</Box>
      <Link
        to={mainLink.path}
        className="hover-underlined"
        style={{ color: 'inherit' }}
      >
        <Typography
          variant="h6"
          sx={{ letterSpacing: '.01rem', color: 'inherit', fontSize: 18 }}
        >
          {mainLink.name}
        </Typography>
      </Link>
      {links.map((link, index) => (
        <Link
          to={link.path}
          key={index + link.name}
          style={{ color: 'inherit' }}
        >
          <Typography
            variant="subtitle2"
            component="span"
            sx={{ letterSpacing: '0.01rem', fontSize: 16, color: '#555' }}
            className="secondary-link"
          >
            {link.name}
          </Typography>
        </Link>
      ))}
    </Box>
  );
}

export default AdminDisplayCard;
