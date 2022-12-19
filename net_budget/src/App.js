import React, { Suspense, useEffect } from 'react';
import { useDispatch, useSelector } from 'react-redux';
import { Navigate, Route, Routes } from 'react-router-dom';
import { loadTransactions } from './actions/transactionActions';
import { loadUser, saveUser } from './actions/userActions';
import './App.css';
import About from './pages/About';
import DisplayMonth from './pages/DisplayMonth';
import InsertItem from './pages/InsertItem';

const HomePage = React.lazy(() => import('./pages/Home'));
const NotFoundPage = React.lazy(() => import('./pages/NotFound'));

const currentYear = new Date().getFullYear();

const routes = [
  {
    path: '/',
    component: <Navigate replace to={`yearOverview?year=${currentYear}`} />
  },
  {
    path: '/yearOverview',
    component: <HomePage />
  },
  {
    path: '/addTransaction',
    component: <InsertItem />
  },
  {
    path: '/monthOverview',
    component: <DisplayMonth />
  },
  {
    path: '/about',
    component: <About />
  },
  {
    path: '*',
    component: <NotFoundPage />
  }
]

function App() {
  const { currentYear } = useSelector((state) => state.transaction);
  const dispatch = useDispatch();

  useEffect(() => {
    dispatch(loadTransactions(currentYear));
    dispatch(loadUser());
    dispatch(saveUser());
  }, [dispatch, currentYear]);

  return (
    <Suspense>
      <Routes>
        {
          routes.map(route => {
            const { path, component } = route;
            return <Route key={path} path={path} element={component} />;
          })
        }
      </Routes>
    </Suspense>
  );
}

export default App;
