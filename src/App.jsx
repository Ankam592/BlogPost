import { getCurrentUser } from './appwrite/auth';
import { useEffect, useState } from 'react'
import { useDispatch } from 'react-redux';
import { Outlet } from 'react-router-dom';
import {Footer} from './components/Index';
import {Header} from './components/header/Header'  
import { login_user, logout } from './store/authSlice';
import './App.css'

function App() {  
  const [loading, setLoading] = useState(true);
  const dispatch = useDispatch();
  console.log("Hello!")
  useEffect(() => {
    getCurrentUser().then((curUser) => {
      console.log(curUser)
        if (curUser) {
          dispatch(login_user({curUser}));
        }
        else {
          dispatch(logout());
        }
      }).finally(() => { (setLoading(false)) })
  }, [])


  if(loading)
  {
    return (
       <>
      <Header />
      <main className="min-h-[70vh]">
        <Outlet /> 
      </main>
      <Footer />
    </>
    )
  }
  else
  {
    return (
      <>
      <Header />
      <main className="min-h-[70vh]">
        <Outlet /> 
      </main>
      <Footer />
    </>
    )
  }

  
}

export default App
