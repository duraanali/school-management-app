import React from "react";
import { axiosWithAuth } from "../../../utility/axiosWithAuth";
import {
  Button,
  Card,
  CardHeader,
  CardBody,
  CardTitle,
  FormGroup,
  Input,
  Row,
  Col,
} from "reactstrap";

import { withFormik, Form } from "formik";
import * as Yup from "yup";

function SettingsEdit({
  values,
  errors,
  status,
  touched,
  handleBlur,
  handleChange,
  handleSubmit,
  isSubmitting,
}) {


  return (
    <>
      <div className="content">
        <Row>
          <Col md="12">
            <Card className="card-user">
              <CardHeader>
                <CardTitle tag="h5">Edit School</CardTitle>
              </CardHeader>
              <CardBody>
                <Form>
                  <Col className="pr-1" md="12">
                    <FormGroup>
                      {touched.school_name && errors.school_name && <p>{errors.school_name}</p>}
                      <Input
                        type="text"
                        name="school_name"
                        placeholder="school name"
                        onChange={handleChange}
                        onBlur={handleBlur}
                      />
                    </FormGroup>
                  </Col>

                  <Col className="pr-1" md="12">
                    <FormGroup>
                      {touched.address && errors.address && <p>{errors.address}</p>}
                      <Input
                        type="text"
                        name="address"
                        placeholder="address"
                        onChange={handleChange}
                        onBlur={handleBlur}
                      />
                    </FormGroup>
                  </Col>
                 
                  <Row>
                    <div className="update ml-auto mr-auto">
                      <Button
                        className="btn-round"
                        color="primary"
                        type="submit"
                        disabled={isSubmitting}
                      >
                        Edit Parent
                      </Button>
                    </div>
                  </Row>
                </Form>
              </CardBody>
            </Card>
          </Col>
        </Row>
      </div>
    </>
  );
}

const FormikSettingsEdit = withFormik({
  mapPropsToValues({ school_name, address }) {
    return {
      school_name: school_name || "",
      address: address || "",


    };
  },
  validationSchema: Yup.object().shape({
    school_name: Yup.string().max(15, 'Must be less than 10 characters!').required(),
    address: Yup.string()

   
  }),
  handleSubmit(values, { resetForm, setSubmitting, setStatus, props }) {
    
    var id = props.match.params.id
    console.log("top ID", id);
    axiosWithAuth()
      .put(`https://alifcloud.herokuapp.com/api/settings/${id}`, values)
      .then((res) => {
        console.log("res.data", res.data);
        setStatus(res.data);
        resetForm();
        setSubmitting(false);
        props.history.push("/AdminAccount/settings");
      })
      .catch((err) => {
        setSubmitting(false);
      });
  },
})(SettingsEdit);

export default FormikSettingsEdit;
