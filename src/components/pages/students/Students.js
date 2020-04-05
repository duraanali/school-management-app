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
    return <div>Loading...</div>;
  }

  const deleteStudent = (event) => {
    var id;
    students.map((student) => {
      id = student.id;
      return id;
    });
    event.preventDefault();
    axiosWithAuth()
      .delete(`https://alifcloud.herokuapp.com/api/students/${id}`)
      .then((res) => {
        props.dispatch(fetchStudents());
      });
  };
  console.log(props)
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
                    <th>Edit/Delete</th>
                  </tr>
                </thead>
                <tbody>
                  {students.map((student) => {
                    return (
                      <tr>
                        <td key={student.id}>{student.id}</td>
                        <td key={student.id}>{student.name}</td>
                        <td key={student.id}>{student.dob}</td>
                        <td key={student.id}>{student.class_id}</td>
                        <td key={student.id}>{student.parent_id}</td>
                        <td key={student.id}>
                          <Link to={`/studentedit/${student.id}`}>
                            <Button color="success" active>
                              {" "}
                              Edit{" "}
                            </Button>
                          </Link>{" "}
                          <Button color="danger" active onClick={deleteStudent}>
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
