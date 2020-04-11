import React, { Component } from 'react';
import { axiosWithAuth } from "../../../utility/axiosWithAuth";
import TestModal from './TestModal';
import { connect } from "react-redux";
import { fetchClasses } from "../../../actions";
import { Link } from "react-router-dom";
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
class TestContent extends Component {
  constructor(props) {
    super(props);

    this.replaceModalItem = this.replaceModalItem.bind(this);
    this.saveModalDetails = this.saveModalDetails.bind(this);

    this.state = {
      ready: false,
        requiredItem: 0,
        classes: [],
       
      }
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

  deleteItem(index) {


    axiosWithAuth()
      .delete(`https://alifcloud.herokuapp.com/api/classes/${index}`)
      .then((res) => {
        this.dispatch(fetchClasses());
        let tempBrochure = this.state.classes;
        console.log("tempBrochure", tempBrochure)
        this.setState({ classes: tempBrochure });
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
        
                <Link to={`/classesadd/`}>
                  <Button color="danger">
                    <i className="nc-icon nc-simple-add" /> Add Class
                  </Button>
                </Link>
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
       
          <TestModal
            id={modalData.id}
            name={modalData.name}
            subject={modalData.subject}
            created={modalData.created}
            teacher_id={modalData.teacher_id}
            saveModalDetails={this.saveModalDetails}
          />
  
        </>
      );
  }
}
}

const mapStateToProps = state => {
  return {
  classes: state.ClassesReducer.classes,
  loading: state.ClassesReducer.loading,
  error: state.ClassesReducer.error,
  };
};

export default connect(mapStateToProps)(TestContent);  


