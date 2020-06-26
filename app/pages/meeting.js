import React from "react";
// import {
//     ConsoleLogger,
//     DefaultDeviceController,
//     DefaultMeetingSession,
//     LogLevel,
//     MeetingSessionConfiguration
// } from 'amazon-chime-sdk-js';
// const {desktopCapturer} = require('electron');
// import desktopCapturer from 'electron'
// console.log(desktopCapturer);
import {Button, Col, Row} from "antd";
import SocketManger from '../lib/socket'
import LocalTile from "../components/meeting/local-tile";
import Tiles from "../components/meeting/tiles";

class Meeting extends React.Component {

    constructor(props){
        super(props);
        this.state = {

        }

    }

    componentDidMount () {
        this.createMeeting();
    };

    createMeeting = async () => {
        // let meeting = await SocketManger.post('/meeting');
        // console.log(JSON.stringify(meeting.data));
        // await this.setState({meeting: {"Meeting":{"MeetingId":"bb62d06d-5bc0-49ea-8453-a760aa80946d","ExternalMeetingId":null,"MediaPlacement":{"AudioHostUrl":"2938ba7d3c481cbfa9e08722bb47c6a0.k.m1.as1.app.chime.aws:3478","AudioFallbackUrl":"wss://haxrp.m1.as1.app.chime.aws:443/calls/bb62d06d-5bc0-49ea-8453-a760aa80946d","ScreenDataUrl":"wss://bitpw.m1.as1.app.chime.aws:443/v2/screen/bb62d06d-5bc0-49ea-8453-a760aa80946d","ScreenSharingUrl":"wss://bitpw.m1.as1.app.chime.aws:443/v2/screen/bb62d06d-5bc0-49ea-8453-a760aa80946d","ScreenViewingUrl":"wss://bitpw.m1.as1.app.chime.aws:443/ws/connect?passcode=null&viewer_uuid=null&X-BitHub-Call-Id=bb62d06d-5bc0-49ea-8453-a760aa80946d","SignalingUrl":"wss://signal.m1.as1.app.chime.aws/control/bb62d06d-5bc0-49ea-8453-a760aa80946d","TurnControlUrl":"https://ccp.cp.ue1.app.chime.aws/v2/turn_sessions"},"MediaRegion":"ap-southeast-1"}}});
        // console.log(meeting.data);
        // await this.setState({meeting: meeting.data});
        // await this.setState({meeting: {"Meeting":{"MeetingId":"b33456bc-624a-44e8-b104-135cfbf27da2","ExternalMeetingId":null,"MediaPlacement":{"AudioHostUrl":"462c7b5b9c8e7f61bf38205125937794.k.m2.as1.app.chime.aws:3478","AudioFallbackUrl":"wss://haxrp.m2.as1.app.chime.aws:443/calls/b33456bc-624a-44e8-b104-135cfbf27da2","ScreenDataUrl":"wss://bitpw.m2.as1.app.chime.aws:443/v2/screen/b33456bc-624a-44e8-b104-135cfbf27da2","ScreenSharingUrl":"wss://bitpw.m2.as1.app.chime.aws:443/v2/screen/b33456bc-624a-44e8-b104-135cfbf27da2","ScreenViewingUrl":"wss://bitpw.m2.as1.app.chime.aws:443/ws/connect?passcode=null&viewer_uuid=null&X-BitHub-Call-Id=b33456bc-624a-44e8-b104-135cfbf27da2","SignalingUrl":"wss://signal.m2.as1.app.chime.aws/control/b33456bc-624a-44e8-b104-135cfbf27da2","TurnControlUrl":"https://ccp.cp.ue1.app.chime.aws/v2/turn_sessions"},"MediaRegion":"ap-southeast-1"}}});
        // this.createAttendee();
    };

    createAttendee = async () => {
        let attendee = await SocketManger.post('/attendee', {meeting: this.state.meeting});
        console.log(attendee);
        this.setState({attendee: attendee.data});
    }

    setMeeting = async () => {
        console.log('yay')
        let meeting = await SocketManger.post('/meeting');
        console.log(meeting);
        await SocketManger.post('/attendee', {meeting: JSON.parse(meeting.data.json), userId: 2, meetingId: meeting.data.id});
        await SocketManger.post('/attendee', {meeting: JSON.parse(meeting.data.json), userId: 2, meetingId: meeting.data.id});
    };

    startMeeting = async () => {
        let meeting = await SocketManger.get('/meetings/6');
        console.log(meeting);
        let attendees = await SocketManger.get('/meetings/6/attendees');
        console.log(attendees);
        console.log({meeting: meeting.data.json, attendee: attendees.data[0].json});
        this.setState({meeting: JSON.parse(meeting.data.json), attendee: JSON.parse(attendees.data[0].json)});
    }

    render() {

        return (
            <div>
                {/*{this.state.meeting && this.state.attendee && <LocalTile meeting={this.state.meeting} attendee={this.state.attendee} />}*/}

                <Button type={'primary'} onClick={this.setMeeting}>Set up Meeting</Button>
                <Button type={'primary'} onClick={this.startMeeting}>Start Meeting</Button>
                <br/>
                {this.state.meeting && this.state.attendee && <Tiles meeting={this.state.meeting}
                                                                     attendee={this.state.attendee} />}

                {/*<Row type={'flex'} style={{border: '5px solid red', height: '5vh'}} align={'center'}>*/}
                {/*    <Col style={{marginTop: '5px'}}>*/}
                {/*        <Button onClick={() => this.setState({showOne: true})}>Start 1</Button>*/}
                {/*        &nbsp;&nbsp;<Button onClick={() => this.setState({showTwo: true})}>Start 2</Button>*/}
                {/*    </Col>*/}
                {/*</Row>*/}
                {/*<Row type={'flex'} style={{border: '5px solid green', height: '95vh'}}>*/}
                {/*    <Col span={12}>*/}
                {/*        <audio id={'audio'}>*/}

                {/*        </audio>*/}
                {/*        /!*<video id={'video'} style={{height: '50vh', width: '50vh'}}>*!/*/}
                {/*        <video id={'video'}>*/}

                {/*        </video>*/}
                {/*        /!*{this.state.showOne && <LocalTile meeting={this.state.meeting} attendee={this.state.one} />}*!/*/}
                {/*    </Col>*/}
                {/*    <Col span={12}>*/}
                {/*        /!*{this.state.showTwo && <LocalTile meeting={this.state.meeting} attendee={this.state.two} />}*!/*/}
                {/*    </Col>*/}
                {/*</Row>*/}
            </div>
        )
    }
}

export default Meeting
