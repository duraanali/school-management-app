import React, { useEffect } from "react";
import { connect } from "react-redux";
import { fetchSettings } from "../../../actions";
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

function Settings(props) {
  const { error, loading, settings } = props;

 
  useEffect(() => {
    props.dispatch(fetchSettings());
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
            <CardTitle tag="h5">Settings</CardTitle>

            {/* <Link to={`/studentadd/`}>
              <Button color="danger">
                <i className="nc-icon nc-simple-add" /> Add Parent
              </Button>
            </Link> */}
          </CardHeader>
          <CardBody>
            <Table responsive>
              <thead className="text-primary">
                <tr>
                <th>ID#</th>
                    <th>NAME</th>
                    <th>ADDRESS</th>
                    <th>EDIT</th>
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

  return (
    <div className="content">
      <Row>
        <Col>
          <Card>
            <CardHeader>
              <CardTitle tag="h5">Settings</CardTitle>

              {/* <Link to={`/parentadd/`}>
                <Button color="danger">
                  <i className="nc-icon nc-simple-add" /> Add Parent
                </Button>
              </Link> */}
            </CardHeader>
            <CardBody>
              <Table responsive>
                <thead className="text-primary">
                  <tr>
                    <th>ID#</th>
                    <th>SCHOOL NAME</th>
                    <th>ADDRESS</th>
        
                    <th>EDIT</th>
          
                  </tr>
                </thead>
                <tbody>
                  {settings.map((setting) => {
                    return (
                      <tr>
                        <td key={setting.id}>{setting.id}</td>
                        <td key={setting.id}>{setting.school_name}</td>
                        <td key={setting.id}>{setting.address}</td>
            
                        <td key={setting.id}>
                          <Link to={`/settingsedit/${setting.id}`}>
                            <Button color="success" active>
                              {" "}
                              Edit{" "}
                            </Button>
                          </Link>{" "}
                       
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
  settings: state.SettingsReducer.settings,
  loading: state.SettingsReducer.loading,
  error: state.SettingsReducer.error,
  };
};

export default connect(mapStateToProps)(Settings);
