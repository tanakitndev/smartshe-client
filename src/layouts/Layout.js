import React, { Component } from 'react'
import Navbar from './Navbar';
import Sidebar from './Sidebar';
// import ContentHeader from './ContentHeader';
import Footer from './Footer';

class Layout extends Component {

    render() {
        return (
            <div className="wrapper">
                <Navbar />
                <Sidebar />
                <div className="content-wrapper">
                    {/* <ContentHeader title={this.props.title} /> */}
                    <div className="content pt-3">
                        <div className="container-fluid">
                            {this.props.children}
                        </div>
                    </div>
                </div>
                <Footer />
            </div>
        )
    }
};

export default Layout;


