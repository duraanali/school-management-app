import React, { useEffect } from "react";
import { connect } from "react-redux";
import { fetchTeachers } from "../../../actions";
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

function Teachers(props) {
  const { error, loading, teachers } = props;

  useEffect(() => {
    props.dispatch(fetchTeachers());
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
            <CardTitle tag="h5">Teachers</CardTitle>

            <Link to={`/teacheradd/`}>
              <Button color="danger">
                <i className="nc-icon nc-simple-add" /> Add Teacher
              </Button>
            </Link>
          </CardHeader>
          <CardBody>
            <Table responsive>
              <thead className="text-primary">
                <tr>
                <th>ID#</th>
                    <th>NAME</th>
                    <th>EMAIL</th>
                    <th>PHONE</th>
                    <th>EDIT</th>
                    <th>DELETE</th>
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

  const deleteTeacher = (id) => {
    axiosWithAuth()
      .delete(`https://alifcloud.herokuapp.com/api/teachers/all/${id}`)
      .then((res) => {
        props.dispatch(fetchTeachers());

      })
      .catch((err) => {
        if (err.response.status === 500) {
          alert("Please delete class(s) first")
        }
      console.log(err.response.status)})
  };

  return (
    <div className="content">
      <Row>
        <Col>
          <Card>
            <CardHeader>
              <CardTitle tag="h5">Teachers</CardTitle>

              <Link to={`/teacheradd/`}>
                <Button color="danger">
                  <i className="nc-icon nc-simple-add" /> Add Parent
                </Button>
              </Link>
            </CardHeader>
            <CardBody>
              <Table responsive>
                <thead className="text-primary">
                  <tr>
                    <th>ID#</th>
                    <th>NAME</th>
                    <th>EMAIL</th>
                    <th>PHONE</th>
                    <th>EDIT</th>
                    <th>DELETE</th>
                  </tr>
                </thead>
                <tbody>
                  {teachers.map((teacher) => {
                    return (
                      <tr>
                        <td key={teacher.id}>{teacher.id}</td>
                        <td key={teacher.id}>{teacher.name}</td>
                        <td key={teacher.id}>{teacher.email}</td>
                        <td key={teacher.id}>{teacher.phone}</td>
                       
                        <td key={teacher.id}>
                          <Link to={`/teacheredit/${teacher.id}`}>
                            <Button color="success" active>
                              {" "}
                              Edit{" "}
                            </Button>
                          </Link>{" "}
                       
                        </td>
                        <td key={teacher.id}>
                          
                          <Button color="danger" onClick={ () => {deleteTeacher(teacher.id) }}>
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
  teachers: state.TeachersReducer.teachers,
  loading: state.TeachersReducer.loading,
  error: state.TeachersReducer.error,
  };
};

export default connect(mapStateToProps)(Teachers);
