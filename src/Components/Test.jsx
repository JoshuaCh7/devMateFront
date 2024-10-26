import React, { useState, useEffect } from 'react'
import AddTest from './AddTest';
import { useParams } from 'react-router-dom';
import axios from 'axios';

const Test =() => {
  const [show, setShow] = useState(false);

  const handleClose = () => setShow(false);
  const handleShow = () => setShow(true);

  const {idProject} = useParams()

  const [test, setTest] = useState([])
  console.log(test)
  useEffect(() => {
    axios.get('http://localhost:3000/auth/test/'+idProject)
    .then(result => {
      if(result.data.Status){
        setTest(result.data.Result);
      } else {
        alert(result.data.Error)
      }
    }).catch(err => console.log(err))
  }, [])

  return (
    <>
    <div className='d-flex justify-content-center align-items-center mt-3'>
      <div className='p-3 rounded w-75 border'>
        <button className="btn btn-outline-success" type='submit' onClick={handleShow}>
          Add Plan Test
        </button>
        <div className="d-flex justify-content-center">
        <h3>Plan Test</h3>
      </div>
        <div className='mt-3'>
        <table className='table'>
          <thead>
            <tr>
              <th>Test Plan</th>
              <th>Description</th>
              <th>Actions</th>
            </tr>
          </thead>
          <tbody>
            {
              test.map(e => (
                <tr>
                  <td>{e.nameTest}</td>
                  <td>{e.description}</td>
                  <td></td>
                </tr>
              ))
            }
          </tbody>
        </table>
      </div>
      </div>
      </div>
    <AddTest show={show} handleClose={handleClose}/>
    </>
  );
}

export default Test