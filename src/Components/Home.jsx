import React, { useEffect, useState } from 'react'
import axios from 'axios'

const Home = () => {
  const [adminTotal, setAdminTotal] = useState(0)
  const [employeeTotal, setEmployeeTotal] = useState(0)
  const [categoryTotal, setCategoryTotal] = useState(0)
  const [projectTotal, setProjectTotal] = useState(0)

  useEffect(() => {
    adminCount();
    employeeCount();
    categoryCount();
    projectCount();
  }, [])
  const adminCount = () => {
    axios.get('http://localhost:3000/auth/admin_count')
    .then(result => {
      if(result.data.Status){
        setAdminTotal(result.data.Result[0].admin)
      }
    })
  }
  const employeeCount = () => {
    axios.get('http://localhost:3000/auth/employee_count')
    .then(result => {
      if(result.data.Status){
        setEmployeeTotal(result.data.Result[0].employee)
      }
    })
  }
  const categoryCount = () => {
    axios.get('http://localhost:3000/auth/category_count')
    .then(result => {
      if(result.data.Status){
        setCategoryTotal(result.data.Result[0].category)
      }
    })
  }
  const projectCount = () => {
    axios.get('http://localhost:3000/auth/project_count')
    .then(result => {
      if(result.data.Status){
        setProjectTotal(result.data.Result[0].project)
      }
    })
  }
  
  return (
    <div>
      <div className='p-3 d-flex justify-content-around mt-3'>
        <div className='px-3 pt-2 pb-3 border shadow-sm w-25'>
          <div className='text-center pb-1'>
            <h4>Dashboard Admin</h4>
          </div>
          <hr />
          <div className='d-flex justify-content-between'>
            <h5>Total: </h5>
            <h5>{adminTotal}</h5>
          </div>
        </div>
        <div className='px-3 pt-2 pb-3 border shadow-sm w-25'>
          <div className='text-center pb-1'>
            <h4>Employee</h4>
          </div>
          <hr />
          <div className='d-flex justify-content-between'>
            <h5>Total: </h5>
            <h5>{employeeTotal}</h5>
          </div>
        </div>
        <div className='px-3 pt-2 pb-3 border shadow-sm w-25'>
          <div className='text-center pb-1'>
            <h4>Category</h4>
          </div>
          <hr />
          <div className='d-flex justify-content-between'>
            <h5>Total: </h5>
            <h5>{categoryTotal}</h5>
          </div>
        </div>
        <div className='px-3 pt-2 pb-3 border shadow-sm w-25'>
          <div className='text-center pb-1'>
            <h4>Projects</h4>
          </div>
          <hr />
          <div className='d-flex justify-content-between'>
            <h5>Total: </h5>
            <h5>{projectTotal}</h5>
          </div>
        </div>
      </div>
    </div>
  )
}

export default Home