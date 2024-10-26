import React, {useState, useEffect} from 'react'
import { useNavigate, useParams } from 'react-router-dom';
import axios from 'axios';

const EditEmployee = () => {
    const {idEmployee} = useParams()
    const [employee, setEmployee] = useState({
        name: "",
        email: "",
        idCategory: "",
    });
    
    const [category, setCategory] = useState([])
    const navigate = useNavigate()

    useEffect(() => {
        axios.get('http://localhost:3000/auth/category')
        .then(result => {
          if(result.data.Status){
            setCategory(result.data.Result);
          } else {
            alert(result.data.Error)
          }
        }).catch(err => console.log(err))

        axios.get('http://localhost:3000/auth/employee/'+idEmployee)
        .then(result => {
            setEmployee({
                ...employee,
                name: result.data.Result[0].name,
                email: result.data.Result[0].email,
                idCategory: result.data.Result[0].idCategory,
            })
        }).catch (err => console.log(err))
    }, [])

    const handleSubmit = (e) => {
        e.preventDefault()
        axios.put('http://localhost:3000/auth/edit_employee/'+idEmployee, employee)
        .then(result =>{
            if(result.data.Status){
                navigate('/dashboard/employee')
            }else{
                alert(result.data.Error)
            }
        }).catch(err => console.log(err))
    }

  return (
    <div className='d-flex justify-content-center align-items-center mt-3'>
        <div className='p-3 rounded w-50 border'>
            <h3 className='text-center'>Edit Employee</h3>
            <form className='row g-1' onSubmit={handleSubmit}>
                <div className='mb-12'>
                    <label for="inputName" className='form-label'>Name</label>
                    <input type="text" className='form-control rounded-0'id='inputName' placeholder='Enter Name' value={employee.name}
                    onChange={(e) => setEmployee({...employee, name: e.target.value})}/>
                </div>
                <div className='col-12'>
                    <label for="inputEmail4" className='form-label'>
                        Email
                    </label>
                    <input type="text" className='form-control rounded-0' id='inputEmail4' placeholder='Enter Email' autoComplete='off' value={employee.email}
                    onChange={(e) => setEmployee({...employee, email: e.target.value})}/>
                </div>
                <div className='col-12'>
                    <label for="category" className='form-label'>
                        Category
                    </label>
                    <select name="category" id='category' className='form-select'
                    onChange={(e) => setEmployee({...employee, idCategory: e.target.value})}>
                        {category.map(c => {
                            return <option value={c.id}>{c.nameCategory}</option>
                        })}
                    </select>
                </div>
                <div className='col-12'>
                <button type='submit' className='btn btn-primary w-100'>Edit Employee</button>
                </div>
            </form>
        </div>
    </div>
  )
}

export default EditEmployee