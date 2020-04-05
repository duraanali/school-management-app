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


function Classes({ id }) {
    const [classes, setClasses] = useState([])

    useEffect(() => {
        axiosWithAuth()
            .get('https://alifcloud.herokuapp.com/api/classes/')
            .then(res => {
                console.log("inside useeffect", res.data)
                setClasses(res.data)

            })
            .catch(err => console.log(err.response));
    }, []);

    return (
       
        <div className="content">
          <Row>
            <Col>
              <Card>
                <CardHeader>
                  <CardTitle tag="h5">Classes</CardTitle>

                  <Link to={`/AdminAccount/parentadd/`}><Button color="danger"><i className="nc-icon nc-simple-add" /> Add Class</Button></Link>
                </CardHeader>
                <CardBody>
                <Table responsive>
                    <thead className="text-primary">
                      <tr>
                        <th>ID#</th>
                        <th>NAME</th>
                        <th>SUBJECT</th>
                        <th>TEACHER</th>
                        <th>CREATED</th>
                        <th>Edit/Delete</th>
                      </tr>
                    </thead>
                    <tbody>
                    {classes.map((class1) => {

                    return <tr>
                        <td key={class1.id}>{class1.id}</td>
                        <td key={class1.id}>{class1.name}</td>
                        <td key={class1.id}>{class1.subject}</td>
                        <td key={class1.id}>{class1.teacher_id}</td>
                        <td key={class1.id}>{class1.created}</td>
                        <td key={class1.id}><Link to={`/AdminAccount/class1edit/${class1.id}`}><Button color="success" active> Edit </Button></Link> <Link to={`/AdminAccount/class1edit/${class1.id}`}><Button color="danger" active> Delete </Button></Link></td>
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

export default Classes;




