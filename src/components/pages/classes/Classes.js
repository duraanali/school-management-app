import React, { Component } from 'react';
import { axiosWithAuth } from "../../../utility/axiosWithAuth";
import ClassesEdit from './ClassesEdit';
import ClassesAdd from "./ClassesAdd"

import {
  Card,
  CardHeader,
  CardBody,
  CardTitle,
  Table,
  Row,
  Button,
  Col,
  Spinner
} from "reactstrap";

class Classes extends Component {
  constructor(props) {
    super(props);

    this.replaceModalItem = this.replaceModalItem.bind(this);
    this.saveModalDetails = this.saveModalDetails.bind(this);

    this.state = {
      ready: false,
        requiredItem: 0,
        classes: [],
       
      };
      
  }

  

  componentDidMount() {

    axiosWithAuth().get(`https://alifcloud.herokuapp.com/api/classes/`)
      .then(res => {
        console.log("Just Mounted")
        const classes = res.data;
        this.setState({ ready: true, classes });
      })
      
  }


  replaceModalItem(index) {
    this.setState({
      requiredItem: index
    });
    console.log("the ID replaced", index)
  }

  saveModalDetails(item) {
    var id = item.id
    const requiredItem = this.state.requiredItem;
    let tempbrochure = this.state.classes;
    tempbrochure[requiredItem] = item;
    var values = tempbrochure[requiredItem]
    this.setState({ classes: tempbrochure });

    axiosWithAuth()
      .put(`https://alifcloud.herokuapp.com/api/classes/${id}`, values)
      .then((res) => {
        console.log("changed")
      })
      
  }

  addModalDetails() {
    
    console.log("added in class")
      
  }

  deleteItem(index) {


    axiosWithAuth()
      .delete(`https://alifcloud.herokuapp.com/api/classes/${index}`)
      .then((res) => {
        this.setState({classes : this.state.classes})
        var classes = [...this.state.classes];
        var idx = classes.findIndex(item => item.id === index);
        classes.splice(idx, 1);
        this.setState({classes})
      })
      .catch((err) => {
        if (err.response.status === 500) {
          alert("Please delete student first")
        }
      console.log(err.response.status)})

  }



  render() { 
   
      
    const classesOne = this.state.classes.map((item, index) => {
        return (
         
          <tr key={index}>
            <td>{item.id}</td>
            <td>{item.name}</td>
            <td>{item.subject}</td>
            <td>{item.created}</td>
            <td>{item.teacher_id}</td>
          <td>
              <button className="btn btn-primary" data-toggle="modal" data-target="#exampleModal"
                onClick={() => this.replaceModalItem(index)}>edit</button> {" "}
              <button className="btn btn-danger" onClick={() => this.deleteItem(item.id)}>remove</button>
            </td>
          </tr>


        )
      });

      
      if(!this.state.ready) {
        return null
      } else {

    
      const requiredItem = this.state.requiredItem;
      let modalData = this.state.classes[requiredItem];
    
      return (
        <>
        <div className="content">
        <Row>
          <Col>
            <Card>
              <CardHeader>
                <CardTitle tag="h5">Classes</CardTitle>
        
               
                  <Button color="danger" data-toggle="modal" data-target="#addModal" 
                  onClick={() => this.addModalDetails()}>
                    <i className="nc-icon nc-simple-add" /> Add Class
                  </Button>
            
              </CardHeader>
              <CardBody>
                <Table responsive>
                  <thead className="text-primary">
                    <tr>
                      <th>ID#</th>
                      <th>NAME</th>
                      <th>SUBJECT</th>
                      <th>TEACHER</th>
                      <th>CREATED</th>
                      <th>EDIT/DELETE</th>
              
                    </tr>
                  </thead>
                  <tbody>
              {classesOne}
              </tbody>
        </Table>
      </CardBody>
      
    </Card>
  </Col>
</Row>
</div> 
       
          <ClassesEdit
            id={modalData.id}
            name={modalData.name}
            subject={modalData.subject}
            created={modalData.created}
            teacher_id={modalData.teacher_id}
            saveModalDetails={this.saveModalDetails}
          />

          <ClassesAdd
        
            name={modalData.name}
            subject={modalData.subject}
            created={modalData.created}
            teacher_id={modalData.teacher_id}
            addModalDetails={this.addModalDetails}
          />
  
        </>
      );
  }
}
}


