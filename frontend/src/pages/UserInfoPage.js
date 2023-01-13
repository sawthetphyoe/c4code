import { Container, Paper } from '@mui/material';
import BreadcrumbsBar from '../components/BreadcrumbsBar';
import UserInfoTab from '../users/UserInfoTab';
import Tab from '../components/Tab';
import { useGetUserByIdQuery } from '../store';
import { useParams } from 'react-router-dom';
import Error from '../ultis/Error';
import LoadingBar from '../ultis/LoadingBar';

export default function UserInfoPage() {
	const { id } = useParams();
	const { data, error, isLoading, isFetching } = useGetUserByIdQuery(id);

	if (error) return <Error message={error.data.message} />;

	if (isLoading) return <LoadingBar />;

	const user = data.data.data;

	const formattedName =
		user.firstName.split(' ')[0].charAt(0) +
		'. ' +
		(user.firstName.split(' ')[1] || '') +
		' ' +
		user.lastName;

	return (
		<Container maxWidth="xl">
			<Paper sx={{ height: '100%', overflow: 'hidden' }}>
				<BreadcrumbsBar
					paths={[
						{
							pathName: 'Home',
							path: '/',
						},
						{
							pathName: 'Users',
							path: '/users',
						},
					]}
					currentPage={isFetching ? '-' : formattedName}
				/>
				<Tab tabs={[<UserInfoTab />, <div>Tab 2</div>, <div>Tab3</div>]} />
			</Paper>
		</Container>
	);
}
