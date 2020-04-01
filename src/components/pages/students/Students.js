import React, { useEffect, useState } from 'react';
import { axiosWithAuth } from '../../../utility/axiosWithAuth';
import { Link } from 'react-router-dom';
import {
    Card,
    CardHeader,
    CardBody,
    CardTitle,
    Table,
    Row,
    Button,
    Col
  } from "reactstrap";
  import "../../../assets/css/paper-dashboard.min.css";
  import "../../../assets/css/paper-dashboard.css";
  import "../../../assets/demo/demo.css";

function Students({ id }) {
    const [students, setStudents] = useState([])

    useEffect(() => {
        axiosWithAuth()
            .get('https://alifcloud.herokuapp.com/api/students/')
            .then(res => {
                console.log("inside useeffect", res.data)
                setStudents(res.data)

            })
            .catch(err => console.log(err.response));
    }, []);

    return (
        <>
        <div className="content">
          <Row>
            <Col md="12">
              <Card>
                <CardHeader>
                  <CardTitle tag="h4">Students</CardTitle>

                  <Button color="danger"><i className="nc-icon nc-simple-add" /> Add Student</Button>
                </CardHeader>
                <CardBody>
                <Table responsive>
                    <thead className="text-primary">
                      <tr>
                        <th>ID</th>
                        <th>Name</th>
                        <th>DOB</th>
                        <th>Class</th>
                        <th>Parent</th>
                        <th>Edit</th>
                      </tr>
                    </thead>
                    <tbody>
                    {students.map((student) => {

                    return <tr>
                        <td key={student.id}>{student.id}</td>
                        <td key={student.id}>{student.name}</td>
                        <td key={student.id}>{student.dob}</td>
                        <td key={student.id}>{student.class_id}</td>
                        <td key={student.id}>{student.parent_id}</td>
                        <td key={student.id}><Link to={`/studentedit/${student.id}`}> Edit </Link></td>
                      </tr>
                           })}
                    </tbody>
                  </Table>
                </CardBody>
              </Card>
            </Col>
          </Row>
        </div>
      </>
    );

}

export default Students;



