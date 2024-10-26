import './App.css'
import 'bootstrap/dist/css/bootstrap.min.css'
import "bootstrap/dist/js/bootstrap.bundle.js";
import Login from './Components/Login'
import {BrowserRouter, Routes, Route, Navigate} from 'react-router-dom'
import Dashboard from './Components/Dashboard'
import Home from './Components/Home'
import Employee from './Components/Employee'
import Category from './Components/Category'
import Project from './Components/Project'
import AddCategory from './Components/AddCategory'
import AddEmployee from './Components/AddEmployee'
import EditEmployee from './Components/EditEmployee'
import AddProject from './Components/AddProject'
import Start from './Components/Start'
import EmployeeLogin from './Components/EmployeeLogin'
import EmployeeDetail from './Components/EmployeeDetail'
import { useEffect } from 'react'
import axios from 'axios'
import PrivateRoute from './Components/PrivateRoute'
import Test from './Components/Test'

function App() {

  return (
    <BrowserRouter>
    <Routes>
      <Route path='/' element={<Start />}></Route>
      <Route path='/adminlogin' element={<Login />}></Route>
      <Route path='/employee_login' element={<EmployeeLogin />}></Route>
      <Route path='/employee_detail/:idEmployee' element={<EmployeeDetail />}></Route>
      <Route path='/dashboard' element={
        <PrivateRoute>
          <Dashboard />
        </PrivateRoute>
        }>
        <Route path='' element={<Home />}></Route>
        <Route path='/dashboard/employee' element={<Employee />}></Route>
        <Route path='/dashboard/category' element={<Category />}></Route>
        <Route path='/dashboard/project' element={<Project />}></Route> 
        <Route path='/dashboard/add_category' element={<AddCategory />}></Route>
        <Route path='/dashboard/add_employee' element={<AddEmployee />}></Route>
        <Route path='/dashboard/edit_employee/:idEmployee' element={<EditEmployee />}></Route>
        <Route path='/dashboard/add_project' element={<AddProject />}></Route>
        <Route path='/dashboard/test/:idProject' element={<Test />}></Route>
      </Route>
    </Routes>
    </BrowserRouter>
  )
}

export default App