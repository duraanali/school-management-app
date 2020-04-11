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

function ParentEdit({
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
                <CardTitle tag="h5">Edit Parent</CardTitle>
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
                        placeholder="Phone"
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
                  <Col className="pr-1" md="12">
                    <FormGroup>
                      {touched.spouse_name && errors.spouse_name && <p>{errors.spouse_name}</p>}
                      <Input
                        type="text"
                        name="spouse_name"
                        placeholder="spouse name"
                        onChange={handleChange}
                        onBlur={handleBlur}
                      />
                    </FormGroup>
                  </Col>
                  <Col className="pr-1" md="12">
                    <FormGroup>
                      {touched.spouse_phone && errors.spouse_phone && <p>{errors.spouse_phone}</p>}
                      <Input
                        type="number"
                        name="spouse_phone"
                        placeholder="spouse phone"
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

const FormikParentEdit = withFormik({
  mapPropsToValues({ name, phone, address, spouse_name, spouse_phone }) {
    return {
      name: name || "",
      phone: phone || "",
      address: address || "",
      spouse_name: spouse_name || "",
      spouse_phone: spouse_phone || "",

    };
  },
  validationSchema: Yup.object().shape({
    name: Yup.string().required(),
    phone: Yup.number().required(),
    address: Yup.string().required(),
    spouse_name: Yup.string().required(),
    spouse_phone: Yup.number().required(),
   
  }),
  handleSubmit(values, { resetForm, setSubmitting, setStatus, props }) {

    var id = props.match.params.id
    console.log("PARENT ID", props);
    axiosWithAuth()
      .put(`https://alifcloud.herokuapp.com/api/parents/${id}`, values)
      .then((res) => {
        setStatus(res.data);
        resetForm();
        setSubmitting(false);
        props.history.push("/AdminAccount/parents");
      })
      .catch((err) => {
        setSubmitting(false);
      });
  },
})(ParentEdit);

export default FormikParentEdit;
