import React from 'react';
import { Grid, Table, Menu, Icon, List, Rail, Segment } from 'semantic-ui-react'
import io from 'socket.io-client';
// var socket = io('http://localhost:3000');
var socket = io('http://10.100.82.52:3000');
export default class BLE_List extends React.Component {
    constructor(props) {
        super(props);
        this.state = {
            data:{
                ble_station: { s_bd_addr: '' },
                ble_devices: []
            }
        }
    }
    componentDidMount() {
        let this_component = this;
        socket.on('ble_devices', function (ble_devices) {
            console.log(ble_devices)
            this_component.socketHandler(ble_devices);
        });
    }
    socketHandler(ble_devices){
        let data = {
            ble_station: { s_bd_addr: ble_devices[0].s_bd_addr} ,
            ble_devices: ble_devices[0].bles
        }
        this.setState({data: data});
    }
    componentWillUnmount() {
        socket.removeListener('ble_devices');
    }
    render() {
        const color = 'orange';
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
                        ble_list_row[j] = <Grid.Column key={'row' + i + 'col'+j}>
                                            <Segment>
                                            <List>
                                            <List.Item>
                                            <List.Icon name='bluetooth alternative' size='large' verticalAlign='middle' />
                                            <List.Content>
                                                <List.Header as='a'>{ble_devices[i + j].bd_addr + '  [' + ble_devices[i + j].addr_type + ']'}</List.Header>
                                                <List.Description>{ble_devices[i + j].company + '   ' + ble_devices[i + j].type + '   ' + ble_devices[i + j].name}</List.Description>
                                                <List.Description as='a'><List.Icon name='feed' size='small' />{'tx: ' + ble_devices[i + j].tx_power + ', rssi: '+ ble_devices[i + j].rssi}</List.Description>
                                                <List.Description as='a'>{ble_devices[i + j].datetime}</List.Description>
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
                    <Grid.Row>
                        <Grid.Column width={2}>
                        </Grid.Column>
                        <Grid.Column width={12}>
                            <Segment inverted color='blue' secondary>
                            ble station: {this.state.data.ble_station.s_bd_addr}
                            </Segment>
                        </Grid.Column>
                        <Grid.Column width={2}>
                        </Grid.Column>
                    </Grid.Row>
                    {ble_list}
                </Grid>
            </div>
        )
    }
}