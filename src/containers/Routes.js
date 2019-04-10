
import React from 'react'
import { Redirect, Route, Switch} from 'react-router-dom'
import {Headers} from './Headers'
import Home from './Home'


export const Routes = () => {
  return (
    <div>
      <Headers />
    <main>
      <Switch>
        <Route path="/home" component={Home} />
      </Switch>
    </main>
    </div>
  )
  }