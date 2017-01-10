import React from 'react';
import { Grid, Image as Image_semantic, Icon, Label, Header, Button } from 'semantic-ui-react';
import { Layer, Rect, Stage, Group, Image as Image_reactkonva} from 'react-konva';

let img_staion_attr = {width:0,height:0}
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
                        width: 1 / 16 * 100 + '%',
                        display: 'inline-block',
                    },
                    part2:{
                        width: 10 / 16 * 100 + '%',
                        display: 'inline-block',
                        position: 'relative',
                        top: '0',
                        left: '0'
                    },
                    part3:{
                        width: 1 / 16 * 100 + '%',
                        display: 'inline-block',
                    },
                    part4:{
                        width: 3 / 16 * 100 + '%',
                        display: 'inline-block',
                    }
                },
                ble_stations:[]//ble stations object{bd_addr:'',name:'',x:1,y:1} location versus canvas_style width,height
            },
            data: {
                area: {width:50,height:50,meters_unit:1},
                ble_stations:[
                    {bd_addr:'00:1A:7D:DA:71:07',name:'raspberry pi1',x:30,y:25},
                    // {bd_addr:'00:1A:7D:DA:71:08',name:'raspberry pi2',x:10,y:15}
                ]
            },
            image: null
         }
         this.updateCanvas = this.updateCanvas.bind(this);
         this.updateDimensions = this.updateDimensions.bind(this);
    }
    componentWillMount() {
        //http: get ble_stations and setState of data.ble_stations
        //socket.io: get ble_devices and setState of data.ble_devices
    }
    componentDidMount() {
        let thisss = this;
        // img.src = 'static/raspberry-white.png';
        let img_staion = new window.Image();
        // img_staion.src = 'http://10.100.82.52:3207/ble/static/raspberry-white.png';
        img_staion.src = 'http://10.100.82.52:3000/assets/raspberry-white.png';
        // img_staion.src = 'http://localhost:3000/assets/raspberry-white.png';
        img_staion.onload = function(){
            // thisss.setState({
            //     image: img
            // });
            img_staion_attr.width = img_staion.width;
            img_staion_attr.height = img_staion.height;
            thisss.bleStationHandler(img_staion);
        }
        this.updateCanvas();
        // window.addEventListener('resize', this.updateDimensions);
    }
    componentWillUnmount() {
        // window.removeEventListener('resize', this.updateDimensions);
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
        // console.log(this.refs.rect)
        // this.refs.rect.to({
        //     scaleX: Math.random() + 0.8,
        //     scaleY: Math.random() + 0.8,
        //     duration: 0.2
        // });
    }
    bleStationHandler(img){
        let canvas_style = this.state.ui.canvas_style;
        let area = this.state.data.area;
        let ble_statsions_data = this.state.data.ble_stations;
        let ble_stations_ui = [];
        for(let i = 0; i < ble_statsions_data.length; i++){
            let x = ble_statsions_data[i].x/area.width*canvas_style.width - img.width/2;
            let y = ble_statsions_data[i].y/area.height*canvas_style.height - img.height/2;
            ble_stations_ui[ble_stations_ui.length] = {
                bd_addr: ble_statsions_data[i].bd_addr,
                name: ble_statsions_data[i].name,
                x: x,
                y: y
            }
        }
        const ui = {
                canvas_style: this.state.ui.canvas_style,
                main_grid: this.state.ui.main_grid,
                ble_stations: ble_stations_ui,
            }
        this.setState({ui: ui,image: img});
    }
    onDragHandler(id) {
        // console.log(this.refs[id])
        // console.log( + ',' + this.refs[id].attrs.y)
        // console.log(this.state.ui.ble_stations)
        let this_ref = this.refs[id];
        let canvas_style = this.state.ui.canvas_style;
        let area = this.state.data.area;
        let ble_stations_data = this.state.data.ble_stations;
        let ble_stations_ui = this.state.ui.ble_stations;
        for(let i = 0; i < ble_stations_data.length; i++){
            if(id == ble_stations_data[i].bd_addr){
                let x = this_ref.attrs.x;
                let y = this_ref.attrs.y;
                let ratio_x = canvas_style.width/area.width;
                let ratio_y = canvas_style.height/area.height;
                ble_stations_data[i].x = parseInt(x/canvas_style.width*area.width, 10);
                ble_stations_data[i].y = parseInt(y/canvas_style.height*area.height, 10);
                ble_stations_ui[i].x = parseInt(x/ratio_x, 10)*ratio_x;
                ble_stations_ui[i].y = parseInt(y/ratio_y, 10)*ratio_y;
            }
            if(ble_stations_data[i].x<0){ble_stations_data[i].x=0;}
            if(ble_stations_data[i].x>area.width-1){ble_stations_data[i].x=area.width-1;}
            if(ble_stations_data[i].y<0){ble_stations_data[i].y=0;}
            if(ble_stations_data[i].y>area.height-1){ble_stations_data[i].y=area.height-1;}
            if(ble_stations_ui[i].x<0){ble_stations_ui[i].x=0;}
            if(ble_stations_ui[i].x>canvas_style.width-1){ble_stations_ui[i].x=canvas_style.width-img_staion_attr.width/2;}
            if(ble_stations_ui[i].y<0){ble_stations_ui[i].y=0;}
            if(ble_stations_ui[i].y>canvas_style.height-1){ble_stations_ui[i].y=canvas_style.height-img_staion_attr.height/2;}
        }
        const ui = {
                canvas_style: this.state.ui.canvas_style,
                main_grid: this.state.ui.main_grid,
                ble_stations: ble_stations_ui,
            }
        const data = {
                area: this.state.data.area,
                ble_stations:ble_stations_data
            }
        console.log({ui: ui, data: data})
        this.setState({ui: ui, data: data});
    }
    render() {
        const div_style = {
            position: 'absolute',
            top: '0',
            right: '0',
            width: '100%',
            paddingTop: '100%', /* 1:1 Aspect Ratio */
            // zIndex: '-1',
            backgroundColor: '#ADD8E6'
        }
        const div_style21 = {
            position: 'absolute',
            top: '0',
            // right: '0',
            left: '0',
            // bottom: '0',
            zIndex: '0',
            // width: '100%',
            // paddingTop: '100%', /* 1:1 Aspect Ratio */
            backgroundColor: '#ADD8E6'
        }
        const div_style1 = {
            position: 'absolute',
            top: '0',
            left: '0',
            zIndex: '1',
        }
        const div_style22 = {
            position: 'absolute',
            top: '0',
            left: '0',
            // width: '100%',
            zIndex: '2'
        }
        const div_style4 = {
            position: 'absolute',
            // marginTop: '5px'
        }
        const canvas_style = {
            position: 'absolute',
            top: '0',
            left: '0',
            right: '0',
            bottom: '0',
            zIndex: '0',
            width: '100%',
            height: '100%'}
        const ss100 = {display:'block'}

        //img of canvas& list
        const list_style = { marginBottom: '10px', marginLeft: '0' }
        let ble_station_canvas = null;
        let ble_station_list = [];
        let ble_stations_ui = this.state.ui.ble_stations;
        let ble_stations_data = this.state.data.ble_stations;
        let key_id = 0;
        if(ble_stations_ui.length!=0){
            ble_station_canvas = [];
            for(let i = 0; i < ble_stations_ui.length; i++){
                ble_station_canvas.push(<Image_reactkonva
                                            key={'img' + key_id}
                                            ref={ble_stations_ui[i].bd_addr}
                                            draggable='true'
                                            x={ble_stations_ui[i].x}
                                            y={ble_stations_ui[i].y}
                                            image={this.state.image}
                                            onDragEnd={this.onDragHandler.bind(this,ble_stations_ui[i].bd_addr)}
                                            // onDragStart={this.onDragHandler.bind(this,ble_stations_ui[i].bd_addr)}
                                        />);
                ble_station_list.push(<Label color='blue' key={'list' + key_id} style={list_style}>
                                        <Icon name='feed' />
                                        {ble_stations_data[i].name}
                                        <Label.Detail>{ble_stations_data[i].bd_addr}</Label.Detail>
                                        <Label.Detail>{ble_stations_data[i].x.toString()}</Label.Detail>
                                        <Label.Detail>{ble_stations_data[i].y.toString()}</Label.Detail>
                                        <Label.Detail><Icon name='remove' /></Label.Detail>
                                    </Label>);
                key_id++;
            }
        }
        ble_station_list.push(<Header key={'header' + key_id} as='h4' color='blue'><Icon name='plus' />add new station</Header>);
        ble_station_list.push(<Button key={'button' + key_id} basic color='blue' type='submit'>Submit</Button>);
        return (
            <div style={ss100}>
                <div style={this.state.ui.main_grid.part1}></div>
                <div style={this.state.ui.main_grid.part2}>
                    <Stage width={this.state.ui.canvas_style.width} height={this.state.ui.canvas_style.height} style={div_style21}>
                        <Layer style={div_style21}>
                            {ble_station_canvas}
                            <Group style={div_style22}>
                                {/*<Rect
                                    ref='rect'
                                    width='50'
                                    height='50'
                                    fill='green'
                                    draggable='true'
                                    onDragEnd={this.changeSize.bind(this)}
                                    onDragStart={this.changeSize.bind(this)}
                                />*/}
                            </Group>
                        </Layer>
                    </Stage>
                    {/*<div ref='container' style={div_style}>
                        <canvas ref='canvas' width={} height={this.state.ui.canvas_style.height} style={canvas_style}></canvas>
                    </div>*/}
                </div>
                <div style={this.state.ui.main_grid.part3}></div>
                <div style={this.state.ui.main_grid.part4}>
                    <div style={div_style4}>
                        {ble_station_list}
                    </div>
                </div>
            </div>
        )
    }
}