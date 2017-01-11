import React from 'react';
import { Grid, Image as Image_semantic, List } from 'semantic-ui-react';
import io from 'socket.io-client';
// var socket = io('http://localhost:3000');
var socket = io('http://10.100.82.52:3000');
class Ble_Device extends React.Component {
    constructor(props) {
        super(props);
    }
    render() {
        return (
            <div className='sk-double-bounce' style={this.props.quality}>
                <div className='sk-child sk-double-bounce1' style={this.props.color}></div>
            </div>
        )
    }
}
class Ble_Devices extends React.Component {
    constructor(props) {
        super(props);//ble_devices:[]//type1 {bd_addr:'',color:'',distance:[{pos:'',size:''}]}, type2 {bd_addr:'',color:'',locations:[{x:x,y:y},...]}
    }
    render() {
        let ble_devices_ui = this.props.ble_devices;
        let ble_devices;
        let compoment_key = 0;
        if(ble_devices_ui.length != 0)
        {
            ble_devices = [];
            for(let i = 0; i < ble_devices_ui.length; i++){
                if(ble_devices_ui[i].distance.length!=0){
                    for(let j = 0; j < ble_devices_ui[i].distance.length; j++){
                        const quality = {top:ble_devices_ui[i].distance[j].pos.top,left:ble_devices_ui[i].distance[j].pos.left, width:ble_devices_ui[i].distance[j].size.width,height:ble_devices_ui[i].distance[j].size.height};
                        const color = {backgroundColor:ble_devices_ui[i].color};
                        ble_devices.push(<Ble_Device key={compoment_key} quality={quality} color={color}/>);
                        compoment_key++;
                    }
                }
                if(ble_devices_ui[i].locations.length!=0){
                    //undefined
                }
            }
        }
        return (
            <div>
            {ble_devices}
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
                ble_devices:[]//type1 {bd_addr:'',color:'',distance:[{pos:'',size:''}],locations:[]}, type2 {bd_addr:'',color:'',distances:[],locations:[{x:x,y:y},...]}, type3 {bd_addr:'',color:'',distances:[],locations:[]}
            },
            data: {
                area: {width:50,height:50,meters_unit:1},
                ble_stations:[
                    {bd_addr:'00:1A:7D:DA:71:07',name:'raspberry pi1',x:30,y:25},
                    // {bd_addr:'00:1A:7D:DA:71:08',name:'raspberry pi2',x:10,y:15}
                ],//ble station object => {bd_addr:'',name:'',x,y}
                ble_devices:[
                    {bd_addr:'bd_addr1', addr_type:'', type:'', company:'', name:'', ble_stations:[], distance:[{s_bd_addr:'00:1A:7D:DA:71:07',distance:4}], locations:[]},
                    {bd_addr:'bd_addr2', addr_type:'', type:'', company:'', name:'', ble_stations:[], distance:[{s_bd_addr:'00:1A:7D:DA:71:07',distance:10}], locations:[]}
                ],//ble device location object => type1 {bd_addr:'',distance:[{s_bd_addr:'',distance:d},...],locations:[]}, type2 {bd_addr:'',distances:[],locations[{x:x,y:y},...]}, type3 {bd_addr:'',distances:[],locations:[]}
            },
            color_table: [//https://developer.mozilla.org/en-US/docs/Web/CSS/CSS_Colors/Color_picker_tool
                'rgba(191,63,63,0.5)',
                'rgba(191,106,63,0.5)',
                'rgba(191,148,63,0.5)',
                'rgba(191,191,63,0.5)',
                'rgba(129,191,63,0.5)',
                'rgba(80,191,63,0.5)',
                'rgba(63,191,106,0.5)',
                'rgba(63,180,191,0.5)',
                'rgba(63,129,191,0.5)',
                'rgba(63,72,191,0.5)',
                'rgba(114,63,191,0.5)',
                'rgba(176,63,191,0.5)',
                'rgba(191,63,121,0.5)'
            ]
         }
        //  this.bleLocationHandler = this.bleLocationHandler.bind(this);
         this.updateCanvas = this.updateCanvas.bind(this);
         this.updateDimensions = this.updateDimensions.bind(this);
    }
    componentWillMount() {
        // console.log('WillMount');
        //http: get ble_stations and setState of data.ble_stations
        //socket.io: get ble_devices and setState of data.ble_devices
    }
    componentDidMount() {
        // console.log('DidMount');
        let this_component = this;
        // socket.emit('chat message', 'hi')
        socket.on('ble_locator', function (ble_devices) {
             this_component.socketHandler(ble_devices);
        });
        this.updateCanvas();
        // window.addEventListener('resize', this.updateDimensions);
    }
    socketHandler(ble_devices){
        // console.log(ble_devices);
        const data = this.state.data;
        data.ble_devices = ble_devices;
        let ui = this.bleLocationHandler(ble_devices);
        // console.log('ui')
        // console.warn(ui);
        // console.log('data');
        // console.error(data);
        this.setState({ui:ui, data: data});
        // socket.emit('chat message', { my: 'data' });
    }
    componentWillUnmount() {
        // console.log('WillUnmont');
        socket.removeListener('ble_locator');
        // window.removeEventListener('resize', this.updateDimensions);
    }
    componentDidUpdate(){
        // this.bleLocationHandler();
    }
    bleLocationHandler(ble_devices_data){
        let color_table = this.state.color_table;
        let area = this.state.data.area;
        let ble_statsions_data = this.state.data.ble_stations;
        // let ble_devices_data = this.state.data.ble_devices;
        let ble_devices_ui = [];
        let count_color_table = 0;
        for(let i = 0; i < ble_devices_data.length; i++){
            if(ble_devices_data[i].distance.length!=0){//type1
                let Is_ble_devices_bd_addr_Existed = false;
                for(let j = 0; j < ble_devices_data[i].distance.length; j++){
                    for(let k = 0; k < ble_statsions_data.length; k++){
                        if(ble_devices_data[i].distance[j].s_bd_addr == ble_statsions_data[k].bd_addr){
                            if((ble_devices_data[i].distance[j].distance!='')&&(ble_devices_data[i].distance[j].distance<area.width)){
                                let width_size = ble_devices_data[i].distance[j].distance/area.meters_unit/area.width*100;
                                let height_size = ble_devices_data[i].distance[j].distance/area.meters_unit/area.height*100;
                                let x_pos = ble_statsions_data[k].x/area.width*100 - width_size/2;
                                let y_pos = ble_statsions_data[k].y/area.height*100 - height_size/2;
                                let ble_devices_ui_distance = {
                                    pos: { left: x_pos + '%', top: y_pos + '%' },
                                    size: { width: width_size + '%', height: height_size + '%' }
                                };
                                if(Is_ble_devices_bd_addr_Existed){
                                    ble_devices_ui[ble_devices_ui.length].distance.push(ble_devices_ui_distance);
                                }
                                else{
                                    ble_devices_ui[ble_devices_ui.length] = {
                                        bd_addr: ble_devices_data[i].bd_addr,
                                        color: color_table[count_color_table],
                                        distance: [ble_devices_ui_distance],
                                        locations: []
                                    }
                                    count_color_table++;
                                    if(count_color_table == color_table.length){
                                        count_color_table = 0;
                                    }
                                    Is_ble_devices_bd_addr_Existed = true;
                                }
                            }
                        }
                    }
                }
            }
            if(ble_devices_data[i].locations.length!=0){//type2
                //undefined
            }
        }
        const ui = this.state.ui;
        ui.ble_devices = ble_devices_ui;
        return ui;
    }
    updateCanvas() {
        let this_component = this;
        let area = this.state.data.area;
        let ble_stations = this.state.data.ble_stations;

        const canvas_width = this.refs.canvas.width;
        const canvas_height = this.refs.canvas.height;
        const ctx = this.refs.canvas.getContext('2d');
        var img = new window.Image();
        // img.src = 'http://10.100.82.52:3207/ble/static/raspberry-white.png';
        img.src = 'http://10.100.82.52:3000/assets/raspberry-white.png';
        // img.src = 'http://localhost:3000/assets/raspberry-white.png';
        // img.src = 'static/raspberry-white.png';
        img.onload = function(){
            let img_wigth = img.width;
            let img_height = img.height;
            for(let i = 0; i < ble_stations.length; i++){
                let x = ble_stations[i].x/area.width*canvas_width;
                let y = ble_stations[i].y/area.height*canvas_height;
                ctx.drawImage(img,x-img_wigth/2,y-img_height/2);//,img_wigth/canvas_style_init.width*canvas_width,img_height/canvas_style_init.height*canvas_height
                // ctx.fillRect(x,y,1,1);
            }
            let ui = this_component.bleLocationHandler(this_component);
            this_component.setState({ui: ui});
        }
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
        // console.log(this.state);
    }
    render() {
        const div_style = {
            position: 'absolute',
            top: '0',
            right: '0',
            width: '100%',
            paddingTop: '100%', /* 1:1 Aspect Ratio */
            // zIndex: '-1',
            backgroundColor: '#ADD8E6'}
        const canvas_style = {
            position: 'absolute',
            top: '0',
            left: '0',
            right: '0',
            bottom: '0',
            zIndex: '0',
            width: '100%',
            height: '100%'}
        const list_style = {
            position: 'absolute',
            width: '20%',
            height: '87%',
            overflowY: 'scroll'}
        const ss100 = {display:'block'}

        let ble_devices_list = null;
        let ble_devices = this.state.data.ble_devices;
        let key_ble_devices_list = 0;
        let key_ble_devices_stations = 0;
        if(ble_devices.length!=0){
            ble_devices_list = [];
            for(let i = 0; i < ble_devices.length; i++){
                let ble_devices_stations = null;
                if(ble_devices[i].ble_stations.length!=0){
                    ble_devices_stations = [];
                    for(let j = 0; j < ble_devices[i].ble_stations.length; j++){
                        ble_devices_stations.push(
                            <List.Description as='a' key={'stations' + key_ble_devices_stations + '0'}><List.Icon name='feed' size='small' />{'tx: ' + ble_devices[i].ble_stations[j].tx_power + ', rssi: '+ ble_devices[i].ble_stations[j].rssi}</List.Description>
                            ,<List.Description as='a' key={'stations' + key_ble_devices_stations + '1'}>{ble_devices[i].ble_stations[j].datetime}</List.Description>
                        );
                        key_ble_devices_stations++;
                    }
                }
                ble_devices_list.push(<List.Item key={key_ble_devices_list}>
                                        <List.Icon name='bluetooth alternative' size='large' verticalAlign='middle' />
                                        <List.Content>
                                            <List.Header as='a'>{ble_devices[i].bd_addr + '  [' + ble_devices[i].addr_type + ']'}</List.Header>
                                            <List.Description as='a'>{ble_devices[i].company + '   ' + ble_devices[i].type + '   ' + ble_devices[i].name}</List.Description>
                                            {ble_devices_stations}
                                        </List.Content>
                                      </List.Item>);
                key_ble_devices_list++;
            }
        }
        return (
            <div style={ss100}>
                <div style={this.state.ui.main_grid.part1}></div>
                <div style={this.state.ui.main_grid.part2}>
                    <div style={div_style}>
                        <canvas ref='canvas' width={this.state.ui.canvas_style.width} height={this.state.ui.canvas_style.height} style={canvas_style}></canvas>
                        <Ble_Devices ble_devices={this.state.ui.ble_devices} />
                    </div>
                </div>
                <div style={this.state.ui.main_grid.part3}></div>
                <div style={this.state.ui.main_grid.part4}>
                    {/*<span>test</span> <Image_semantic src='http://semantic-ui.com/images/wireframe/media-paragraph.png' />*/}
                    <div style={list_style}>
                        <List divided relaxed>
                            {ble_devices_list}
                        </List>
                    </div>
                </div>
            </div>
        )
    }
}