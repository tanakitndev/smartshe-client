import React, { Component } from 'react'
import SidebarContent from './SidebarContent'
import { Link } from 'react-router-dom'

export default class Footer extends Component {
    render() {
        return (
            <>
                <SidebarContent />
                <footer className="main-footer bg-dark">
                    <div className="float-right d-none d-sm-inline">
                        version: 0.0.4-dev
                    </div>
                    <strong>Copyright © 2014-2020 <Link to="/">CPF</Link>.</strong> All rights reserved.
                </footer>
            </>
        )
    }
}
