import React, { useEffect, useState } from 'react';
import { axiosWithAuth } from '../../../utility/axiosWithAuth';


import { withFormik, Form, Field } from "formik";
import * as Yup from "yup";
// reactstrap components
import {
    Button,
    Card,
    CardHeader,
    CardBody,
    CardFooter,
    CardTitle,
    FormGroup,
    Input,
    Row,
    Col
  } from "reactstrap";

const FormikStudentEdit = withFormik({
    mapPropsToValues({ name, dob, class_id, parent_id }) {
        return {

            name: name || "",
            dob: dob || "",
            class_id: class_id || "",
            parent_id: parent_id || ""

        };
    },
    validationSchema: Yup.object().shape({
        name: Yup.string()
            .required(),
        dob: Yup.date(),
        class_id: Yup.number('please enter a number')
            .required('Make Sure to Choose a Class'),
        parent_id: Yup.number('Please enter a number')
            .required('Make Sure to Choose a Parent')
    }),
    handleSubmit(values, { resetForm, setSubmitting, setStatus, props }) {

        console.log("the id", props)
        axiosWithAuth()
            .put(`https://alifcloud.herokuapp.com/api/students/${props.match.params.id}`, values)
            .then(res => {
                console.log("inside put api", res.data)
                console.log("values", values)
                setStatus(res.data)
                resetForm();
                setSubmitting(false);
                props.history.push("/AdminAccount/students")
            })
            .catch(err => {

                setSubmitting(false);
            });

    }
})(StudentEdit);


function StudentEdit({ values,
    errors,
    status,
    touched,
    handleBlur,
    handleChange,
    handleSubmit,
    isSubmitting }) {

    const [parents, setParents] = useState([])
    const [classes, setClasses] = useState([])


    useEffect(() => {
        axiosWithAuth()
            .get('https://alifcloud.herokuapp.com/api/parents/')
            .then(res => {
            

                setParents(res.data)

            })
            .catch(err => console.log(err.response));
    }, []);

    useEffect(() => {
        axiosWithAuth()
            .get('https://alifcloud.herokuapp.com/api/classes/')
            .then(res => {
               

                setClasses(res.data)

            })
            .catch(err => console.log(err.response));
    }, []);


    return (
        <>
        <div className="content">
            <Row>
            <Col md="12">
              <Card className="card-user">
                <CardHeader>
                  <CardTitle tag="h5">Edit Student</CardTitle>
                </CardHeader>
                <CardBody>
            <Form>
                
                {touched.name && errors.name && <p>{errors.name}</p>}

                <Input value={values.name} type="text" name="name" tag={Field} placeholder="name" />
               
                {touched.dob && errors.dob && <p>{errors.dob}</p>}
                <Input type="date" name="dob"  tag={Field} placeholder="Date of Birth" />

                {touched.parent_id && errors.parent_id && <p>{errors.parent_id}</p>}
                <Input type="select"
                    name="parent_id"
                    onChange={handleChange}
                    onBlur={handleBlur}
                >

                    <option value="">Select A Parent</option>
                    {parents.map((parent) => {

                        return <option value={parent.id}> {parent.name}
                        </option>

                    })}
                </Input>
                {touched.class_id && errors.class_id && <p>{errors.class_id}</p>}
                <Input type="select"
                    name="class_id"
                    onChange={handleChange}
                    onBlur={handleBlur}
                >
                    <option value="">Select A Class</option>
                    {classes.map((class1) => {

                        return <option value={class1.id}> {class1.name}
                        </option>

                    })}
                </Input>


                <Row>
                      <div className="update ml-auto mr-auto">
                        <Button
                          className="btn-round"
                          color="primary"
                          type="submit"
                          disabled={isSubmitting}
                        >
                          Update Student
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


export default FormikStudentEdit;



