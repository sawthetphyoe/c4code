import { Alert, Paper } from '@mui/material';
import { Container } from '@mui/system';

function ErrorDisplay({ message, code }) {
  return (
    <Container>
      <Paper>
        <Alert severity="error">{message}</Alert>
      </Paper>
    </Container>
  );
}

export default ErrorDisplay;
