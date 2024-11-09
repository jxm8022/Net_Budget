import React, { Suspense, useEffect } from 'react';
import { useDispatch, useSelector } from 'react-redux';
import { Navigate, Route, Routes } from 'react-router-dom';
import { loadRecurringTransactions, loadTransactions } from './actions/transactionActions';
import { loadUser } from './actions/userActions';
import { loadTransactionsAPI } from './api/TransactionAPI';
import { calculateStatistics, saveAllTransactions } from './actions/statisticActions';
import { calculateDebtSummary, loadDebt } from './actions/debtActions';
import About from './pages/About';
import DisplayMonth from './pages/DisplayMonth';
import Auth from './pages/Auth';
import Version from './pages/Version';
import Account from './pages/Account';
import AddTransaction from './components/DisplayMonth/AddTransaction/AddTransaction';
import Statistics from './pages/Statistics';
import Debt from './pages/Debt';
import './App.css';

const HomePage = React.lazy(() => import('./pages/Home'));
const NotFoundPage = React.lazy(() => import('./pages/NotFound'));

function App() {
  const { lifetimeTransactions } = useSelector((state) => state.statistics);
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
        path: '/statistics',
        component: <Statistics />
      },
      {
        path: '/debt',
        component: <Debt />
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
      if (lifetimeTransactions && Object.keys(lifetimeTransactions).length !== 0) {
        dispatch(loadTransactions(lifetimeTransactions[currentYear]));
        dispatch(calculateStatistics());
        dispatch(calculateDebtSummary(lifetimeTransactions));
      } else {
        loadTransactionsAPI(userId, token).then((res) => {
          dispatch(saveAllTransactions(res?.transactions));
          if (res) {
            dispatch(loadRecurringTransactions(res.recurringTransactions));
            dispatch(loadDebt(res.debts));
          } else {
            localStorage.setItem('startYear', new Date().getFullYear().toString());
          }
        });
      }
    }
    else
    {
      dispatch(loadUser());
    }
  }, [dispatch, currentYear, userId, token, lifetimeTransactions]);

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
