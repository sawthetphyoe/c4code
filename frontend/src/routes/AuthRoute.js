import { useCheckLoginQuery } from '../store';
import Loading from 'react-fullscreen-loading';
import { Navigate } from 'react-router-dom';
import AdminRoutes from './AdminRoutes';
import StudentRoutes from './StudentRoutes';

export default function AuthRoute() {
	const { data, error, isLoading } = useCheckLoginQuery();

	if (isLoading)
		return <Loading loading background="#95ADBE" loaderColor="#574F7D" />;

	if (error) {
		return (
			<Navigate to="/login" replace state={{ message: error.data.message }} />
		);
	}

	const user = data.data.data;

	return user.role === 'admin' || user.role === 'super-admin' ? (
		<AdminRoutes />
	) : (
		<StudentRoutes />
	);
}