export default Classes




// import React, { useEffect } from "react";
// import { connect } from "react-redux";
// import { fetchClasses } from "../../../actions";
// import { axiosWithAuth } from "../../../utility/axiosWithAuth";
// import { Link } from "react-router-dom";
// import {
//   Card,
//   CardHeader,
//   CardBody,
//   CardTitle,
//   Table,
//   Row,
//   Button,
//   Col,
//   Spinner
// } from "reactstrap";

// function Classes(props) {
//   const { error, loading, classes } = props;

//   useEffect(() => {
//     props.dispatch(fetchClasses());
//   }, []);

//   if (error) {
//     return <div>Error! {error.message}</div>;
//   }

//   if (loading) {
//     return  <div className="content">
//     <Row>
//       <Col>
//         <Card>
//           <CardHeader>
//             <CardTitle tag="h5">Classes</CardTitle>

//             <Link to={`/classesadd/`}>
//               <Button color="danger">
//                 <i className="nc-icon nc-simple-add" /> Add Class
//               </Button>
//             </Link>
//           </CardHeader>
//           <CardBody>
//             <Table responsive>
//               <thead className="text-primary">
//                 <tr>
//                 <th>ID#</th>
//                     <th>NAME</th>
//                     <th>SUBJECT</th>
//                     <th>TEACHER</th>
//                     <th>CREATED</th>
//                     <th>EDIT</th>
//                     <th>DELETE</th>
//                 </tr>
//               </thead>
//               <tbody>
//               <tr><Spinner color="dark" /></tr>
//               </tbody>
//               </Table>
//             </CardBody>
//           </Card>
//         </Col>
//       </Row>
//     </div>

//   }

//   const deleteClass = (id) => {
//     axiosWithAuth()
//       .delete(`https://alifcloud.herokuapp.com/api/classes/${id}`)
//       .then((res) => {
//         console.log(res.data.status)
//         props.dispatch(fetchClasses());
     
//       })
//       .catch((err) => {
//         if (err.response.status === 500) {
//           alert("Please delete student first")
//         }
//       console.log(err.response.status)})
//   };


//   return (
//     <div className="content">
//       <Row>
//         <Col>
//           <Card>
//             <CardHeader>
//               <CardTitle tag="h5">Classes</CardTitle>

//               <Link to={`/classesadd/`}>
//                 <Button color="danger">
//                   <i className="nc-icon nc-simple-add" /> Add Class
//                 </Button>
//               </Link>
//             </CardHeader>
//             <CardBody>
//               <Table responsive>
//                 <thead className="text-primary">
//                   <tr>
//                     <th>ID#</th>
//                     <th>NAME</th>
//                     <th>SUBJECT</th>
//                     <th>TEACHER</th>
//                     <th>CREATED</th>
//                     <th>EDIT</th>
//                     <th>DELETE</th>
//                   </tr>
//                 </thead>
//                 <tbody>
//                   {classes.map((class1) => {
//                     return (
//                       <tr>
//                         <td key={class1.id}>{class1.id}</td>
//                         <td key={class1.id}>{class1.name}</td>
//                         <td key={class1.id}>{class1.subject}</td>
//                         <td key={'teacherID'}>{class1.teacher_id}</td>
//                         <td key={class1.id}>{class1.created}</td>
//                         <td key={class1.id}>
//                           <Link to={`/classesedit/${class1.id}`}>
//                             <Button color="success" active>
//                               {" "}
//                               Edit{" "}
//                             </Button>
//                           </Link>{" "}
                       
//                         </td>
//                         <td>
                          
//                           <Button color="danger" onClick={ () => {deleteClass(class1.id) }}>
//                             {" "}
//                             Delete{" "}
//                           </Button>
                    
//                         </td>
//                       </tr>
              
//                     );
//                   })}
//                 </tbody>
//               </Table>
//             </CardBody>
            
//           </Card>
//         </Col>
//       </Row>
//     </div>
//   );
// }


// const mapStateToProps = state => {
//   return {
//   classes: state.ClassesReducer.classes,
//   loading: state.ClassesReducer.loading,
//   error: state.ClassesReducer.error,
//   };
// };

// export default connect(mapStateToProps)(Classes);
