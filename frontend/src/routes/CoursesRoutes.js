import { Routes, Route } from 'react-router-dom';
import CoursesPage from '../pages/CoursesPage';
import AddCoursePage from '../pages/AddCoursePage';

function CoursesRoutes() {
  return (
    <Routes>
      <Route index element={<CoursesPage />} />
      <Route path="new" element={<AddCoursePage />} />
    </Routes>
  );
}

export default CoursesRoutes;
