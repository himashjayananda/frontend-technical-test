import { Routes, Route, Navigate, Outlet } from 'react-router-dom';
import { ToastContainer } from 'react-toastify';
import { useAppSelector } from './behavior/hooks';
import Header from './components/Header';
import { Chart, Home, Login, PageNotFound } from './pages';

const ProtectedRoutes = () => {
  const { isAuthenticated } = useAppSelector(state => state.session);

  if (!isAuthenticated) {
    return <Navigate to={'/login'} replace />;
  }

  return <Outlet />;
};

function App() {
  return (
    <div className='main-wrapper'>
      <ToastContainer />
      <Header />
      <Routes>
        <Route path='/login' element={<Login />} />
        <Route element={<ProtectedRoutes />}>
          <Route path='/' element={<Home />} />
          <Route path='/chart' element={<Chart />} />
        </Route>
        <Route path='*' element={<PageNotFound />} />
      </Routes>
    </div>
  );
}

export default App;
