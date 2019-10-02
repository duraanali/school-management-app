import React, { useEffect, useState } from 'react';
import { axiosWithAuth } from '../../../utility/axiosWithAuth';


import '../include/forms.css';
import { withFormik, Form, Field, Select } from "formik";
import * as Yup from "yup";

function ClassesAdd({ values,
    errors,
    status,
    touched,
    handleBlur,
    handleChange,
    handleSubmit,
    isSubmitting, }) {

    const [teachers, setTeachers] = useState([])


    useEffect(() => {
        axiosWithAuth()
            .get('https://alifcloud.herokuapp.com/api/teachers/all')
            .then(res => {
                console.log('Inside axios', res.data)

                setTeachers(res.data)

            })
            .catch(err => console.log(err.response));
    }, []);


    return (

        <div>



            <Form className="addForm">
                <h3>Add Class</h3>
                {touched.name && errors.name && <p>{errors.name}</p>}
                <Field className="field-input" type="text" name="name" placeholder="name" />
                {touched.subject && errors.subject && <p>{errors.subject}</p>}
                <Field className="field-input" type="text" name="subject" placeholder="Subject" />

                {touched.teacher_id && errors.teacher_id && <p>{errors.teacher_id}</p>}
                <select
                    className="field-input"
                    name="teacher_id"
                    onChange={handleChange}
                    onBlur={handleBlur}
                >
                    <option value="">Select A Teacher</option>
                    {teachers.map((teacher) => {

                        return <option value={teacher.id}> {teacher.name}
                        </option>

                    })}
                </select>

                {touched.created && errors.created && <p>{errors.created}</p>}
                <Field className="field-input" type="date" name="created" placeholder="Date" />



                <button type="submit" disabled={isSubmitting}>Add Class</button>

            </Form>

        </div>
    );

}

const FormikClassesAdd = withFormik({
    mapPropsToValues({ name, subject, teacher_id, created }) {
        return {
            name: name || "",
            subject: subject || "",
            teacher_id: teacher_id || "",
            created: created || "",


        };
    },
    validationSchema: Yup.object().shape({
        name: Yup.string()
            .required("Oops, You forgot the name of the class"),
        subject: Yup.string()
            .required("Yes, You have to add subject!"),
        teacher_id: Yup.string()
            .required("Sorry, You have to choose a teacher!"),
        created: Yup.date(),

    }),
    handleSubmit(values, { resetForm, setSubmitting, setStatus, props }) {
        console.log(values)
        axiosWithAuth()
            .post("https://alifcloud.herokuapp.com/api/classes/", values)
            .then(res => {

                setStatus(res.data)
                resetForm();
                setSubmitting(false);
                props.history.push("/classes")
            })
            .catch(err => {

                setSubmitting(false);
            });

    }
})(ClassesAdd);

export default FormikClassesAdd;



