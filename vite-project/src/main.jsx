// import { StrictMode } from 'react'
import React from 'react'
//! defualt
import { createRoot } from 'react-dom/client'
import App from './App.jsx'
import './services/i18n.js'

createRoot(document
    .getElementById('root'))
    .render(
    <App />
)
