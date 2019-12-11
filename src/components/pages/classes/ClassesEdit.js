import React, { useEffect, useState } from 'react';
import { axiosWithAuth } from '../../../utility/axiosWithAuth';


import '../include/forms.css';
import { withFormik, Form, Field} from "formik";
import * as Yup from "yup";



function ClassesEdit( { values,
    setValues,
    errors,
    status, 
    touched,
    handleBlur,
    handleChange,
    handleSubmit,
    isSubmitting, }) {

    const [teachers, setTeachers] = useState([]);
    const id = values.id || values.match.params.id;
    useEffect(() => {
        axiosWithAuth()
            .get('https://alifcloud.herokuapp.com/api/teachers/all')
            .then(res => {
                console.log('Inside axios', res.data)

                setTeachers(res.data)

            })
            .catch(err => console.log(err.response));

        axiosWithAuth()
        .get(`https://alifcloud.herokuapp.com/api/classes/${id}`)
        .then(res => {
            console.log('Inside Classes axios', ...res.data)
            setValues(...res.data)
        })
        .catch(err => console.log(err.response));
    }, []);
    

    return (

        <div>
            
            <Form className="addForm">
                <h3>Add Class</h3>
                {touched.name && errors.name && <p>{errors.name}</p>}
                <Field className="field-input" type="text" name="name" value={values.name} placeholder="name"  />
                {touched.subject && errors.subject && <p>{errors.subject}</p>}
                <Field className="field-input" type="text" value={values.subject} onChange={handleChange} name="subject" placeholder="Subject" />

                {touched.teacher_id && errors.teacher_id && <p>{errors.teacher_id}</p>}
                <select
                    className="field-input"
                    name="teacher_id"
                    onChange={handleChange}
                    onBlur={handleBlur}
                >
                    <option value={values.teacher_id}>Select A Teacher</option>
                    {teachers.map((teacher) =>  <option selected={teacher.id === values.teacher_id ? 'selected' : '' } value={teacher.id}> {teacher.name}</option>)}
                </select>

                {touched.created && errors.created && <p>{errors.created}</p>}
                <Field className="field-input" value={values.created} type="date" name="created"  />



                <button type="submit" disabled={isSubmitting}>Edit Class</button>

            </Form>

        </div>
    );

}

const FormikClassesEdit = withFormik({
    mapPropsToValues({ id, name, subject, teacher_id, created, match }) {
        
        return {
            id : id || "",
            name: name || "",
            subject: subject || "",
            teacher_id: teacher_id || "",
            created: created || "",
            match: match
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

        axiosWithAuth()
            .put(`https://alifcloud.herokuapp.com/api/classes/${props.match.params.id}`, values)
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
})(ClassesEdit);

export default FormikClassesEdit;



