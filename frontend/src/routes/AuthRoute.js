import { useCheckLoginQuery } from '../store';
import Loading from 'react-fullscreen-loading';
import { useNavigate } from 'react-router-dom';
import AdminRoutes from './AdminRoutes';
import StudentRoutes from './StudentRoutes';

export default function AuthRoute() {
	const navigate = useNavigate();
	const { data, error, isLoading } = useCheckLoginQuery();

	if (isLoading)
		return <Loading loading background="#95ADBE" loaderColor="#574F7D" />;

	if (error) {
		navigate('/login', {
			replace: true,
			state: { message: error.data.message },
		});
		return;
	}

	const user = data.data.data;

	return user.role === 'admin' ? <AdminRoutes /> : <StudentRoutes />;
}
