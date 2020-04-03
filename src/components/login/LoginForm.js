import React from 'react'
import './LoginForm.css';
import { withFormik, Form, Field } from "formik";
import * as Yup from "yup";
import { axiosWithAuth } from "../../utility/axiosWithAuth"

import { Link } from "react-router-dom";
function LoginForm({ errors, touched, status, props }) {
    return (
        <div className="form">
            <div className="form-module">
                <h2>Sign In</h2>
                <Form className="loginForm">
                    {touched.email && errors.email && <p>{errors.email}</p>}
                    <Field className="zr_un_username valid" type="email" name="email" placeholder="email" />

                    {touched.password && errors.password && <p>{errors.password}</p>}
                    <Field type="password" name="password" placeholder="Password" />

                    <button type="submit" >Sign In</button>
                    <p><b>Demo Login Info:</b></p>
                    <h5>Email: admin@mail.com  - password: password</h5>
                 
                    <p>Don't have an account? <Link to="../RegisterForm">Create Account</Link></p>
                </Form>

                <div>

                </div>
            </div>
        </div>
    );
}


const FormikLoginForm = withFormik({
    mapPropsToValues({ email, password }) {
        return {
            email: email || "",
            password: password || "",


        };
    },
    validationSchema: Yup.object().shape({
        email: Yup.string()
            .required(),
        password: Yup.string()
            .min(5, "Password must be 16 characters or longer")
            .required("Password is required")
    }),

    handleSubmit(values, { resetForm, setStatus, props }) {

        axiosWithAuth()
            .post('https://alifcloud.herokuapp.com/api/admins/login', values)
            .then(res => {

                setStatus(res.data.payload)
                resetForm();

                localStorage.setItem('token', res.data.token);
                props.history.push('/AdminAccount/dashboard');

            })
            .catch(err => console.log(err.response));

    }

})(LoginForm);

export default FormikLoginForm;