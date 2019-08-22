import React from 'react'
import './LoginForm.css';
import { withFormik, Form, Field } from "formik";
import * as Yup from "yup";
import axios from "axios";

import { Link } from "react-router-dom";
function LoginForm({ errors, touched, isSubmitting, status }) {
    return (
        <div className="form-module">
            <h2>Sign In</h2>
            <Form className="loginForm">
                {touched.username && errors.username && <p>{errors.username}</p>}
                <Field className="zr_un_email valid" type="username" name="username" placeholder="username" />

                {touched.password && errors.password && <p>{errors.password}</p>}
                <Field type="password" name="password" placeholder="Password" />

                <button type="submit" disabled={isSubmitting}>Sign In</button>
                <p>Don't have an account? <Link to="../RegisterForm">Create Account</Link></p>
            </Form>

            <div>

            </div>
        </div>

    );
}


const FormikLoginForm = withFormik({
    mapPropsToValues({ username, password }) {
        return {
            username: username || "",
            password: password || "",


        };
    },
    validationSchema: Yup.object().shape({
        username: Yup.string()
            .required(),
        password: Yup.string()
            .min(5, "Password must be 16 characters or longer")
            .required("Password is required")
    }),
    handleSubmit(values, { resetForm, setSubmitting, setStatus }) {
        console.log(values);
        axios.post('http://localhost:5000/api/login', values)
            .then(res => {
                console.log("login Payload", res.data.payload)
                setStatus(res.data.payload)
                resetForm();
                setSubmitting(false);
                localStorage.setItem('token', res.data.payload);

            })
            .catch(err => console.log(err.response));

    }
})(LoginForm);

export default FormikLoginForm;