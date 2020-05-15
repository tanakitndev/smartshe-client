import React, { Component } from 'react';
import { Link } from 'react-router-dom';
import EnvironmentsComponent from '../../components/Environments';
import rootPath from '../../configs/rootPath';

export default class Environments extends Component {
    render() {
        return (
            <div>
                <Link to={`${rootPath}/setting-env`} className="btn btn-light btn-sm float-right">
                    Config ENV
                </Link>
                <h4>Environments</h4>
                <EnvironmentsComponent size="lg" />
            </div>
        )
    }
}
