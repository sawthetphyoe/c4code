import { Routes, Route } from 'react-router-dom';
import CoursesPage from '../pages/CoursesPage';
import AddCoursePage from '../courses/AddCoursePage';
import CourseInfoPage from '../pages/CourseInfoPage';
import CourseContentPage from '../courses/CourseContentPage';

function CoursesRoutes() {
	return (
		<Routes>
			<Route index element={<CoursesPage />} />
			<Route path=":id" element={<CourseInfoPage />} />
		</Routes>
	);
}

export default CoursesRoutes;
