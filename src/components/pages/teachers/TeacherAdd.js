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

function TeacherAdd({
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
                <CardTitle tag="h5">Add Teacher</CardTitle>
              </CardHeader>
              <CardBody>
                <Form>
                <Col className="pr-1" md="12">
                    <FormGroup>
                      {touched.name && errors.name && <p>{errors.name}</p>}
                      <Input
                        type="text"
                        name="name"
                        placeholder="name"
                        onChange={handleChange}
                        onBlur={handleBlur}
                      />
                    </FormGroup>
                  </Col>
                  <Col className="pr-1" md="12">
                    <FormGroup>
                      {touched.phone && errors.phone && <p>{errors.phone}</p>}
                      <Input
                        type="number"
                        name="phone"
                        placeholder="phone"
                        onChange={handleChange}
                        onBlur={handleBlur}
                      />
                    </FormGroup>
                  </Col>
                  <Col className="pr-1" md="12">
                    <FormGroup>
                      {touched.email && errors.email && <p>{errors.email}</p>}
                      <Input
                        type="email"
                        name="email"
                        placeholder="email"
                        onChange={handleChange}
                        onBlur={handleBlur}
                      />
                    </FormGroup>
                  </Col>
                  <Col className="pr-1" md="12">
                    <FormGroup>
                      {touched.password && errors.password && <p>{errors.password}</p>}
                      <Input
                        type="password"
                        name="password"
                        placeholder="password"
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
                        Add Teacher
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

const FormikTeacherAdd = withFormik({
  mapPropsToValues({ name, phone, email, password  }) {
    return {
      name: name || "",
      phone: phone || "",
      email: email || "",
      password: password || ""

    };
  },
  validationSchema: Yup.object().shape({
    name: Yup.string().required(),
    phone: Yup.number(),
    email: Yup.string().required(),
    password: Yup.string()
            .min(5, "Password must be 16 characters or longer")
            .required("Password is required")
   
  }),
  handleSubmit(values, { resetForm, setSubmitting, setStatus, props }) {
    console.log(values);
    axiosWithAuth()
      .post("https://alifcloud.herokuapp.com/api/teachers/register", values)
      .then((res) => {
        setStatus(res.data);
        resetForm();
        setSubmitting(false);
        props.history.push("/AdminAccount/teachers");
      })
      .catch((err) => {
        setSubmitting(false);
      });
  },
})(TeacherAdd);

export default FormikTeacherAdd;
