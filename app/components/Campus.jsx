import React, { Component } from 'react';
import axios from 'axios';
import SingleCampus from './SingleCampus.jsx';
import AddStudent from './AddStudent.jsx';

export default class Campus extends Component {
    
    constructor() {
        super();
        this.state = {
            campuses: {}
        }
    }
    
    componentDidMount() {
        const campusId = this.props.match.params.campusId;
        
        axios.get(`/api/campuses/${campusId}`)
        .then(res => res.data)
        .then(campuses => this.setState({campuses}))
    }
    
    render() {
        const students = this.state.campuses.students;
        return (
            <section className="container">
                <h1>{this.state.campuses.name}</h1>
                {students && 
                    <section className="table table-striped">
                        <AddStudent campus={this.state.campuses} />
                        <thead>
                            <tr>
                                <th>Name</th>
                                <th>Email</th>
                            </tr>
                        </thead>
                        <tbody>
                    {students.map(student => (
                            <tr key={student.id}>
                                <td>{student.name}</td>
                                <td>{student.email}</td>
                            </tr>
                        ))}
                        </tbody>
                 </section>
                }
            </section>
        )
    }
}