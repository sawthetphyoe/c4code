import { Routes, Route } from 'react-router-dom';
import CoursesPage from '../pages/CoursesPage';
import CourseInfoPage from '../pages/CourseInfoPage';

function CoursesRoutes() {
	return (
		<Routes>
			<Route index element={<CoursesPage />} />
			<Route path=":id" element={<CourseInfoPage />} />
		</Routes>
	);
}

export default CoursesRoutes;
