import { Route, Routes } from 'react-router-dom';
import StudentHomePage from '../pages/StudentHomePage';

export default function StudentRoutes() {
	return (
		<Routes>
			<Route path="/" element={<StudentHomePage />} />
		</Routes>
	);
}
