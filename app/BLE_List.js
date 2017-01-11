import React from 'react';
import { Grid, Table, Menu, Icon, List, Rail, Segment, Button, Modal, Header, Input, Select, Search } from 'semantic-ui-react';
import config from '../config/config.js';
import axios from 'axios';
import io from 'socket.io-client';
// var socket = io('http://localhost:3000');
var socket = io('http://' + config.api.dev.host + ':' + config.api.dev.port);
export default class BLE_List extends React.Component {
    constructor(props) {
        super(props);
        this.state = {
            ui:{
                search:{
                    type: 'name',
                    processing: false,
                    keyword: ''
                },
                modal:{
                    open: false,
                    ble_device:{
                        bd_addr: '',
                        addr_type: '',
                        type: '',
                        company: '',
                        name: '',
                        user_name: ''
                    }
                }
            },
            data:{
                ble_watch_lists: [],
                ble_station: { s_bd_addr: '' },
                ble_devices: []
            }
        }
        this.searchHandler = this.searchHandler.bind(this);//****bind?
    }
    modalUserOnChangeHandler(e) {
        let modal = this.state.ui.modal;
        modal.ble_device.user_name = e.target.value;
        this.setState({ ui:{ search: this.state.ui.search, modal: modal }})
    }
    bleDeviceRegisterHandler() {
        let this_component = this;
        axios.post('http://' + config.api.dev.host + ':' + config.api.dev.port + '/ble_watch_list/edit', 
          this_component.state.ui.modal.ble_device
        )
        .then(function (response) {
          if(response.data.status == "OK"){
            this_component.syncBleWatchList();
            this_component.close();
          }
        })
        .catch(function (error) {
            this_component.close();
        });
    }
    itemOnClickHandler(type) {
        let ui = this.state.ui;
        ui.search.type = type;
        ui.search.processing = true;
        this.searchHandler();
    }
    searchHandler(){
        let ui = this.state.ui;
        ui.search.processing = false;
        console.log(this.state);
        this.setState({ ui: ui});
    }
    show(ble_device) {
        let ble_device_modal = {
            bd_addr: ble_device.bd_addr,
            addr_type: ble_device.addr_type,
            type: ble_device.type,
            company: ble_device.company,
            name: ble_device.name,
            user_name: ble_device.user_name
        }
        this.setState({ ui: { search: this.state.ui.search, modal: {open: true, ble_device: ble_device_modal }}})
    }
    close() {
        this.setState({ ui: { search: this.state.ui.search, modal: {open: false, ble_device: this.state.ui.modal.ble_device }}})
    }
    syncBleWatchList() {
        let this_component = this;
        axios.post('http://' + config.api.dev.host + ':' + config.api.dev.port + '/ble_watch_list/find', 
          {}
        )
        .then(function (response) {
          if(response.data.status == "OK"){
            let data = this_component.state.data;
            data.ble_watch_lists = response.data.message;
            this_component.setState({data: data});
          }
        })
        .catch(function (error) {
        });
    }
    componentDidMount() {
        let this_component = this;
        this.syncBleWatchList();
        socket.on('ble_devices', function (ble_devices) {
            // console.log(ble_devices)
            this_component.socketHandler(ble_devices);
        });
    }
    socketHandler(ble_devices) {
        let ble_watch_lists = this.state.data.ble_watch_lists;
        let ble_devices_join_user_name = ble_devices[0].bles;
        for(let i = 0; i < ble_devices_join_user_name.length; i++){
            ble_devices_join_user_name[i].user_name = '';
            for(let j = 0; j < ble_watch_lists.length; j ++){
                if(ble_watch_lists[j].bd_addr == ble_devices_join_user_name[i].bd_addr){
                    ble_devices_join_user_name[i].user_name = ble_watch_lists[j].user_name;
                }
            }
        }
        let data = {
            ble_watch_lists: this.state.data.ble_watch_lists,
            ble_station: { s_bd_addr: ble_devices[0].s_bd_addr} ,
            ble_devices: ble_devices_join_user_name
        }
        this.setState({data: data});
    }
    componentWillUnmount() {
        socket.removeListener('ble_devices');
    }
    render() {
        let ble_list = null;
        let ble_devices = this.state.data.ble_devices;
        let key_row_ble_list = 0;
        const col_per_row = 4;
        if(ble_devices.length!=0){
            ble_list = [];
            for(let i = 0; i < ble_devices.length; i = i + col_per_row){
                let ble_list_row = [null, null, null, null];
                for(let j = 0; j < col_per_row; j ++){
                    if(i + j < ble_devices.length){
                        let watch_list = null
                        if(ble_devices[i+j].user_name!=''){
                            watch_list = <Icon name='star' color='yellow' />
                        }
                        ble_list_row[j] = <Grid.Column key={'row' + i + 'col'+j}>
                                            <Segment onClick={this.show.bind(this,ble_devices[i+j])}>
                                            <List>
                                            <List.Item>
                                            <List.Icon name='bluetooth alternative' size='big' verticalAlign='middle' />
                                            <List.Content>
                                                <List.Header as='a'>{ble_devices[i+j].bd_addr + '  [' + ble_devices[i+j].addr_type + ']'}</List.Header>
                                                <List.Description><b>company:&nbsp;&nbsp;</b>{ble_devices[i+j].company}</List.Description>
                                                <List.Description><b>type:&nbsp;&nbsp;</b>{ble_devices[i+j].type}</List.Description>
                                                <List.Description><b>name:&nbsp;&nbsp;</b>{ble_devices[i+j].name}</List.Description>
                                                <List.Description>{watch_list}<b>user name:&nbsp;&nbsp;</b>{ble_devices[i+j].user_name}</List.Description>
                                                <List.Description as='a'><List.Icon name='feed' size='small' /><b>tx:&nbsp;&nbsp;</b>{ble_devices[i+j].tx_power},<b>&nbsp;rssi:&nbsp;&nbsp;</b>{ble_devices[i+j].rssi}</List.Description>
                                                <List.Description as='a'>{ble_devices[i+j].datetime}</List.Description>
                                            </List.Content>
                                            </List.Item>
                                            </List>
                                            </Segment>
                                        </Grid.Column>;
                    }
                }
                ble_list.push(<Grid.Row key={'row' + key_row_ble_list}>
                                <Grid.Column key={'row' + key_row_ble_list + '0'} width={2}>
                                </Grid.Column>
                                <Grid.Column key={'row' + key_row_ble_list + '1'} width={3}>
                                    {ble_list_row[0]}
                                </Grid.Column>
                                <Grid.Column key={'row' + key_row_ble_list + '2'} width={3}>
                                    {ble_list_row[1]}
                                </Grid.Column>
                                <Grid.Column key={'row' + key_row_ble_list + '3'} width={3}>
                                    {ble_list_row[2]}
                                </Grid.Column>
                                <Grid.Column key={'row' + key_row_ble_list + '4'} width={3}>
                                    {ble_list_row[3]}
                                </Grid.Column>
                                <Grid.Column key={'row' + key_row_ble_list + '5'} width={2}>
                                </Grid.Column>
                            </Grid.Row>);
                key_row_ble_list++;
            }
        }
        return (
            <div>
                <Grid>
                    <Grid.Row>{/*search bar*/}
                        <Grid.Column width={2}></Grid.Column>
                        <Grid.Column width={12}>
                            <Menu secondary size='small'>
                                <Menu.Item name='address' active={this.state.ui.search.type === 'address'} onClick={this.itemOnClickHandler.bind(this,'address')} />
                                <Menu.Item name='company' active={this.state.ui.search.type === 'company'} onClick={this.itemOnClickHandler.bind(this,'company')} />
                                <Menu.Item name='type' active={this.state.ui.search.type === 'type'} onClick={this.itemOnClickHandler.bind(this,'type')} />
                                <Menu.Item name='name' active={this.state.ui.search.type === 'name'} onClick={this.itemOnClickHandler.bind(this,'name')} />
                                <Menu.Item><Input icon='search' placeholder={'Search for ' + this.state.ui.search.type  + ' ...'} /></Menu.Item>
                                <Menu.Item active={this.state.ui.search.type === 'watch list'} onClick={this.itemOnClickHandler.bind(this,'watch list')} ><Icon name='star' color='yellow' size='large' />watch list</Menu.Item>
                                <Menu.Item position='right'><Segment secondary inverted color='teal' size='tiny'>BLE Station Address: {this.state.data.ble_station.s_bd_addr}</Segment></Menu.Item>
                            </Menu>
                        </Grid.Column>
                        <Grid.Column width={2}></Grid.Column>
                    </Grid.Row>
                    {ble_list/*ble devices block*/}
                </Grid>
                <Modal open={this.state.ui.modal.open} onClose={this.close.bind(this)}>{/*modal*/}
                    <Modal.Header>Register BLE Device</Modal.Header>
                    <Modal.Content image>
                        <Modal.Description>
                        <Header as='h3'>
                            <Header.Content>
                            Address:
                            <Header.Subheader>
                                {this.state.ui.modal.ble_device.bd_addr + '  [' + this.state.ui.modal.ble_device.addr_type + ']'}
                            </Header.Subheader>
                            </Header.Content>
                        </Header>
                        <Header as='h3'>
                            <Header.Content>
                            Company:
                            <Header.Subheader>
                                {this.state.ui.modal.ble_device.company}
                            </Header.Subheader>
                            </Header.Content>
                        </Header>
                        <Header as='h3'>
                            <Header.Content>
                            Type:
                            <Header.Subheader>
                                {this.state.ui.modal.ble_device.type}
                            </Header.Subheader>
                            </Header.Content>
                        </Header>
                        <Header as='h3'>
                            <Header.Content>
                            Name:
                            <Header.Subheader>
                                {this.state.ui.modal.ble_device.name}
                            </Header.Subheader>
                            </Header.Content>
                        </Header>
                        <Header as='h3'>
                            <Header.Content>
                            User Name:
                            <Header.Subheader>
                                <Input placeholder='' value={this.state.ui.modal.ble_device.user_name} onChange={this.modalUserOnChangeHandler.bind(this)} icon={<Icon name='star' color='yellow' />} size='small' />
                            </Header.Subheader>
                            </Header.Content>
                        </Header>
                        </Modal.Description>
                    </Modal.Content>
                    <Modal.Actions>
                        <Button positive icon='checkmark' labelPosition='right' content="Confirm" onClick={this.bleDeviceRegisterHandler.bind(this)} />
                        <Button onClick={this.close.bind(this)}>cancel</Button>
                    </Modal.Actions>
                </Modal>
            </div>
        )
    }
}