import axios from 'axios';
import React, {useEffect, useState} from "react";
import { Link, Navigate, useNavigate } from "react-router-dom";

const Project = () => {
  const [project, setProject] = useState([])
  const navigate = useNavigate()

  useEffect(() => {
    axios.get('http://localhost:3000/auth/project')
    .then(result => {
      if(result.data.Status){
        setProject(result.data.Result);
      } else {
        alert(result.data.Error)
      }
    }).catch(err => console.log(err))
  }, [])

  return (
    <div className="px-5 mt-3">
      <div className="d-flex justify-content-center">
        <h3>Project List</h3>
      </div>
      <Link to="/dashboard/add_project" className="btn btn-success">
        Create Project
      </Link>
      <div className='mt-3'>
        <table className='table'>
          <thead>
            <tr>
              <th>Project Name</th>
              <th>Description</th>
              <th>Actions</th>
            </tr>
          </thead>
          <tbody>
            {
              project.map(p => (
                <tr>
                  <td>{p.nameProject}</td>
                  <td>{p.descriptionProject}</td>
                  <td>
                  <Link to={`/dashboard/test/`+p.idProject} className="btn btn-success">
                  Test Planning
                  </Link>
                  </td>
                </tr>
              ))
            }
          </tbody>
        </table>
      </div>
    </div>
  );
};

export default Project;