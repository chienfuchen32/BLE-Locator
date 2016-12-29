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
class Ble_Devices extends React.Component {
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
                    height: 800
                },
                main_grid:{
                    part1:{
                        width: 1 / 16 * 100 + "%",
                        display: "inline-block",
                    },
                    part2:{
                        width: 10 / 16 * 100 + "%",
                        display: "block",
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
                },
                ble_devices:[]//type1 {bd_addr:"",color:"",distance:[{pos:"",size:""}]}, type2 {bd_addr:"",color:"",locations:[{x:x,y:y},...]}
            },
            data: {
                area: {width:50,height:50,meter_unit:1},
                ble_stations:[
                    {bd_addr:"00:1A:7D:DA:71:07",x:30,y:25,name:"raspberry pi1"}
                ],//ble station object => {bd_addr:"",name:"",x,y}
                ble_devices:[
                    {bd_addr:"123",distance:[{s_bd_addr:"00:1A:7D:DA:71:07",distance:4}],locations:[]}
                ],//ble device location object => type1 {bd_addr:"",distance:[{s_bd_addr:"",distance:d},...]}, type2 {bd_addr:"",locations[{x:x,y:y},...]}
            }
         }
         this.bleLocationHandler = this.bleLocationHandler.bind(this);
         this.updateCanvas = this.updateCanvas.bind(this);
         this.updateDimensions = this.updateDimensions.bind(this);
    }
    componentWillMount() {
        //http: get ble_stations and setState of data.ble_stations
        //socket.io: get ble_devices and setState of data.ble_devices
    }
    componentDidMount() {
        this.updateCanvas();
        window.addEventListener("resize", this.updateDimensions);
    }
    componentWillUnmount() {
        window.removeEventListener("resize", this.updateDimensions);
    }
    bleLocationHandler(){
        let area = this.state.data.area;
        let ble_statsions_data = this.state.data.ble_stations;
        let ble_devices_data = this.state.data.ble_devices;
        let ble_devices_ui = [];
        for(let i = 0; i < ble_devices_data.length; i++){
            if(ble_devices_data[i].distance.length!=0){//type1
                let Is_ble_devices_bd_addr_Existed = false;
                for(let j = 0; j < ble_devices_data[i].distance.length; j++){
                    for(let k = 0; k < ble_statsions_data.length; k++){
                        if(ble_devices_data[i].distance[j].s_bd_addr == ble_statsions_data[k].bd_addr){
                            let ble_devices_ui_distance = {
                                pos: { left: "%", top: "%" },
                                size: { width: "%", height: "%" }
                            };
                            if(Is_ble_devices_bd_addr_Existed){
                                ble_devices_ui[ble_devices_ui.length].distance = ble_devices_ui_distance;
                            }
                            else{
                                ble_devices_ui[ble_devices_ui.length] = {
                                    bd_addr: ble_devices_data[i].bd_addr,
                                    color: "rgba(255,0,0,0.3)",
                                    distance: ble_devices_ui_distance
                                }
                                Is_ble_devices_bd_addr_Existed = true;
                            }
                        }
                    }
                }
            }
            if(ble_devices_data.locations.length!=0){//type2
                //undefined
            }
        }
        const ui = {
                canvas_style: this.state.ui.canvas_style,
                main_grid: this.state.ui.main_grid,
                ble_devices: ble_devices_ui,
            }
        // this.setState({ui: ui});
    }
    updateCanvas() {
        let area = this.state.data.area;
        let ble_stations = this.state.data.ble_stations;

        const canvas_width = this.refs.canvas.width;
        const canvas_height = this.refs.canvas.height;
        const ctx = this.refs.canvas.getContext('2d');
        var img = new Image();
        img.src = 'http://10.100.82.52:3207/ble/static/raspberry-white.png';
        img.onload = function(){
            let img_wigth = img.width;
            let img_height = img.height;
            for(let i = 0; i < ble_stations.length; i++){
                let x = ble_stations[i].x/area.width*canvas_width;
                let y = ble_stations[i].y/area.height*canvas_height;
                ctx.drawImage(img,x-img_wigth/2,y-img_height/2);//,img_wigth/canvas_style_init.width*canvas_width,img_height/canvas_style_init.height*canvas_height
                ctx.fillRect(x,y,1,1);
            }
        }
    }
    updateDimensions() {
        const ui = {
                canvas_style:{
                    width: canvas_width,
                    height: canvas_height
                },
                main_grid: this.state.ui.main_grid,
                ble_devices: this.state.ble_devices,
            }
        this.setState({ui: ui});
        // this.forceUpdate();
        console.log(this.state);
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

        const style1 = {top:"300px",left:"300px", width:"20%",height:"20%"}
        const style2 = {backgroundColor:"rgba(0,255,0,0.3)"}
        const testtt = {
            paddingTop: "1rem",
            paddingBottom: "1rem",
            verticalAlign: "top"
        }
        const ss100 = {display:"block"}
        return (
            <div style={ss100}>
                <div style={this.state.ui.main_grid.part1}></div>
                <div style={this.state.ui.main_grid.part2}>
                    <div style={div_style}>
                        <canvas ref="canvas" width={this.state.ui.canvas_style.width} height={this.state.ui.canvas_style.height} style={canvas_style}></canvas>
                        <Ble_Device style1={style1} style2={style2}/>
                    </div>
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