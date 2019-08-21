import React from 'react'
import './RegisterForm.css';
import { withFormik, Form, Field } from "formik";
import * as Yup from "yup";
import { Link } from "react-router-dom";
function RegisterForm({ errors, touched, isSubmitting, status }) {
    return (
        <div className="form-module">
            <h2>Sign Up</h2>
            <Form className="loginForm">
                {touched.username && errors.username && <p>{errors.username}</p>}
                <Field className="zr_un_email valid" type="username" name="username" placeholder="username" />

                {touched.email && errors.email && <p>{errors.email}</p>}
                <Field className="zr_un_email valid" type="email" name="email" placeholder="Email" />

                {touched.password && errors.password && <p>{errors.password}</p>}
                <Field type="password" name="password" placeholder="Password" />

                <button type="submit" disabled={isSubmitting}>Register</button>
                <p>Already Have An Account? <Link to="/">Sign In</Link></p>
            </Form>

            <div>

            </div>
        </div>

    );
}

const FormikLoginForm = withFormik({
    mapPropsToValues({ username, email, password }) {
        return {
            username: username || "",
            email: email || "",
            password: password || "",


        };
    },
    validationSchema: Yup.object().shape({
        username: Yup.string()
            .required(),
        email: Yup.string()
            .required(),
        password: Yup.string()
            .min(5, "Password must be 16 characters or longer")
            .required("Password is required")
    }),
    handleSubmit(values, { resetForm, setSubmitting, setStatus }) {
        console.log(values);
        // axios
        //     .post("http://localhost:5000/api/register", values)
        //     .then(res => {
        //         console.log(res);
        //         setStatus(res.data)
        //         resetForm();
        //         setSubmitting(false);
        //     })
        //     .catch(err => {
        //         console.log(err);
        //         setSubmitting(false);
        //     });

    }
})(RegisterForm);

export default FormikLoginForm;