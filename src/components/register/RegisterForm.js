import React from 'react'
import './RegisterForm.css';
import { withFormik, Form, Field } from "formik";
import * as Yup from "yup";
import { Link } from "react-router-dom";
import { axiosWithAuth } from "../../utility/axiosWithAuth"
function RegisterForm({ errors, touched, isSubmitting, status }) {
    return (
        <div className="form">
            <div className="form-module">
                <h2>Sign Up</h2>
                <Form className="loginForm">

                    {touched.name && errors.name && <p>{errors.name}</p>}
                    <Field className="zr_un_email valid" type="text" name="name" placeholder="name" />

                    {touched.email && errors.email && <p>{errors.email}</p>}
                    <Field className="zr_un_email valid" type="email" name="email" placeholder="Email" />

                    {touched.password && errors.password && <p>{errors.password}</p>}
                    <Field type="password" name="password" placeholder="Password" />

                    <button type="submit" disabled={isSubmitting}>Register</button>
                    <p>Already Have An Account? <Link to="/login">Sign In</Link></p>
                </Form>

                <div>

                </div>
            </div>
        </div>
    );
}

const FormikLoginForm = withFormik({
    mapPropsToValues({ name, email, password }) {
        return {
            name: name || "",
            email: email || "",
            password: password || "",


        };
    },
    validationSchema: Yup.object().shape({
        name: Yup.string()
            .required(),
        email: Yup.string()
            .required(),
        password: Yup.string()
            .min(5, "Password must be 16 characters or longer")
            .required("Password is required")
    }),
    handleSubmit(values, { resetForm, setSubmitting, setStatus, props }) {

        axiosWithAuth()
            .post("https://alifcloud.herokuapp.com/api/admins/register", values)
            .then(res => {

                setStatus(res.data)
                resetForm();
                setSubmitting(false);
                props.history.push('/');
            })
            .catch(err => {

                setSubmitting(false);
            });

    }
})(RegisterForm);

export default FormikLoginForm;