import React, { useEffect } from "react";
import { connect } from "react-redux";
import { fetchStudents } from "../../../actions";
import { axiosWithAuth } from "../../../utility/axiosWithAuth";
import { Link } from "react-router-dom";
import {
  Card,
  CardHeader,
  CardBody,
  CardTitle,
  Table,
  Row,
  Button,
  Col,
  Spinner
} from "reactstrap";

function Students(props) {
  const { error, loading, students } = props;

  
  useEffect(() => {
    props.dispatch(fetchStudents());
    
  }, []);

  if (error) {
    return <div>Error! {error.message}</div>;
  }

  if (loading) {
    return  <div className="content">
    <Row>
      <Col>
        <Card>
          <CardHeader>
            <CardTitle tag="h5">Students</CardTitle>

            <Link to={`/studentadd/`}>
              <Button color="danger">
                <i className="nc-icon nc-simple-add" /> Add Student
              </Button>
            </Link>
          </CardHeader>
          <CardBody>
            <Table responsive>
              <thead className="text-primary">
                <tr>
                  <th>ID#</th>
                  <th>NAME</th>
                  <th>DOB</th>
                  <th>CLASS</th>
                  <th>PARENT</th>
                  <th>Edit/Delete</th>
                </tr>
              </thead>
              <tbody>
              <tr><Spinner color="dark" /></tr>
              </tbody>
              </Table>
            </CardBody>
          </Card>
        </Col>
      </Row>
    </div>
                ;
  }

  const deleteStudent = (id) => {
    axiosWithAuth()
      .delete(`https://alifcloud.herokuapp.com/api/students/${id}`)
      .then((res) => {
        props.dispatch(fetchStudents());

      });
  };

  const getParentName = (id) => {
    axiosWithAuth()
      .get(`https://alifcloud.herokuapp.com/api/parents/${id}`)
      .then((res) => {
        console.log(res.data)

      });
  };


  return (
    <div className="content">
      <Row>
        <Col>
          <Card>
            <CardHeader>
              <CardTitle tag="h5">Students</CardTitle>

              <Link to={`/studentadd/`}>
                <Button color="danger">
                  <i className="nc-icon nc-simple-add" /> Add Student
                </Button>
              </Link>
            </CardHeader>
            <CardBody>
              <Table responsive>
                <thead className="text-primary">
                  <tr>
                    <th>ID#</th>
                    <th>NAME</th>
                    <th>DOB</th>
                    <th>CLASS</th>
                    <th>PARENT</th>
                    <th>edit</th>
                    <th>Delete</th>
                  </tr>
                </thead>
                <tbody>
                  {students.map((student) => {
                    return (
                      <tr>
                        <td key={student.id}>{student.id}</td>
                        <td key={student.id}>{student.name}</td>
                        <td key={student.id}>{student.dob}</td>
                        <td key={student.class_id}>{student.class_id}</td>
                        <td key={student.parent_id}>{student.parent_id}</td>
                        <td key={student.id}>
                          <Link to={`/studentedit/${student.id}`}>
                            <Button color="success" active>
                              {" "}
                              Edit{" "}
                            </Button>
                          </Link>{" "}
                       
                        </td>
                        <td key={student.id}>
                          
                          <Button color="danger" onClick={ () => {deleteStudent(student.id) }}>
                            {" "}
                            Delete{" "}
                          </Button>
                        </td>
                      </tr>
                    );
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


const mapStateToProps = state => {
  return {
  students: state.StudentsReducer.students,
  loading: state.StudentsReducer.loading,
  error: state.StudentsReducer.error,
  };
};

export default connect(mapStateToProps)(Students);
