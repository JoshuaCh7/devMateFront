import axios from 'axios'
import React, { useEffect } from 'react'
import { Navigate, useNavigate } from 'react-router-dom'


const Start = () => {
    const navigate = useNavigate()

  axios.defaults.withCredentials = true;
    useEffect(() => {
      axios.get('hhtp://localhost:3000/verify')
      .then(result => {
        if(result.data.Status) {
          if(result.data.role === "admin"){
            navigate('/dashboard')
          } else{
            navigate('/employee_detail/'+result.data.idEmployee)
          }
        }
        }).catch(err => console.log(err))
    }, [])

  return (
    <div className="d-flex justify-content-center align-items-center vh-100 loginPage">
        <div className="border p-4 rounded w-25 loginForm">
            <h3 className="text-center mb-4">Login As</h3>
                <div className='d-flex justify-content-between mt-5 mb-2'>
                <button type="button" className="btn btn-primary w-100" onClick={() => {navigate('/employee_login')}}>Employee</button>
                <button type="button" className="btn btn-success w-100" onClick={() => {navigate('/adminlogin')}}>Admin</button>
                </div>
        </div>
    </div>
  )
}

export default Start