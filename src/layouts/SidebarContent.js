import React, { Component } from 'react'
import MessageAlert from '../components/MessageAlert'

export default class SidebarContent extends Component {
    render() {
        return (
            <aside className="control-sidebar control-sidebar-dark">
                <div className="p-3">
                   <MessageAlert />
                </div>
            </aside>
        )
    }
}
