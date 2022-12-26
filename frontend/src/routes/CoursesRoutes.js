import { Routes, Route } from 'react-router-dom';
import AddCoursePage from '../pages/AddCoursePage';

function CoursesRoutes() {
  return (
    <Routes>
      <Route index element={''} />
      <Route path="new" element={<AddCoursePage />} />
    </Routes>
  );
}

export default CoursesRoutes;
