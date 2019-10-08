import React, { useEffect, useState } from 'react';
import { axiosWithAuth } from '../../../utility/axiosWithAuth';


import '../include/forms.css';
import { withFormik, Form, Field } from "formik";
import * as Yup from "yup";

function StudentEdit({ values,
    errors,
    status,
    touched,
    handleBlur,
    handleChange,
    handleSubmit,
    isSubmitting, }) {

    const [parents, setParents] = useState([])
    const [classes, setClasses] = useState([])


    useEffect(() => {
        axiosWithAuth()
            .get('https://alifcloud.herokuapp.com/api/parents/')
            .then(res => {
                console.log('Inside axios', res.data)

                setParents(res.data)

            })
            .catch(err => console.log(err.response));
    }, []);

    useEffect(() => {
        axiosWithAuth()
            .get('https://alifcloud.herokuapp.com/api/classes/')
            .then(res => {
                console.log('Inside axios', res.data)

                setClasses(res.data)

            })
            .catch(err => console.log(err.response));
    }, []);


    return (

        <div>



            <Form className="addForm">
                <h3>Add Student</h3>
                {touched.name && errors.name && <p>{errors.name}</p>}
                <Field className="field-input" type="text" name="name" placeholder="name" />
                {touched.dob && errors.dob && <p>{errors.dob}</p>}
                <Field className="field-input" type="date" name="dob" placeholder="Date of Birth" />

                {touched.parent_id && errors.parent_id && <p>{errors.parent_id}</p>}
                <select
                    className="field-input"
                    name="parent_id"
                    onChange={handleChange}
                    onBlur={handleBlur}
                >

                    <option value="">Select A Parent</option>
                    {parents.map((parent) => {

                        return <option value={parent.id}> {parent.name}
                        </option>

                    })}
                </select>
                {touched.class_id && errors.class_id && <p>{errors.class_id}</p>}
                <select
                    className="field-input"
                    name="class_id"
                    onChange={handleChange}
                    onBlur={handleBlur}
                >
                    <option value="">Select A Class</option>
                    {classes.map((class1) => {

                        return <option value={class1.id}> {class1.name}
                        </option>

                    })}
                </select>

                {/* {touched.class_id && errors.class_id && <p>{errors.class_id}</p>}
                <Field className="field-input" type="text" name="class_id" placeholder="Parent" />

                {touched.parent_id && errors.parent_id && <p>{errors.parent_id}</p>}
                <Field className="field-input" type="text" name="parent_id" placeholder="Parent" /> */}


                <button type="submit" disabled={isSubmitting}>Add Student</button>

            </Form>

        </div>
    );

}

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

        console.log("the id", props.match.params.id)
        axiosWithAuth()
            .put(`https://alifcloud.herokuapp.com/api/students/${props.match.params.id}`, values)
            .then(res => {
                console.log("inside put api", res.data)
                setStatus(res.data)
                resetForm();
                setSubmitting(false);
                props.history.push("/students")
            })
            .catch(err => {

                setSubmitting(false);
            });

    }
})(StudentEdit);

export default FormikStudentEdit;



