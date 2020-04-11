import React, { Component } from 'react';

class ClassesEdit extends Component {
    constructor(props) {
        super(props);
        this.handleSave = this.handleSave.bind(this);
        this.state = {
            id: '',
            name: '',
            subject: '',
            created: '',
            teacher_id: '',
        }
    }

    componentWillReceiveProps(nextProps) {
        this.setState({
            id: nextProps.id,
            name: nextProps.name,
            subject: nextProps.subject,
            created: nextProps.created,
            teacher_id: nextProps.teacher_id,
     
        });
    }

   handleChange(e) {
        this.setState({ [e.target.name]: e.target.value });
    }


    handleSave() {
        const item = this.state;
        console.log("item", item)
        this.props.saveModalDetails(item)
    }

    render() {
   
        return (
            <div className="modal fade" id="exampleModal" tabIndex="-1" role="dialog" aria-labelledby="exampleModalLabel" aria-hidden="true">
                <div className="modal-dialog" role="document">
                    <div className="modal-content">
                        <div className="modal-header">
                            <h5 className="modal-title" id="exampleModalLabel">Edit Class</h5>
                            <button type="button" className="close" data-dismiss="modal" aria-label="Close">
                                <span aria-hidden="true">&times;</span>
                            </button>
                        </div>
                        <div className="modal-body">
                      
                            <p><span className="modal-lable">Name:</span><input name="name" value={this.state.name} onChange={(e) => this.handleChange(e)} /></p>
                            <p><span className="modal-lable">Subject:</span><input name="subject" value={this.state.subject} onChange={(e) => this.handleChange(e)} /></p>
                            <p><span className="modal-lable">Created:</span><input name="created" value={this.state.created} onChange={(e) => this.handleChange(e)} /></p>
                            <p><span className="modal-lable">Teacher:</span><input name="teacher_id" value={this.state.teacher_id} onChange={(e) => this.handleChange(e)} /></p>
                        </div>
                        <div className="modal-footer">
                            <button type="button" className="btn btn-secondary" data-dismiss="modal">Close</button>
                            <button type="button" className="btn btn-primary" data-dismiss="modal" onClick={() => { this.handleSave() }}>Save changes</button>
                        </div>
                    </div>
                </div>
            </div>
        );
    }
}

export default ClassesEdit;


// import React, { useEffect, useState } from "react";
// import { axiosWithAuth } from "../../../utility/axiosWithAuth";
// import {
//   Button,
//   Card,
//   CardHeader,
//   CardBody,
//   CardTitle,
//   FormGroup,
//   Input,
//   Row,
//   Col,
// } from "reactstrap";

// import { withFormik, Form } from "formik";
// import * as Yup from "yup";

// function ClassesEdit(props) {

//     const [teachers, setTeachers] = useState([]);
    
//     const {
//       values,
//       errors,
//       touched,
//       handleBlur,
//       handleChange,
//       isSubmitting,
//       initialValues
//     } = props


//     const [classes, setClasses] = useState({})
//     // var id = props.match.params.id
//     useEffect(() => {
//       axiosWithAuth()
//         .get(`https://alifcloud.herokuapp.com/api/classes/${1}`)
//         .then((res) => {
//             setClasses(res.data);
//         })
//         .catch((err) => console.log(err.response));
//     }, []);

//     function myClass() {
//       console.log(classes)
//     } 

//     useEffect(() => {
//       myClass()
      
//     }, []);

    
//     useEffect(() => {
//       axiosWithAuth()
//         .get("https://alifcloud.herokuapp.com/api/teachers/all/")
//         .then((res) => {
//             setTeachers(res.data);
//         })
//         .catch((err) => console.log(err.response));
//     }, []);

//   return (
//     <>
//       <div className="content">
//         <Row>
//           <Col md="12">
//             <Card className="card-user">
//               <CardHeader>
//                 <CardTitle tag="h5">Edit Class</CardTitle>
//               </CardHeader>
//               <CardBody>
//                 <Form>
//                   <Col className="pr-1" md="12">
//                     <FormGroup>
//                       {touched.name && errors.name && <p>{errors.name}</p>}
//                       <Input
//                       values={classes.name}
//                         type="text"
//                         name="name"
//                         placeholder="name"
//                         onChange={handleChange}
//                         onBlur={handleBlur}
//                       />
//                     </FormGroup>
//                   </Col>

//                   <Col className="pr-1" md="12">
//                     <FormGroup>
//                       {touched.subject && errors.subject && <p>{errors.subject}</p>}
//                       <Input
//                         type="text"
//                         name="subject"
//                         placeholder="subject"
//                         onChange={handleChange}
//                         onBlur={handleBlur}
//                       />
//                     </FormGroup>
//                   </Col>
//                   <Col className="pr-1" md="12">
//                     <FormGroup>
//                       {touched.teacher_id && errors.teacher_id && (
//                         <p>{errors.teacher_id}</p>
//                       )}
//                       <Input
//                         type="select"
//                         name="teacher_id"
//                         onChange={handleChange}
//                         onBlur={handleBlur}
//                       >
//                         <option value="">Select A Teacher</option>
//                         {teachers.map((teacher) => {
//                           return (
//                             <option value={teacher.id}> {teacher.name}</option>
//                           );
//                         })}
//                       </Input>
//                     </FormGroup>
//                   </Col>
                  
//                   <Row>
//                     <div className="update ml-auto mr-auto">
//                       <Button
//                         className="btn-round"
//                         color="primary"
//                         type="submit"
//                         disabled={isSubmitting}
//                       >
//                         Edit Parent
//                       </Button>
//                     </div>
//                   </Row>
//                 </Form>
//                 <pre>{JSON.stringify(props, null, 2)}</pre>
//               </CardBody>
//             </Card>
//           </Col>
//         </Row>
//       </div>
//     </>
//   );
// }



// const FormikClassesEdit = withFormik({
  
//   mapPropsToValues({ name, subject, teacher_id }) {
//     return {
//       name: name || "",
//       subject: subject || "",
//       teacher_id: teacher_id || "",


//     };
//   },
//   validationSchema: Yup.object().shape({
//     name: Yup.string().required(),
//     subject: Yup.string().required(),
//     teacher_id: Yup.string().required(),

   
//   }),
//   handleSubmit(values, { resetForm, setSubmitting, setStatus, props }) {
//     console.log(values);
//     var id = props.match.params.id
//     axiosWithAuth()
//       .put(`https://alifcloud.herokuapp.com/api/classes/${id}`, values)
//       .then((res) => {
//         setStatus(res.data);
//         resetForm();
//         setSubmitting(false);
//         props.history.push("/AdminAccount/classes");
//       })
//       .catch((err) => {
//         setSubmitting(false);
//       });
//   },
// })(ClassesEdit);



// export default FormikClassesEdit;

