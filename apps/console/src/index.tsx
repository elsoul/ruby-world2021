import React from 'react'
import * as ReactDom from 'react-dom'
import { devMode } from '@/utils/env'
import App from './App'

ReactDom.render(<App />, document.getElementById('root'))

if (!devMode && 'serviceWorker' in navigator) {
  window.addEventListener('load', () => {
    navigator.serviceWorker.register('/service-worker.js')
  })
}
