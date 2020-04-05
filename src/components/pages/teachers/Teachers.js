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


function Teachers({ id }) {
    const [teachers, setTeachers] = useState([])

    useEffect(() => {
        axiosWithAuth()
            .get('https://alifcloud.herokuapp.com/api/teachers/all')
            .then(res => {
                console.log("inside useeffect", res.data)
                setTeachers(res.data)

            })
            .catch(err => console.log(err.response));
    }, []);

    return (
       
        <div className="content">
          <Row>
            <Col>
              <Card>
                <CardHeader>
                  <CardTitle tag="h5">Teachers</CardTitle>

                  <Link to={`/AdminAccount/parentadd/`}><Button color="danger"><i className="nc-icon nc-simple-add" /> Add Teacher</Button></Link>
                </CardHeader>
                <CardBody>
                <Table responsive>
                    <thead className="text-primary">
                      <tr>
                        <th>ID#</th>
                        <th>NAME</th>
                        <th>EMAIL</th>
                        <th>Edit/Delete</th>
                      </tr>
                    </thead>
                    <tbody>
                    {teachers.map((teacher) => {

                    return <tr>
                        <td key={teacher.id}>{teacher.id}</td>
                        <td key={teacher.id}>{teacher.name}</td>
                        <td key={teacher.id}>{teacher.email}</td>
                        <td key={teacher.id}><Link to={`/AdminAccount/teacheredit/${teacher.id}`}><Button color="success" active> Edit </Button></Link> <Link to={`/AdminAccount/teacheredit/${teacher.id}`}><Button color="danger" active> Delete </Button></Link></td>
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

export default Teachers;




