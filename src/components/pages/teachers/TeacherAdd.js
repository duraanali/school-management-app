import React, { useEffect, useState } from 'react';
import { axiosWithAuth } from '../../../utility/axiosWithAuth';


import '../include/forms.css';
import { withFormik, Form, Field, Select } from "formik";
import * as Yup from "yup";

function TeacherAdd({ values,
    errors,
    status,
    touched,
    handleBlur,
    handleChange,
    handleSubmit,
    isSubmitting, }) {


    return (

        <div>



            <Form className="addForm">
                <h3>Add Teacher</h3>
                {touched.name && errors.name && <p>{errors.name}</p>}
                <Field className="field-input" type="text" name="name" placeholder="name" />

                {touched.email && errors.email && <p>{errors.email}</p>}
                <Field className="field-input" type="text" name="email" placeholder="email" />

                {touched.password && errors.password && <p>{errors.password}</p>}
                <Field className="field-input" type="password" name="password" placeholder="password" />

                <button type="submit" disabled={isSubmitting}>Add Teacher</button>

            </Form>

        </div>
    );

}

const FormikTeacherAdd = withFormik({
    mapPropsToValues({ name, email, password }) {
        return {
            name: name || "",
            email: email || "",
            password: password || ""



        };
    },
    validationSchema: Yup.object().shape({
        name: Yup.string()
            .required("Yes, We need the name!"),
        email: Yup.string().email("That doesn't look like an email!")
            .required("Gotta add email"),
        password: Yup.string()
            .required("Oops, You forgot the password!"),
    }),
    handleSubmit(values, { resetForm, setSubmitting, setStatus, props }) {
        console.log(values)
        axiosWithAuth()
            .post("https://alifcloud.herokuapp.com/api/teachers/register", values)
            .then(res => {

                setStatus(res.data)
                resetForm();
                setSubmitting(false);
                props.history.push("/teachers")
            })
            .catch(err => {

                setSubmitting(false);
            });

    }
})(TeacherAdd);

export default FormikTeacherAdd;



