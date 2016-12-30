import React from 'react';
import { Grid, Table, Menu, Icon, List, Rail, Segment } from 'semantic-ui-react'
export default class BLE_List extends React.Component {
    constructor(props) {
        super(props);
        this.state = {
        }
    }
    render() {
        const color = 'orange';
        return (
            <div>
                <Grid>
                    <Grid.Row>
                        <Grid.Column width={2}>
                        </Grid.Column>
                        <Grid.Column width={3}>
                            <Grid.Column>
                                <Segment>
                                <List>
                                <List.Item>
                                <List.Icon name='bluetooth alternative' />
                                <List.Content>
                                    <List.Header as='a'>device1</List.Header>
                                    <List.Description>user1</List.Description>
                                    <List.Description>bd_addr1</List.Description>
                                    <List.Description>2016-12-29 08:24:58</List.Description>
                                </List.Content>
                                </List.Item>
                                </List>
                                </Segment>
                            </Grid.Column>
                        </Grid.Column>
                        <Grid.Column width={3}>
                            <Grid.Column>
                                <Segment>
                                <List>
                                <List.Item>
                                <List.Icon name='bluetooth alternative' />
                                <List.Content>
                                    <List.Header as='a'>device2</List.Header>
                                    <List.Description>user2</List.Description>
                                    <List.Description>bd_addr2</List.Description>
                                    <List.Description>2016-12-30 15:34:00</List.Description>
                                </List.Content>
                                </List.Item>
                                </List>
                                </Segment>
                            </Grid.Column>
                        </Grid.Column>
                        <Grid.Column width={2}>
                        </Grid.Column>
                    </Grid.Row>
                </Grid>
            </div>
        )
    }
}