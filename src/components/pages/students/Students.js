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
       
        <div className="content">
          <Row>
            <Col>
              <Card>
                <CardHeader>
                  <CardTitle tag="h5">Students</CardTitle>

                  <Link to={`/AdminAccount/studentadd/`}><Button color="danger"><i className="nc-icon nc-simple-add" /> Add Student</Button></Link>
                </CardHeader>
                <CardBody>
                <Table responsive>
                    <thead className="text-primary">
                      <tr>
                        <th>ID#</th>
                        <th>Name</th>
                        <th>DOB</th>
                        <th>Class</th>
                        <th>Parent</th>
                        <th>Edit/Delete</th>
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
                        <td key={student.id}><Link to={`/AdminAccount/studentedit/${student.id}`}><Button color="success" active> Edit </Button></Link> <Link to={`/AdminAccount/studentedit/${student.id}`}><Button color="danger" active> Delete </Button></Link></td>
                      </tr>
                           })}
                    </tbody>
                  </Table>
                </CardBody>
              </Card>
            </Col>
          </Row>
        </div>
     
    );

}

export default Students;



