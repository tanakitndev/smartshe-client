import React, { Component } from 'react'

export default class ContentHeader extends Component {
    render() {
        return (
            <div className="content-header" style={this.props.style}>
                <div className="container-fluid">
                    <div className="row mb-2">
                        <div className="col-sm-6">
                            <h1 className="m-0">{this.props.title ? this.props.title : 'Starter'} Page</h1>
                        </div>{/* /.col */}
                        <div className="col-sm-6">
                            <ol className="breadcrumb float-sm-right">
                                <li className="breadcrumb-item"><a href="fake_url">Home</a></li>
                                <li className="breadcrumb-item active">{this.props.title ? this.props.title : 'Starter'} Page</li>
                            </ol>
                        </div>{/* /.col */}
                    </div>{/* /.row */}
                </div>{/* /.container-fluid */}
            </div>
        )
    }
}
