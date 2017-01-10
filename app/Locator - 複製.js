import React from 'react';
import { Grid, Image as Image_semantic } from 'semantic-ui-react';

class Ble_Device extends React.Component {
    constructor(props) {
        super(props);
    }
    render() {
        return (
            <div className="sk-double-bounce" style={this.props.style1}>
                <div className="sk-child sk-double-bounce1" style={this.props.style2}></div>
            </div>
        )
    }
}
export default class Locator extends React.Component {
    constructor(props) {
        super(props);
        this.state = {
            ui: {
                canvas_style:{
                    width: 800,
                    height: 800,
                }
            }

         }
    }
    componentDidMount() {
        const canvas_width = this.refs.canvas.width;
        const canvas_height = this.refs.canvas.height;
        const ctx = this.refs.canvas.getContext('2d');
        var img = new Image();
        // img.src = 'http://10.100.82.52:3207/ble/static/raspberry-white.png';
        img.src = 'http://10.100.82.52:3000/assets/raspberry-white.png';
        // img.src = 'http://localhost:3000/assets/raspberry-white.png';
        // img.src = 'static/raspberry-white.png';
        img.onload = function(){
            let img_wigth = img.width;
            let img_height = img.height;
            ctx.drawImage(img,30/50*canvas_width-img_wigth/2,25/30*canvas_height-img_height/2);//,img_wigth/canvas_style_init.width*canvas_width,img_height/canvas_style_init.height*canvas_height
            ctx.fillRect(30/50*canvas_width,25/30*canvas_height,1,1);
        }
    }
    updateCanvas() {
    }
    render() {
        const div_style = {
            position: "absolute",
            top: "0",
            right: "0",
            width: "100%",
            paddingTop: "100%", /* 1:1 Aspect Ratio */
            // zIndex: "-1",
            backgroundColor: "darkgrey"}
        const canvas_style = {
            position: "absolute",
            top: "0",
            left: "0",
            right: "0",
            bottom: "0",
            zIndex: "0",
            width: "100%",
            height: "100%"}
        const div_background_style = {
            width: this.state.ui.canvas_style.width,
            height: this.state.ui.canvas_style.height}

        const style1 = {top:"300px",left:"300px", width:"20%",height:"20%"}
        const style2 = {backgroundColor:"rgba(0,255,0,0.3)"}

        /*const stt = {width:"100%",height:"100px",backgroundColor:"black",left:"0"}
        const stt1 = {width:"100%",height:"100px",backgroundColor:"red",left:"0"}
        const stt2 = {width:"100%",height:"100px",backgroundColor:"blue",left:"0"}*/
        const test = {
            position: "relative",
            top: "0",
            left: "0"}
        return (
            <Grid>
            <Grid.Column width={1}>
                {/*<div style={stt}></div>*/}
            </Grid.Column>
            <Grid.Column width={10} style={test}>
                {/*<div style={stt1}></div>*/}
                <div style={div_background_style}>
                </div>
                <div style={div_style}>
                    <canvas ref="canvas" width={this.state.ui.canvas_style.width} height={this.state.ui.canvas_style.height} style={canvas_style}></canvas>
                </div>
                {/*<Ble_Device pos={pos}/>*/}
                <Ble_Device style1={style1} style2={style2}/>
            </Grid.Column>
            <Grid.Column width={1}>
            </Grid.Column>
            <Grid.Column width={3}>
                {/*<div style={stt2}></div>*/}
                <Grid>
                    <Grid.Column>
                        <Image_semantic src='http://semantic-ui.com/images/wireframe/media-paragraph.png' />
                    </Grid.Column>
                </Grid>
                <Grid>
                    <Grid.Column>
                        <Image_semantic src='http://semantic-ui.com/images/wireframe/media-paragraph.png' />
                    </Grid.Column>
                </Grid>
            </Grid.Column>
            {/*<Grid.Row>
            <Grid.Column width={3}>
                <Image_semantic src='http://semantic-ui.com/images/wireframe/image.png' />
            </Grid.Column>
            <Grid.Column width={13}>
                <Image_semantic src='http://semantic-ui.com/images/wireframe/centered-paragraph.png' />
            </Grid.Column>
            </Grid.Row>*/}
            </Grid>
        )
    }
}