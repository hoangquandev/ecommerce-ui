import './App.css'
import { BrowserRouter, Route, Routes } from 'react-router-dom'
import Public from './layouts/Public'
import Home from './pages/Home'
import Admin from './layouts/Admin'
import { useTheme } from '@mui/material'
import SignUp from './pages/SignUp'
import LoginPage from './pages/Login'
import User from './pages/User'
import Dashboard from './pages/admin/Dashboard'
import AccountSetting from './pages/admin/AccountSetting'
import CreateProduct from './pages/admin/products/CreateProduct'
import ProductList from './pages/admin/products/ProductList'
import Categories from './pages/admin/products/Categories'

function App() {
  const theme = useTheme()
  // console.log(theme); 
  return (
    <>
      <BrowserRouter>
        <Routes>
          <Route path='/' element={<Public topbarBgColor={theme.palette.grey[900]} />}>
            <Route path='' element={<Home />} />
            <Route path='user' element={<User />} />
          </Route>
          <Route path='/signup' element={<SignUp />} />
          <Route path='/login' element={<LoginPage />} />
          <Route path='/admin/' element={<Admin />}>
            <Route path='' element={<Dashboard />} />
            <Route path='products' element={<ProductList />} />
            <Route path='products/create' element={<CreateProduct />} />
            <Route path='products/categories' element={<Categories />} />
            <Route path='account-setting' element={<AccountSetting />} />
          </Route>
        </Routes>
      </BrowserRouter>
    </>
  )
}

export default App
