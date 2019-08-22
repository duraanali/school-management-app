import React from 'react';
import { axiosWithAuth } from '../../utility/axiosWithAuth';

class Dashboard extends React.Component {
    state = {
        students: []
    };

    componentDidMount() {

        this.getData();

    }

    getData = () => {
        axiosWithAuth()
            .get('http://localhost:5000/api/students/')
            .then(res => {

                const students = res.data;
                this.setState({ students });

            })
            .catch(err => console.log(err.response));
    };

    render() {

        return (
            <div>

                <h1>Welcome To The Dashboard </h1>
                {this.state.students.map(student =>
                    <p key={student.name}>{student.name}</p>)}

            </div>
        );
    }
}

export default Dashboard;
