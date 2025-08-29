import { StrictMode } from 'react'
import { createRoot } from 'react-dom/client'
import './index.css'
import Public_transit_App from './public_transit/Public_Transit_App.jsx'
import Heading from './Heading.jsx'
import Leftbar from './Leftbar.jsx'

createRoot(document.getElementById('root')).render(
  <StrictMode>
    <Heading />
    <Leftbar />
    {/* <Public_transit_App /> */}
  </StrictMode>,
)
