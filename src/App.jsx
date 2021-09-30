import React,{useEffect,useState} from 'react';
import './App.css';
import {PatientVisualizer} from 'fhir-visualizers';
import { useForm } from "react-hook-form";
import {Spinner, Container, Button, Form} from "react-bootstrap";

export default function App(props) {
  const client=props.client;
  const [patient, setPatient] = useState(null);
  useEffect(() => {
    client.patient.read().then((patient) => setPatient(patient));
  });

  let pat=patient?
  <PatientVisualizer patient={patient} />
  : <Spinner/>;

  const { register, handleSubmit, formState: { errors } } = useForm();
  const onSubmit = data => {
    let np=patient;
    np.name[0].given[0]=data.fname;
    np.name[0].family=data.lname;
    setPatient(np);
    client.update(np);
    
  };

  return (
    <div id="app">
      <Container>
        {pat}
      </Container>
      {patient?
      <Container>
        <h4>Update Patient Name</h4>
      <Form onSubmit={handleSubmit(onSubmit)}>
        <Form.Group className="mb-3" controlId="formFirst">
        <Form.Label>First</Form.Label>
        <Form.Control type="text" {...register("fname")} defaultValue={ patient.name[0].given.join(' ')} />
        </Form.Group>
        <Form.Group className="mb-3" controlId="formLast">
        <Form.Label>Last</Form.Label>
        <Form.Control type="text" {...register("lname")} defaultValue={ patient.name[0].family } />
        </Form.Group>
        <Button type="submit" >Update</Button>
      </Form>
      </Container>
      :""}
    </div>
  );
};
