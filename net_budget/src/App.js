import React, { Suspense, useEffect } from 'react';
import { useDispatch, useSelector } from 'react-redux';
import { Navigate, Route, Routes } from 'react-router-dom';
import { loadTransactions, saveAllTransactions } from './actions/transactionActions';
import { loadUser } from './actions/userActions';
import './App.css';
import About from './pages/About';
import DisplayMonth from './pages/DisplayMonth';
import Auth from './pages/Auth';
import Version from './pages/Version';
import { loadTransactionsAPI } from './api/TransactionAPI';
import Account from './pages/Account';
import AddTransaction from './components/DisplayMonth/AddTransaction/AddTransaction';

const HomePage = React.lazy(() => import('./pages/Home'));
const NotFoundPage = React.lazy(() => import('./pages/NotFound'));

function App() {
  const { currentYear } = useSelector((state) => state.transaction);
  const { isLoggedIn, userId, token } = useSelector((state) => state.user);
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
        path: '/monthOverview',
        component: <DisplayMonth />
      },
      {
        path: '/monthOverview/addTransaction',
        component: <AddTransaction />
      },
      {
        path: '/account',
        component: <Account />
      }
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
    if (userId) {
      loadTransactionsAPI(userId, token).then((res) => {
        if (res) {
          dispatch(saveAllTransactions(res));
          localStorage.setItem('startYear', JSON.stringify(Object.keys(res)[0]));
          // SAVE OTHER YEARS IN STATE SO WHEN VIEW DATE IS CHANGED, IT GETS THAT TRANSACTION DATA
          let yearTransactions = {};
          for (const month in res[currentYear]) {
            const monthTransactions = [];
            for (const key in res[currentYear][month]) {
              monthTransactions.push({
                id: key,
                type: res[currentYear][month][key].type,
                date: res[currentYear][month][key].date,
                name: res[currentYear][month][key].name,
                amount: res[currentYear][month][key].amount
              })
            }

            yearTransactions[month] = monthTransactions;
          }
          dispatch(loadTransactions(yearTransactions));
        } else {
          localStorage.setItem('startYear', new Date().getFullYear().toString());
        }
      })
    }
    dispatch(loadUser());
  }, [dispatch, currentYear, userId, token]);

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
