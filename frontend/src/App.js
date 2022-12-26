import '@fontsource/roboto/300.css';
import '@fontsource/roboto/400.css';
import '@fontsource/roboto/500.css';
import '@fontsource/roboto/700.css';
import { BrowserRouter, Routes, Route } from 'react-router-dom';
import ResponsiveAppBar from './components/ResponsiveAppBar';

import AdminHomePage from './pages/AdminHomePage';
import LoginPage from './pages/LoginPage';

import ProtectedRoutes from './routes/ProtectedRoutes';
import Copyright from './components/Copyright';
import UserRoutes from './routes/UserRoutes';
import CategoryRoutes from './routes/CategoryRoutes';
import CoursesRoutes from './routes/CoursesRoutes';

function App() {
  return (
    <BrowserRouter>
      <ResponsiveAppBar />
      <Routes>
        <Route path="/login" element={<LoginPage />} />
        <Route element={<ProtectedRoutes />}>
          <Route path="/" element={<AdminHomePage />} />
          <Route path="users/*" element={<UserRoutes />} />
          <Route path="categories/*" element={<CategoryRoutes />} />
          <Route path="courses/*" element={<CoursesRoutes />} />
        </Route>
      </Routes>
      <Copyright sx={{ mt: 8, mb: 4 }} />
    </BrowserRouter>
  );
}

export default App;
