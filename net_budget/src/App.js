import React, { Suspense } from 'react';
import { Navigate, Route, Routes } from 'react-router-dom';
import './App.css';
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
    path: '*',
    component: <NotFoundPage />
  }
]

function App() {
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
