import React from "react";
import {
    ConsoleLogger,
    DefaultDeviceController,
    DefaultMeetingSession,
    LogLevel,
    MeetingSessionConfiguration
} from 'amazon-chime-sdk-js';
// const {desktopCapturer, ipcRenderer} = require('electron');
// import desktopCapturer from 'electron'
// console.log(desktopCapturer);
import {Row, Col, Button, Spin} from 'antd';

class Index extends React.Component {

    constructor(props){
        super(props);
        this.state = {
            playAudio: false,
            spinning: false
        }

    }

    componentDidMount () {
        console.log('yay')
        const webview = document.querySelector('webview')
        // webview.addEventListener('dom-ready', () => {
        //     webview.openDevTools()
        // })

        // var webview = document.getElementById('webview');
        // webview.addEventListener('dom-ready', () => {// webview.openDevTools()
        //     //webview.getWebContents().executeJavaScript(`var a = 'foo'; alert(a); Promise.resolve(a);`)
        //     webview.executeJavaScript(`var a = 'foo'; alert(a); Promise.resolve(a);`)
        //         .then((a) => console.log(a))
        //         .catch((error) => console.log(error));
        // });

        function handleStream (stream) {
            const video = document.querySelector('video')
            video.srcObject = stream
            video.onloadedmetadata = (e) => video.play()
        }

        function handleError (e) {
            console.log(e)
        }
        let str;
        // desktopCapturer.getSources({ types: ['window', 'screen'] }).then(async sources => {
        //     for (const source of sources) {
        //         console.log(source);
        //         if(!str) {
        //             str = source;
        //             const strs = await navigator.mediaDevices.getUserMedia({
        //                 audio: false,
        //                 video: {
        //                     mandatory: {
        //                         chromeMediaSource: 'desktop',
        //                         chromeMediaSourceId: source.id,
        //                         minWidth: 1280,
        //                         maxWidth: 1280,
        //                         minHeight: 720,
        //                         maxHeight: 720
        //                     }
        //                 }
        //             })
        //             handleStream(strs);
        //         }
        //         if (source.name === 'Electron') {
        //             try {
        //                 const stream = await navigator.mediaDevices.getUserMedia({
        //                     audio: false,
        //                     video: {
        //                         mandatory: {
        //                             chromeMediaSource: 'desktop',
        //                             chromeMediaSourceId: source.id,
        //                             minWidth: 1280,
        //                             maxWidth: 1280,
        //                             minHeight: 720,
        //                             maxHeight: 720
        //                         }
        //                     }
        //                 })
        //                 handleStream(stream)
        //             } catch (e) {
        //                 handleError(e)
        //             }
        //             return
        //         }
        //     }
        // })

        // desktopCapturer.getSources({ types:['window', 'screen'] }, function(error, sources) {
        //     console.log(error, sources);
        //     for (let source of sources) {
        //         console.log("Name: " + source.name);
        //         console.log("Name: " + source);
        //     }
        // });
        // this.meet();
    };

