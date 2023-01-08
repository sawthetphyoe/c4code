import { useNavigate } from 'react-router-dom';
import { Button, Paper } from '@mui/material';

export default function IconCard({ icon, buttonText, link }) {
	const navigate = useNavigate();
	return (
		<Paper
			sx={{
				display: 'flex',
				flexDirection: 'column',
				alignItems: 'center',
				justifyContent: 'center',
				gap: 2,
				p: 3,
			}}
		>
			{icon}
			<Button variant="text" onClick={() => navigate(link)}>
				{buttonText}
			</Button>
		</Paper>
	);
}
