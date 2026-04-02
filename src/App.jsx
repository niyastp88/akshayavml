import { BrowserRouter, Route, Routes } from 'react-router-dom'
import FormPage from './pages/FormPage'
import AdminPage from './pages/AdminPage'

function App() {
  return (
    <BrowserRouter>
      <Routes>
        <Route path='/' element={<FormPage />} />
        <Route path='/admin' element={<AdminPage />} />
      </Routes>
    </BrowserRouter>
  )
}

export default App