import React, { Component } from 'react';

class TestModal extends Component {
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
        this.props.saveModalDetails(item)
    }

    render() {
   
        return (
            <div className="modal fade" id="exampleModal" tabIndex="-1" role="dialog" aria-labelledby="exampleModalLabel" aria-hidden="true">
                <div className="modal-dialog" role="document">
                    <div className="modal-content">
                        <div className="modal-header">
                            <h5 className="modal-title" id="exampleModalLabel">Edit Jewel</h5>
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

export default TestModal;