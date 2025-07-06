import { StrictMode } from 'react'
import { createRoot } from 'react-dom/client'
import { Provider } from 'react-redux'
import { RouterProvider } from 'react-router-dom'
import {  Login, SignUp, Protected } from "./components/index.jsx"
import  AllPosts  from './pages/AllPosts'
import  AddPost  from './pages/AddPost'
import  EditPost  from './pages/EditPost'
import  Post  from './pages/Post'
import Home from './pages/Home.jsx'
import App from './App.jsx'
import store from './store/store.js'
import { createBrowserRouter } from 'react-router-dom'

const router = createBrowserRouter([
  {
    path: '/',
    element: <App />,
    children: [
      {
        path: '/',
        element: <Home />
      },
      {
        path: '/login',
         element: (  
         <Protected authentication={false}>
          <Login />
        </Protected>
        )
      },
      {
        path: '/signup',
        element:(
         <Protected authentication={false}>
           <SignUp />
        </Protected>
        )
      },
      {
        path: '/all-posts', 
        element:   
         (<Protected authentication>
         <AllPosts />
        </Protected>
        )
      },
      {
        path: '/add-post',
        element:  
        (<Protected authentication>
         <AddPost />
        </Protected>
        )
      },
      {
        path: '/edit-post/:slug',
        element: (<Protected authentication>
          <EditPost />
        </Protected>
        )
      },
      {
        path: '/post/:slug',
        element: 
        (<Protected >
          <Post />
        </Protected>
        )
      }
    ]
  }
])

createRoot(document.getElementById('root')).render(
  <StrictMode>
    <Provider store={store}>
      <RouterProvider router={router}>
      </RouterProvider>
    </Provider>
  </StrictMode>
)
