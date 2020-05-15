import React, { Component } from 'react'
import { FontAwesomeIcon } from '@fortawesome/react-fontawesome';
import { faBell, faEnvelope } from '@fortawesome/free-solid-svg-icons';
import { connect } from 'react-redux'
import { setAlarmData, clearAlarmData, setInVisibleAlarms } from '../store/actions'

import parse from 'html-react-parser';
class MessageAlert extends Component {


    render() {
        return (
            <div className={`sidenav`}>
                <h4 className="text-white">Notifications</h4>

                {/* <button className="close-alert btn btn-outline-danger btn-sm" onClick={() => this.send('Hello Hook')}>Close</button> */}
                <a href="fake_url">
                    <FontAwesomeIcon icon={faBell} style={{ color: 'red' }} /> Alert Log.
              </a>
                <ul style={{ listStyleType: 'none', color: 'red' }}>
                    {/* <li>Location Danger</li> */}
                    {this.props.alarms.map((msg, index) => {
                        return (
                            <li key={index} className="alert-log">{parse(msg)}</li>
                        )
                    })}
                </ul>
                <a href="fake_url">
                    <FontAwesomeIcon
                        icon={faEnvelope}
                        style={{ color: 'lightgreen' }}
                    />{' '}
                    Permit Message
              </a>
            </div>
        )
    }
}

const mapStateToProps = (state) => ({
    alarms: state.alarms
})

const mapDispatchToProps = {
    setAlarmData,
    clearAlarmData,
    setInVisibleAlarms
}

export default connect(mapStateToProps, mapDispatchToProps)(MessageAlert)