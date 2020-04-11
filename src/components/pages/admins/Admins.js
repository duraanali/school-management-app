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


function Admins({ id }) {
    const [admins, setAdmins] = useState([])

    useEffect(() => {
        axiosWithAuth()
            .get('https://alifcloud.herokuapp.com/api/admins/all')
            .then(res => {
          
                setAdmins(res.data)

            })
            .catch(err => console.log(err.response));
    }, []);

    return (
       
        <div className="content">
          <Row>
            <Col>
              <Card>
                <CardHeader>
                  <CardTitle tag="h5">Admins</CardTitle>

                  {/* <Link to={`/AdminAccount/parentadd/`}><Button color="danger"><i className="nc-icon nc-simple-add" /> Add Admin</Button></Link> */}
                </CardHeader>
                <CardBody>
                <Table responsive>
                    <thead className="text-primary">
                      <tr>
                        <th>ID#</th>
                        <th>NAME</th>
                        <th>EMAIL</th>
                      
                      </tr>
                    </thead>
                    <tbody>
                    {admins.map((admin) => {

                    return <tr>
                        <td key={admin.id}>{admin.id}</td>
                        <td key={admin.id}>{admin.name}</td>
                        <td key={admin.id}>{admin.email}</td>
                        {/* <td key={admin.id}><Link to={`/AdminAccount/adminedit/${admin.id}`}><Button color="success" active> Edit </Button></Link> <Link to={`/AdminAccount/adminedit/${admin.id}`}><Button color="danger" active> Delete </Button></Link></td> */}
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

export default Admins;




