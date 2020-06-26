import React from "react";
import {
    ConsoleLogger,
    DefaultDeviceController,
    DefaultMeetingSession,
    LogLevel,
    MeetingSessionConfiguration
} from 'amazon-chime-sdk-js';
const {desktopCapturer} = require('electron');
// import desktopCapturer from 'electron'
console.log(desktopCapturer);

class Meeting extends React.Component {

    constructor(props){
        super(props);
        this.state = {}
    }

    componentDidMount () {

    };

    render() {

        return (
            <div>
                yay
            </div>
        )
    }
}

export default Meeting
