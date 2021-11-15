import './App.css';
import {
  BrowserRouter as Router,
  Switch,
  Route
} from "react-router-dom";
import Home from './components/Pages/Home/Home/Home';
import Login from './components/Pages/Login/Login/Login';
import Services from './components/Pages/Services/Services/Services';
import Dashboard from './components/Pages/Dashboard/Dashboard/Dashboard';
import Register from './components/Pages/Login/Register/Register';
import AuthProvider from './context/AuthProvider/AuthProvider';
import PrivateRoute from './components/Pages/Login/PrivateRoute/PrivateRoute';
import NotFound from './components/Pages/NotFound/NotFound'
import Order from '../src/components/Pages/Order/Order/Order'
import MyAccount from './components/Pages/MyAccount/MyAccount';

function App() {
  return (
    <div className="App">
      <AuthProvider>
        <Router>
          <Switch>
            <Route exact path="/">
              <Home />
            </Route>
            <Route path="/home">
              <Home />
            </Route>
            <Route path="/login">
              <Login />
            </Route>
            <Route path="/register">
              <Register />
            </Route>
            <Route path="/services">
              <Services />
            </Route>
            <PrivateRoute path="/dashboard">
              <Dashboard />
            </PrivateRoute>
            <PrivateRoute path="/orders/:carId">
              <Order></Order>
            </PrivateRoute>
            <PrivateRoute path="/myaccount">
              <MyAccount />
            </PrivateRoute>
            <Route path="*">
              <NotFound></NotFound>
            </Route>
          </Switch>
        </Router>
      </AuthProvider>
    </div>
  );
}

export default App;
