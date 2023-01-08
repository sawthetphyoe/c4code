import { useCheckLoginQuery } from '../store';
import Loading from 'react-fullscreen-loading';
import { Navigate, Outlet } from 'react-router-dom';

function ProtectedRoutes() {
	const { data, error, isFetching } = useCheckLoginQuery();

	let content;
	if (isFetching) {
		content = <Loading loading background="#e3f2fd" loaderColor="#0d47a1" />;
	} else if (error) {
		content = (
			<Navigate to="/login" replace state={{ message: error.data.message }} />
		);
	} else if (data) {
		content = <Outlet />;
	}

	return content;
}

export default ProtectedRoutes;
