import React, { Suspense, useEffect } from 'react';
import { useDispatch, useSelector } from 'react-redux';
import { Navigate, Route, Routes } from 'react-router-dom';
import { loadTransactions } from './actions/transactionActions';
import { loadUser } from './actions/userActions';
import './App.css';
import About from './pages/About';
import DisplayMonth from './pages/DisplayMonth';
import InsertItem from './pages/InsertItem';
import Auth from './pages/Auth';
import Version from './pages/Version';

const HomePage = React.lazy(() => import('./pages/Home'));
const NotFoundPage = React.lazy(() => import('./pages/NotFound'));

function App() {
  const { currentYear } = useSelector((state) => state.transaction);
  const { isLoggedIn } = useSelector((state) => state.user);
  const dispatch = useDispatch();

  let routes = [];

  if (isLoggedIn) {
    routes = [
      {
        path: '/',
        component: <Navigate replace to={'yearOverview'} />
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
    ]
  } else {
    routes = [
      {
        path: '/',
        component: <Navigate replace to={'auth'} />
      },
      {
        path: '/auth',
        component: <Auth />
      },
    ]
  }

  routes = [...routes,
  {
    path: '/about',
    component: <About />
  },
  {
    path: '/version',
    component: <Version />
  },
  {
    path: '*',
    component: <NotFoundPage />
  }
  ]

  useEffect(() => {
    dispatch(loadTransactions(currentYear));
    dispatch(loadUser());
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
