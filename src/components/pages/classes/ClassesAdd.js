
import React, { Component } from 'react';
import { axiosWithAuth } from "../../../utility/axiosWithAuth";
class ClassesAdd extends Component {
    constructor(props) {
        super(props);
        this.handleAdd = this.handleAdd.bind(this);
        this.state = {
        
            name: '',
            subject: '',
            created: '',
            teacher_id: '',
        }
    }

    componentWillReceiveProps(nextProps) {
        this.setState({
       
            name: nextProps.name,
            subject: nextProps.subject,
            created: nextProps.created,
            teacher_id: nextProps.teacher_id,
     
        });
    }

   handleChange(e) {
        this.setState({ [e.target.name]: e.target.value });
    }


    handleAdd() {
        const item = this.state;
        console.log("item", item)
        this.props.addModalDetails(item)

        axiosWithAuth()
        .post(`https://alifcloud.herokuapp.com/api/classes/`, item)
        .then((res) => {
          console.log("classes added", this.state)
   
         
          console.log("added in CLASS EDIT")
        }).catch(err => console.log(err.response));
        

    }

    render() {
   
        return (
            <div className="modal fade" id="addModal" tabIndex="-1" role="dialog" aria-labelledby="exampleModalLabel" aria-hidden="true">
                <div className="modal-dialog" role="document">
                    <div className="modal-content">
                        <div className="modal-header">
                            <h5 className="modal-title" id="exampleModalLabel">Add Class</h5>
                            <button type="button" className="close" data-dismiss="modal" aria-label="Close">
                                <span aria-hidden="true">&times;</span>
                            </button>
                        </div>
                        <div className="modal-body">
                      
                            <p><span className="modal-lable">Name:</span><input name="name" onChange={(e) => this.handleChange(e)} /></p>
                            <p><span className="modal-lable">Subject:</span><input name="subject" onChange={(e) => this.handleChange(e)} /></p>
                            <p><span className="modal-lable">Created:</span><input name="created" onChange={(e) => this.handleChange(e)} /></p>
                            <p><span className="modal-lable">Teacher:</span><input name="teacher_id"  onChange={(e) => this.handleChange(e)} /></p>
                        </div>
                        <div className="modal-footer">
                            <button type="button" className="btn btn-secondary" data-dismiss="modal">Close</button>
                            <button type="button" className="btn btn-primary" data-dismiss="modal" onClick={() => { this.handleAdd() }}>Add</button>
                        </div>
                    </div>
                </div>
            </div>
        );
    }
}

export default ClassesAdd;



// import React, { useEffect, useState }  from "react";
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

// function ClassesAdd({
//   values,
//   errors,
//   status,
//   touched,
//   handleBlur,
//   handleChange,
//   handleSubmit,
//   isSubmitting,
// }) {

//     const [teachers, setTeachers] = useState([]);
  
//     useEffect(() => {
//       axiosWithAuth()
//         .get("https://alifcloud.herokuapp.com/api/teachers/all")
//         .then((res) => {
//           console.log("Inside axios", res.data);
  
//           setTeachers(res.data);
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
//                 <CardTitle tag="h5">Add Class</CardTitle>
//               </CardHeader>
//               <CardBody>
//                 <Form>
//                   <Col className="pr-1" md="12">
//                     <FormGroup>
//                       {touched.name && errors.name && <p>{errors.name}</p>}
//                       <Input
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
//                         Add Parent
//                       </Button>
//                     </div>
//                   </Row>
//                 </Form>
//               </CardBody>
//             </Card>
//           </Col>
//         </Row>
//       </div>
//     </>
//   );
// }
// function appendLeadingZeroes(n){
//     if(n <= 9){
//       return "0" + n;
//     }
//     return n
//   }
  
//   let current_datetime = new Date()
//   let formatted_date = appendLeadingZeroes(current_datetime.getMonth() + 1) + "/" + appendLeadingZeroes(current_datetime.getDate() + 1) + "/" +  current_datetime.getFullYear()
// const FormikClassesAdd = withFormik({
//   mapPropsToValues({ name, subject, teacher_id, created}) {
//     return {
//       name: name || "",
//       subject: subject || "",
//       teacher_id: teacher_id || "",
//       created: formatted_date,

//     };
//   },
//   validationSchema: Yup.object().shape({
//     name: Yup.string().required(),
//     subject: Yup.string().required(),
//     teacher_id: Yup.string().required(),
   
//   }),
//   handleSubmit(values, { resetForm, setSubmitting, setStatus, props }) {
//     console.log(values);
//     axiosWithAuth()
//       .post("https://alifcloud.herokuapp.com/api/classes/", values)
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
// })(ClassesAdd);

// export default FormikClassesAdd;
