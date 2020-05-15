import React, { Component } from 'react'
import { withRouter } from "react-router";

class About extends Component {

    componentDidMount() {
        console.log(this.props);
    }

    render() {
        return (
            <div>
                <h2>About</h2>
            </div>
        )
    }
}

export default withRouter(About);
