import React, { Component } from 'react'
import JobListComponent from '../../components/JobList'

export default class JobList extends Component {
    render() {
        return (
            <div>
                <h4>Job List</h4>
                <JobListComponent />
            </div>
        )
    }
}
