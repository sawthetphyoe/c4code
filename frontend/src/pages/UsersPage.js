import { Button, Container, Paper } from '@mui/material';
import UserList from '../users/UserList';
import BreadcrumbsBar from '../components/BreadcrumbsBar';
import { useCallback, useState } from 'react';
import SearchInput from '../components/SearchInput';
import AddUserOverlay from '../users/AddUserOverlay';

function UsersPage() {
	const [searchTerm, setSearchTerm] = useState('');
	const [modalOpen, setModalOpen] = useState(false);

	const handleSearchTermChange = (e) => {
		setSearchTerm(e.target.value);
	};

	const onModalClose = useCallback(() => {
		setModalOpen(false);
	}, []);

	return (
		<Container maxWidth="xl" sx={{ marginTop: 8 }}>
			<Paper sx={{ height: '100%', overflow: 'hidden' }}>
				<BreadcrumbsBar
					paths={[
						{
							pathName: 'Home',
							path: '/',
						},
					]}
					currentPage="Users"
				>
					<SearchInput term={searchTerm} onChange={handleSearchTermChange} />
				</BreadcrumbsBar>

				<Container
					maxWidth="xl"
					sx={{
						display: 'flex',
						flexDirection: 'column',
						alignItems: 'flex-start',
						gap: 4,
						mt: 4,
						mb: 4,
					}}
				>
					<Button variant="contained" onClick={() => setModalOpen(true)}>
						+ Add user
					</Button>

					<UserList searchTerm={searchTerm} />
				</Container>
			</Paper>

			<AddUserOverlay open={modalOpen} onClose={onModalClose} />
		</Container>
	);
}

export default UsersPage;
