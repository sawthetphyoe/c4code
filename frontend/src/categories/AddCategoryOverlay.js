import { useEffect, useState } from 'react';
import Button from '@mui/material/Button';
import TextField from '@mui/material/TextField';
import Dialog from '@mui/material/Dialog';
import CloseRoundedIcon from '@mui/icons-material/CloseRounded';
import DialogContent from '@mui/material/DialogContent';
import DialogTitle from '@mui/material/DialogTitle';
import { Grid, IconButton, Typography } from '@mui/material';
import { useCreateCategoryMutation } from '../store';
import LoadingBar from '../ultis/LoadingBar';

export default function AddUserOverlay({ open, onClose }) {
	const [createCategory, results] = useCreateCategoryMutation();
	const [edit, setEdit] = useState(false);
	const [name, setName] = useState('');

	useEffect(() => {
		if (results.isSuccess) {
			onClose();
			handleCancel();
		}
	}, [results.isSuccess, onClose]);

	const handleNameChange = (e) => {
		setName(e.target.value);
		setEdit(true);
	};

	const handleCreateCategorySubmit = (e) => {
		e.preventDefault();
		createCategory(name);
	};

	const handleCancel = () => {
		setName('');
		setEdit(false);
	};

	const handleClose = () => {
		onClose();
		handleCancel();
	};

	return (
		<div>
			{results.isLoading && <LoadingBar />}

			<Dialog open={open} onClose={() => handleClose()} maxWidth="md">
				<DialogTitle
					sx={{
						bgcolor: 'purple',
						display: 'flex',
						justifyContent: 'space-between',
						alignItems: 'center',
						width: 900,
					}}
				>
					<Typography sx={{ fontSize: 18, fontWeight: 'bold', color: 'white' }}>
						Add Category
					</Typography>
					<IconButton onClick={() => handleClose()}>
						<CloseRoundedIcon sx={{ color: 'white' }} />
					</IconButton>
				</DialogTitle>
				<DialogContent>
					<Grid
						container
						spacing={4}
						component="form"
						onSubmit={handleCreateCategorySubmit}
						sx={{ p: 8 }}
					>
						<Grid item sm={12}>
							<TextField
								fullWidth
								required
								label="Name"
								value={name}
								onChange={handleNameChange}
							/>
						</Grid>
						<Grid item sm={6}>
							<Button
								fullWidth
								variant="contained"
								disabled={!edit}
								type="submit"
							>
								add category
							</Button>
						</Grid>
						<Grid item sm={6}>
							{edit && (
								<Button fullWidth variant="outlined" onClick={handleCancel}>
									CANCEL
								</Button>
							)}
						</Grid>
					</Grid>
				</DialogContent>
			</Dialog>
		</div>
	);
}
