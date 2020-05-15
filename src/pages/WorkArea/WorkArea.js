import React, { Component } from 'react'
import { Link } from 'react-router-dom';
import WorkAreaComponent from '../../components/WorkArea';
import rootPath from '../../configs/rootPath';


export default class WorkArea extends Component {
    render() {
        return (
            <div>
                <Link to={`${rootPath}/setting-env`} className="btn btn-light btn-sm float-right">
                    Config ENV
                </Link>
                <h4>TABLE Monitoring Work Area</h4>
                <WorkAreaComponent size="lg" />
            </div>
        )
    }
}
