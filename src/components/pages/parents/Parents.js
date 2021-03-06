import React, { useEffect } from "react";
import { connect } from "react-redux";
import { fetchParents } from "../../../actions";
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

function Parents(props) {
  const { error, loading, parents } = props;

  useEffect(() => {
    props.dispatch(fetchParents());
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
            <CardTitle tag="h5">Parents</CardTitle>

            <Link to={`/studentadd/`}>
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
                    <th>PHONE</th>
                    <th>ADDRESS</th>
                    <th>SPOUSE</th>
                    <th>SPOUSE PHONE</th>
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

  const deleteParent = (id) => {
    axiosWithAuth()
      .delete(`https://alifcloud.herokuapp.com/api/parents/${id}`)
      .then((res) => {
        props.dispatch(fetchParents());

      })
      .catch((err) => {
        if (err.response.status === 500) {
          alert("Please delete student first")
        }
      console.log(err.response.status)})
  };

  return (
    <div className="content">
      <Row>
        <Col>
          <Card>
            <CardHeader>
              <CardTitle tag="h5">Parents</CardTitle>

              <Link to={`/parentadd/`}>
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
                    <th>PHONE</th>
                    <th>ADDRESS</th>
                    <th>SPOUSE</th>
                    <th>SPOUSE PHONE</th>
                    <th>edit</th>
                    <th>Delete</th>
                  </tr>
                </thead>
                <tbody>
                  {parents.map((parent) => {
                    return (
                      <tr>
                        <td key={parent.id}>{parent.id}</td>
                        <td key={parent.id}>{parent.name}</td>
                        <td key={parent.id}>{parent.phone}</td>
                        <td key={parent.id}>{parent.address}</td>
                        <td key={parent.id}>{parent.spouse_name}</td>
                        <td key={parent.id}>{parent.spouse_phone}</td>
                        <td key={parent.id}>
                          <Link to={`/parentedit/${parent.id}`}>
                            <Button color="success" active>
                              {" "}
                              Edit{" "}
                            </Button>
                          </Link>{" "}
                       
                        </td>
                        <td key={parent.id}>
                          
                          <Button color="danger" onClick={ () => {deleteParent(parent.id) }}>
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
  parents: state.ParentsReducer.parents,
  loading: state.ParentsReducer.loading,
  error: state.ParentsReducer.error,
  };
};

export default connect(mapStateToProps)(Parents);
