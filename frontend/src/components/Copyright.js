import { Typography } from '@mui/material';
import { Link } from 'react-router-dom';

function Copyright(props) {
	return (
		<Typography variant="body2" align="center" {...props}>
			{'Copyright © '}
			<Link to="/">
				<Typography
					variant="body2"
					component={'span'}
					sx={{ letterSpacing: '.1rem', color: 'primary' }}
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
