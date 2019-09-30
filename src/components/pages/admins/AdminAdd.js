import React, { useEffect, useState } from 'react';
import { axiosWithAuth } from '../../../utility/axiosWithAuth';


import '../include/forms.css';
import { withFormik, Form, Field, Select } from "formik";
import * as Yup from "yup";

function AdminAdd({ values,
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
                <h3>Add Admin</h3>
                {touched.name && errors.name && <p>{errors.name}</p>}
                <Field className="field-input" type="text" name="name" placeholder="name" />

                {touched.email && errors.email && <p>{errors.email}</p>}
                <Field className="field-input" type="email" name="email" placeholder="email" />

                {touched.password && errors.password && <p>{errors.password}</p>}
                <Field className="field-input" type="password" name="password" placeholder="password" />

                <button type="submit" disabled={isSubmitting}>Add Admin</button>

            </Form>

        </div>
    );

}

const FormikAdminAdd = withFormik({
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
            .post("https://alifcloud.herokuapp.com/api/admins/register", values)
            .then(res => {

                setStatus(res.data)
                resetForm();
                setSubmitting(false);
                props.history.push("/admins")
            })
            .catch(err => {

                setSubmitting(false);
            });

    }
})(AdminAdd);

export default FormikAdminAdd;



