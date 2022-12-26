import * as React from 'react';
import AppBar from '@mui/material/AppBar';
import Box from '@mui/material/Box';
import Toolbar from '@mui/material/Toolbar';
import { Typography } from '@mui/material';
import { Link } from 'react-router-dom';
import Breadcrumbs from '@mui/material/Breadcrumbs';
import NavigateNextIcon from '@mui/icons-material/NavigateNext';

function BreadcrumbsBar({ paths, currentPage, children }) {
  return (
    <Box>
      <AppBar position="static">
        <Toolbar sx={{ display: 'flex', justifyContent: 'space-between' }}>
          <Breadcrumbs
            separator={<NavigateNextIcon fontSize="small" />}
            aria-label="breadcrumb"
            sx={{ color: 'inherit' }}
          >
            {paths &&
              paths.map((path, index) => {
                return (
                  <Typography
                    variant="subtitle2"
                    component="span"
                    key={index + path.pathName}
                  >
                    <Link
                      to={path.path}
                      style={{
                        textDecoration: 'none',
                        color: 'inherit',
                        letterSpacing: '.05rem',
                      }}
                      className="hover-underlined"
                    >
                      {path.pathName.toUpperCase()}
                    </Link>
                  </Typography>
                );
              })}
            <span style={{ fontSize: '18px', fontWeight: 'bold' }}>
              {currentPage.toUpperCase()}
            </span>
          </Breadcrumbs>
          {children}
        </Toolbar>
      </AppBar>
    </Box>
  );
}

export default BreadcrumbsBar;
