import { Routes, Route } from 'react-router-dom';
import CategoriesPage from '../pages/CategoriesPage';
import AddCategoryPage from '../pages/AddCategoryPage';
import CategoryInfoPage from '../pages/CategoryInfoPage';

function CategoryRoutes() {
  return (
    <Routes>
      <Route index element={<CategoriesPage />} />
      <Route path="new" element={<AddCategoryPage />} />
      <Route path=":id" element={<CategoryInfoPage />} />
    </Routes>
  );
}

export default CategoryRoutes;
