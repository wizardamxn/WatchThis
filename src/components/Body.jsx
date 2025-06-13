import React from 'react'
import Header from './Header'
import Login from './Login'
import Browse from './Browse'
import { createBrowserRouter, RouterProvider } from 'react-router'

const Body = () => {
  const appRouter = createBrowserRouter([
    {
      path:'/',
      element:<Login/>
    },
    {
      path:'/browse',
      element:<Browse/>
    }
  ])



  return (
    <div className='w-full h-full'>
      <RouterProvider router={appRouter}/>
    </div>
  )
}

export default Body