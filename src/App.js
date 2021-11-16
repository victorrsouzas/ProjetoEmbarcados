import { useEffect, useState } from 'react';
import './App.css';
import NavBar from './view/NavBar';
import Login from './auth/Login';
import Customer from './pages/index';
import { makeStyles } from '@material-ui/core';
import Image from './asserts/istockphoto-1279717621-170667a.jpg'

const useStyles = makeStyles((theme) => ({
  root: {
    backgroundImage: `url(${Image})`,
    //height: "100vh"
  },
}));

function App() {
  const classes = useStyles();
  const [user, setUser] = useState('');
  const [toggleForm, setToggleForm] = useState(true);
  const formMode = () => {
    setToggleForm(!toggleForm);
  }
  const userState = () => {
    const data = localStorage.getItem('user');
    const us = data !== null ? JSON.parse(data) : null;
    setUser(us);
  }

  useEffect(() => {
    userState();
  }, []);
  return (
    <>

      {user !== null ? (
        <>
          <NavBar setUserState={() => setUser(null)} />
        </>
      ) : (
        <>
          {toggleForm ? (<Login loggedIn={(user) => setUser(user)} toggle={() => formMode()} />)
            : ""}

        </>
      )}


    </>

  );
}

export default App;
