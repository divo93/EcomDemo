
import React from 'react'
import { BrowserRouter, Route } from 'react-router-dom'
import { Routes } from './containers/Routes';


export const App = () => {
  return (
    <BrowserRouter>
      <Route path="/" component={Routes} />
    </BrowserRouter>
  )
}