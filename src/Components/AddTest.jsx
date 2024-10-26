import axios from 'axios';
import React, { useState, useEffect } from 'react';
import Button from 'react-bootstrap/Button';
import FormSelect from 'react-bootstrap/esm/FormSelect';
import Form from 'react-bootstrap/Form';
import Modal from 'react-bootstrap/Modal';
import { useParams } from 'react-router-dom';

const AddTest = ({show, handleClose}) => {
  const {idProject} = useParams()
  const[test, setTest] = useState({
    nameTest: '',
    description: '',
    idProject: idProject,
    idEmployee: '',
  })
  const [employee, setEmployee] = useState([]);

  useEffect(() => {
    axios
      .get("http://localhost:3000/auth/employee")
      .then((result) => {
          if(result.data.Status){
            setEmployee(result.data.Result);
          } else {
            alert(result.data.Error);
          }
      }).catch(err => console.log(err));
  }, []);

  const handleSubmit = (e) => {
    e.preventDefault()
    axios.post('http://localhost:3000/auth/add_test', test)
    .then(result => {
        if(result.data.Status) {
            handleClose();
        } else {
            alert(result.data.Error)
        }
    })
    .catch(err => console.log(err))
}
  return (
    <>
      <Modal show={show} onHide={handleClose}>
        <Modal.Header closeButton>
          <Modal.Title>Create a test plan</Modal.Title>
        </Modal.Header>
        <Modal.Body>
          <Form>
            <Form.Group className="mb-3" controlId="exampleForm.ControlInput1">
              <Form.Label>Name of the Test Plan</Form.Label>
              <Form.Control
                type="text"
                placeholder="Input de Name of the test plan"
                autoFocus
                onChange={(e) => setTest({...test, nameTest: e.target.value})}
              />
            </Form.Group>
            <Form.Group
              className="mb-3"
              controlId="exampleForm.ControlTextarea1"
            >
              <Form.Label>Description</Form.Label>
              <Form.Control as="textarea" rows={3} 
              onChange={(e) => setTest({...test, description: e.target.value})}/>
            </Form.Group>
            <Form.Group>
              <Form.Label>Asign to: </Form.Label>
              <option value="">Select an Employee</option>
              <FormSelect
              onChange={(e) => setTest({...test, idEmployee: e.target.value})}>
                {employee.map(s => {
                  return <option value={s.idEmployee}>{s.name}</option>
                })}
              </FormSelect>
            </Form.Group>
          </Form>
        </Modal.Body>
        <Modal.Footer>
          <Button variant="secondary" onClick={handleClose}>
            Close
          </Button>
          <Button variant="primary" onClick={handleSubmit}>
            Save Changes
          </Button>
        </Modal.Footer>
      </Modal>
    </>
  )
}

export default AddTest