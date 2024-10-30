import { StrictMode } from 'react'
import React from 'react'
//! defualt
import { createRoot } from 'react-dom/client'
import App from './App.jsx'

createRoot(document
    .getElementById('root'))
    .render(
    <App />
)
