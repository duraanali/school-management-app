import React, { useEffect, useState } from 'react';
import { axiosWithAuth } from '../../../utility/axiosWithAuth';


import '../include/forms.css';
import { withFormik, Form, Field, Select } from "formik";
import * as Yup from "yup";

function ParentAdd({ values,
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
                <h3>Add Parent</h3>
                {touched.name && errors.name && <p>{errors.name}</p>}
                <Field className="field-input" type="text" name="name" placeholder="name" />

                {touched.phone && errors.phone && <p>{errors.phone}</p>}
                <Field className="field-input" type="text" name="phone" placeholder="Phone" />

                {touched.address && errors.address && <p>{errors.address}</p>}
                <Field className="field-input" type="text" name="address" placeholder="Address" />

                {touched.spouse_name && errors.spouse_name && <p>{errors.spouse_name}</p>}
                <Field className="field-input" type="text" name="spouse_name" placeholder="Spouse Name" />

                {touched.spouse_phone && errors.spouse_phone && <p>{errors.spouse_phone}</p>}
                <Field className="field-input" type="text" name="spouse_phone" placeholder="Spouse Phone" />


                <button type="submit" disabled={isSubmitting}>Add Parent</button>

            </Form>

        </div>
    );

}

const FormikParentAdd = withFormik({
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
        name: Yup.string()
            .required(),
        phone: Yup.string().required("You forgot the phone number!"),

    }),
    handleSubmit(values, { resetForm, setSubmitting, setStatus, props }) {
        console.log(values)
        axiosWithAuth()
            .post("https://alifcloud.herokuapp.com/api/parents/", values)
            .then(res => {

                setStatus(res.data)
                resetForm();
                setSubmitting(false);
                props.history.push("/parents")
            })
            .catch(err => {

                setSubmitting(false);
            });

    }
})(ParentAdd);

export default FormikParentAdd;



