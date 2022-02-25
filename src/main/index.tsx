import Router from '@/presentation/pages/Router/routes'
import React from 'react'
import ReactDOM from 'react-dom'
import '@/presentation/styles/global.scss'
import { makeLogin } from './factories/pages/login/login-factory'

ReactDOM.render(
  <Router makeLogin={makeLogin}/>,
  document.getElementById('main')
)
