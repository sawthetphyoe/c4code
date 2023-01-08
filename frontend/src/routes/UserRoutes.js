import { Route, Routes } from 'react-router-dom';
import UsersPage from '../pages/UsersPage';
import UserInfoPage from '../pages/UserInfoPage';

function UserRoutes() {
	return (
		<Routes>
			<Route index element={<UsersPage />} />
			<Route path=":id" element={<UserInfoPage />} />
		</Routes>
	);
}

export default UserRoutes;