    meet = async () => {
        const logger = new ConsoleLogger('MyLogger', LogLevel.INFO);
        const deviceController = new DefaultDeviceController(logger);
        let meetingResponse = { Meeting:
                { MeetingId: '78038770-7163-44ab-bb8e-ee3a2d1338fe',
                    ExternalMeetingId: null,
                    MediaPlacement:
                        { AudioHostUrl:
                                'daa699c7abb159f17fb040fc296b37a6.k.m2.as1.app.chime.aws:3478',
                            AudioFallbackUrl:
                                'wss://haxrp.m2.as1.app.chime.aws:443/calls/78038770-7163-44ab-bb8e-ee3a2d1338fe',
                            ScreenDataUrl:
                                'wss://bitpw.m2.as1.app.chime.aws:443/v2/screen/78038770-7163-44ab-bb8e-ee3a2d1338fe',
                            ScreenSharingUrl:
                                'wss://bitpw.m2.as1.app.chime.aws:443/v2/screen/78038770-7163-44ab-bb8e-ee3a2d1338fe',
                            ScreenViewingUrl:
                                'wss://bitpw.m2.as1.app.chime.aws:443/ws/connect?passcode=null&viewer_uuid=null&X-BitHub-Call-Id=78038770-7163-44ab-bb8e-ee3a2d1338fe',
                            SignalingUrl:
                                'wss://signal.m2.as1.app.chime.aws/control/78038770-7163-44ab-bb8e-ee3a2d1338fe',
                            TurnControlUrl: 'https://ccp.cp.ue1.app.chime.aws/v2/turn_sessions' },
                    MediaRegion: 'ap-southeast-1' } }

        const attendeeResponse =  { Attendee:
                { ExternalUserId: '9c7b633b-0a25-462c-937b-72ecf4373fc4',
                    AttendeeId: 'cbb0c3e9-9262-45fe-91d8-29208fd36c08',
                    JoinToken:
                        'Y2JiMGMzZTktOTI2Mi00NWZlLTkxZDgtMjkyMDhmZDM2YzA4OmI4YzQ3NjM3LTQwYjktNDY3NS1hNjVlLTM0ZTJjYmQ2MmIwNg' } }
        const configuration = new MeetingSessionConfiguration(meetingResponse, attendeeResponse);
        const meetingSession = new DefaultMeetingSession(
            configuration,
            logger,
            deviceController
        );

        const audioInputDevices = await meetingSession.audioVideo.listAudioInputDevices();
        const audioOutputDevices = await meetingSession.audioVideo.listAudioOutputDevices();
        const videoInputDevices = await meetingSession.audioVideo.listVideoInputDevices();

        audioInputDevices.forEach(mediaDeviceInfo => {
            console.log(`Device ID: ${mediaDeviceInfo.deviceId} Microphone: ${mediaDeviceInfo.label}`);
        });

        await meetingSession.audioVideo.chooseAudioInputDevice(audioInputDevices[0].deviceId);
        await meetingSession.audioVideo.chooseAudioOutputDevice(audioOutputDevices[0].deviceId);
        await meetingSession.audioVideo.chooseVideoInputDevice(videoInputDevices[0].deviceId);

        const audioElement = document.getElementById('audio-element-id');
        meetingSession.audioVideo.bindAudioElement(audioElement);

        // const observer = {
        //     audioVideoDidStart: () => {
        //         console.log('Started');
        //     }
        // };
        //
        // meetingSession.audioVideo.addObserver(observer);

        meetingSession.audioVideo.start();
        const videoElement = document.getElementById('video-element-id');
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

        // await meetingSession.audioVideo.startContentShareFromScreenCapture();
        // await meetingSession.audioVideo.startContentShare();


    }

    // openMeeting = () => {
    //     ipcRenderer.send('new-window');
    // };


    render() {

        return (
            <div>

                {/*<button onClick={this.toggleAudio}>*/}
                {/*    {this.state.playAudio ? 'Stop Audio' : 'Play Audio'}*/}
                {/*</button>*/}
                {/*{this.state.playAudio && <MyAudio />}*/}

                <Row type={'flex'} align={'center'}>
                    <Col span={6} style={{width:'100%', height: '100vh', borderRight: '2px solid #ddd'}}>
                        <br/>
                        <br/>
                        <br/>
                        <h2 className={' m-l-md text-center'}>&nbsp;&nbsp;&nbsp;&nbsp;&nbsp;&nbsp;This area is a sidebar</h2>

                        &nbsp;&nbsp;&nbsp;&nbsp;&nbsp;&nbsp;<Button type={'primary'} onClick={() => this.setState({spinning: !this.state.spinning})}>Start Scraping</Button>

                    </Col>
                    <Col span={10}>
                        <Spin spinning={this.state.spinning}>
                            <webview src="https://www.linkedin.com/search/results/people/?facetGeoRegion=%5B%22in%3A7093%22%5D&facetNetwork=%5B%22S%22%2C%22O%22%5D&keywords=Marketing&origin=FACETED_SEARCH&page=1"
                                     style={{width:'100%', height: '100vh'}}></webview>
                        </Spin>
                    </Col>

                    <Col span={8}>
                        <Spin spinning={this.state.spinning}>
                            <webview src="https://3cx.aptask.com/webclient/#/people"
                                     style={{width:'100%', height: '100vh'}}></webview>
                        </Spin>
                    </Col>

                </Row>



                {/*<div style={{height: '200px', width: '100%', background: '#ddd'}}>*/}

                {/*</div>*/}



                {/*<button onClick={this.openMeeting}>Open Meeting</button>*/}

                {/*<audio id={'audio-element-id'}>*/}

                {/*</audio>*/}

                {/*<video id={'video-element-id'} style={{width: '200px', height: '200px'}}>*/}

                {/*</video>*/}



            </div>
        )
    }
}

export default Index
