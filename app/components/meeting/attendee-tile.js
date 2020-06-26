import React from "react";
import {
    ConsoleLogger,
    DefaultDeviceController,
    DefaultMeetingSession,
    LogLevel,
    MeetingSessionConfiguration
} from 'amazon-chime-sdk-js';

class AttendeeTile extends React.Component {

    constructor(props){
        super(props);
        this.state = {}
    }

    componentDidMount () {
        const logger = new ConsoleLogger('MyLogger', LogLevel.OFF);
        const deviceController = new DefaultDeviceController(logger);
        const configuration = new MeetingSessionConfiguration(this.props.meeting, this.props.attendee);
        const meetingSession = new DefaultMeetingSession(
            configuration,
            logger,
            deviceController
        );
        this.setState({meetingSession});
        // this.addAudioVideo(meetingSession);
    };

    addAudioVideo = async (meetingSession) => {
        const audioInputDevices = await meetingSession.audioVideo.listAudioInputDevices();
        const audioOutputDevices = await meetingSession.audioVideo.listAudioOutputDevices();
        const videoInputDevices = await meetingSession.audioVideo.listVideoInputDevices();

        await meetingSession.audioVideo.chooseAudioInputDevice(audioInputDevices[0].deviceId);
        await meetingSession.audioVideo.chooseAudioOutputDevice(audioOutputDevices[0].deviceId);
        await meetingSession.audioVideo.chooseVideoInputDevice(videoInputDevices[0].deviceId);

        const audioElement = document.getElementById('audio');
        meetingSession.audioVideo.bindAudioElement(audioElement);
        meetingSession.audioVideo.start();
        const videoElement = document.getElementById('video');
        await meetingSession.audioVideo.chooseVideoInputDevice(videoInputDevices[0].deviceId);

        const observer = {
            // videoTileDidUpdate is called whenever a new tile is created or tileState changes.
            videoTileDidUpdate: tileState => {
                // Ignore a tile without attendee ID and other attendee's tile.
                if (!tileState.boundAttendeeId || !tileState.localTile) {
                    return;
                }

                meetingSession.audioVideo.bindVideoElement(tileState.tileId, videoElement);
            }
        };

        meetingSession.audioVideo.addObserver(observer);

        meetingSession.audioVideo.startLocalVideoTile();
    }

    render() {

        return (
            <div>
                <audio id={'audio'}>

                </audio>
                <video id={'video'} style={{height: '50vh', width: '50vh'}}>

                </video>
            </div>
        )
    }
}

export default AttendeeTile
