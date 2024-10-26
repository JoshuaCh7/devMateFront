import axios from 'axios';
import React, {useEffect, useState} from 'react';
import { useNavigate } from 'react-router-dom';

const AddProject = () => {
    const [project, setProject] = useState({
        nameProject: '',
        descriptionProject: '',
        idStatus: '',
    });
    const [status, setStatus] = useState([]);
    const navigate = useNavigate()

    useEffect(() => {
        axios
          .get("http://localhost:3000/auth/status")
          .then((result) => {
              if(result.data.Status){
                  setStatus(result.data.Result);
              } else {
                  alert(result.data.Error);
              }
          }).catch(err => console.log(err));
      }, []);

    
    const handleSubmit = (e) => {
        e.preventDefault()
        axios.post('http://localhost:3000/auth/add_project', project)
        .then(result => {
            if(result.data.Status) {
                navigate('/dashboard/project')
            } else {
                alert(result.data.Error)
            }
        })
        .catch(err => console.log(err))
    }

    return (
        <div className='d-flex justify-content-center align-items-center mt-3'>
            <div className='p-3 rounded w-50 border'>
                <h3 className='text-center'>New Project</h3>
                <form className='row g-1' onSubmit={handleSubmit}>
                    <div className='mb-12'>
                        <label for="inputNameProject" className='form-label'>Name of Project</label>
                        <input type="text" className='form-control rounded-0'id='inputNameProject' placeholder='Enter Name of Project'
                        onChange={(e) => setProject({...project, nameProject: e.target.value})}/>
                    </div>
                    <div className='mb-12 input-group'>
                        <label for="inputDescription" className='form-label'>Description</label>
                        <input className='form-control rounded-0'id='inputDescriptionProject' area-label='Enter Description of Project'
                        onChange={(e) => setProject({...project, descriptionProject: e.target.value})}/>
                    </div>
                    <div className='col-12'>
                        <label for="status" className='form-label'>
                            Status
                        </label>
                        <select name="status" id='status' className='form-select'
                        onChange={(e) => setProject({...project, idStatus: e.target.value})}>
                            {status.map(s => {
                                return <option value={s.idStatus}>{s.status}</option>
                            })}
                        </select>
                    </div>
                    <div className='col-12'>
                    <button type='submit' className='btn btn-primary w-100'>Create Project</button>
                    </div>
                </form>
            </div>
        </div>
    )
}

export default AddProject