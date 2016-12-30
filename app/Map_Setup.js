import React from 'react';
import { Grid, Image as Image_semantic } from 'semantic-ui-react';
import {Layer, Rect, Stage, Group, Image as Image_reactkonva} from 'react-konva';


class MyImage extends React.Component {
    constructor(props) {
        super(props);
        this.state = {
            image: null
        }
    }
    componentDidMount() {
        let thisss = this;
        let img = new Image();
        img.src = 'http://konvajs.github.io/assets/yoda.jpg';
        img.onload = function(){
            thisss.setState({
                image: img
            });
        }
    }
    render() {
        return (
            <Image_reactkonva
              image={this.state.image}
            />
        );
    }
}
export default class Map_Setup extends React.Component {
    constructor(props) {
        super(props);
        this.state = {
            ui: {
                canvas_style:{
                    width: 800,
                    height: 800
                },
                main_grid:{
                    part1:{
                        width: 1 / 16 * 100 + "%",
                        display: "inline-block",
                    },
                    part2:{
                        width: 10 / 16 * 100 + "%",
                        display: "inline-block",
                        position: "relative",
                        top: "0",
                        left: "0"
                    },
                    part3:{
                        width: 1 / 16 * 100 + "%",
                        display: "inline-block",
                    },
                    part4:{
                        width: 3 / 16 * 100 + "%",
                        display: "inline-block",
                    }
                }
            },
            data: {
                area: {width:50,height:50,meters_unit:1},
                ble_stations:[
                    {bd_addr:"00:1A:7D:DA:71:07",x:30,y:25,name:"raspberry pi1"},
                    {bd_addr:"00:1A:7D:DA:71:08",x:10,y:15,name:"raspberry pi2"}
                ]
            }
         }
         this.updateCanvas = this.updateCanvas.bind(this);
         this.updateDimensions = this.updateDimensions.bind(this);
    }
    componentWillMount() {
        //http: get ble_stations and setState of data.ble_stations
        //socket.io: get ble_devices and setState of data.ble_devices
    }
    componentDidMount() {
        this.updateCanvas();
        // window.addEventListener("resize", this.updateDimensions);
    }
    componentWillUnmount() {
        // window.removeEventListener("resize", this.updateDimensions);
    }
    updateCanvas() {
        // let area = this.state.data.area;
        // let ble_stations = this.state.data.ble_stations;

        // const canvas_width = this.refs.canvas.width;
        // const canvas_height = this.refs.canvas.height;
        // const ctx = this.refs.canvas.getContext('2d');
        // var img = new Image();
        // img.src = 'http://10.100.82.52:3207/ble/static/raspberry-white.png';
        // // img.src = 'static/raspberry-white.png';
        // img.onload = function(){
        //     // let img_wigth = img.width;
        //     // let img_height = img.height;
        //     // for(let i = 0; i < ble_stations.length; i++){
        //     //     let x = ble_stations[i].x/area.width*canvas_width;
        //     //     let y = ble_stations[i].y/area.height*canvas_height;
        //     //     // ctx.drawImage(img,x-img_wigth/2,y-img_height/2);//,img_wigth/canvas_style_init.width*canvas_width,img_height/canvas_style_init.height*canvas_height

        //     //     ctx.fillRect(x,y,1,1);
        //     // }
        // }
    }
    updateDimensions() {
        // const ui = {
        //         canvas_style:{
        //             width: canvas_width,
        //             height: canvas_height
        //         },
        //         main_grid: this.state.ui.main_grid,
        //         ble_devices: this.state.ble_devices,
        //     }
        // this.setState({ui: ui});
        // this.forceUpdate();
        console.log(this.state);
    }
    changeSize() {
        // this.refs.rect.to({
        //     scaleX: Math.random() + 0.8,
        //     scaleY: Math.random() + 0.8,
        //     duration: 0.2
        // });
    }
    render() {
        const div_style = {
            position: "absolute",
            top: "0",
            right: "0",
            width: "100%",
            paddingTop: "100%", /* 1:1 Aspect Ratio */
            // zIndex: "-1",
            backgroundColor: "darkgrey"
        }
        const div_style0 = {
            position: "absolute",
            top: "0",
            left: "0",
            zIndex: "0",
            backgroundColor: "darkgrey"
        }
        const div_style1 = {
            position: "absolute",
            top: "0",
            left: "0",
            zIndex: "1",
        }
        const div_style2 = {
            position: "absolute",
            top: "0",
            left: "0",
            zIndex: "2"
        }
        const canvas_style = {
            position: "absolute",
            top: "0",
            left: "0",
            right: "0",
            bottom: "0",
            zIndex: "0",
            width: "100%",
            height: "100%"}
        const ss100 = {display:"block"}

        return (
            <div style={ss100}>
                <div style={this.state.ui.main_grid.part1}></div>
                <div style={this.state.ui.main_grid.part2}>
                    <Stage width={this.state.ui.canvas_style.width} height={this.state.ui.canvas_style.height} style={div_style0}>
                        <Layer style={div_style0}>
                            <MyImage/>
                            <Group style={div_style2}>
                                <Rect
                                    ref="rect"
                                    width="50"
                                    height="50"
                                    fill="green"
                                    draggable="true"
                                    onDragEnd={this.changeSize.bind(this)}
                                    onDragStart={this.changeSize.bind(this)}
                                />
                            </Group>
                        </Layer>
                    </Stage>
                    {/*<div ref='container' style={div_style}>
                        <canvas ref="canvas" width={} height={this.state.ui.canvas_style.height} style={canvas_style}></canvas>
                    </div>*/}
                </div>
                <div style={this.state.ui.main_grid.part3}></div>
                <div style={this.state.ui.main_grid.part4}>
                    <span>test</span>
                    <Image_semantic src='http://semantic-ui.com/images/wireframe/media-paragraph.png' />
                </div>
            </div>
        )
    }
}