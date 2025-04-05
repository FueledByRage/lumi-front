import { StrictMode } from 'react'
import { createRoot } from 'react-dom/client'
import CustomerTable from './table/index.tsx'

createRoot(document.getElementById('root')!).render(
  <StrictMode>
    <CustomerTable />
  </StrictMode>,
)
