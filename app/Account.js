import React from 'react';
import { Grid, Button, Checkbox, Form, Input, Message, Radio, Select, TextArea } from 'semantic-ui-react';
export default class Account extends React.Component {
    constructor(props) {
        super(props);
        this.state = {
            formData: {}
        }
    }
    render() {
        const genders = [
        { text: 'Male', value: 'male' },
        { text: 'Female', value: 'female' },
        ]
        const products = [
            { text: 'bd_addr1', value: 'bd_addr1' },
            { text: 'bd_addr2', value: 'bd_addr2' },
        ]
        const color = 'blue';
        return (
            <div>
                <Grid>
                    <Grid.Row>
                        <Grid.Column width={4}>
                        </Grid.Column>
                        <Grid.Column width={8}>
                            <Form>
                                <Form.Input label='ID' name='id' placeholder='a-z,A-Z,0-9' />
                                <Form.Input label='Password' name='password' placeholder='a-z,A-Z,0-9' />
                                <Form.Group widths='equal'>
                                    <Form.Input label='Name' name='name' placeholder='Name' />
                                    <Form.Select label='Gender' name='gender' options={genders} placeholder='Gender' />
                                </Form.Group>
                                <Form.Input label='Email' placeholder='email@email.com' />
                                <Form.Group widths='2'>
                                    <Form.Field>
                                        <label>Plan</label>
                                        <Form.Group inline>
                                            <Form.Radio label='Male' name='gender' value='1' checked={true} />
                                            <Form.Radio label='Female' name='gender' value='2' />
                                        </Form.Group>
                                    </Form.Field>
                                </Form.Group>
                                <Form.Select label='BLE Devices' name='ble devices' options={products} placeholder='Search...' search multiple />
                                <Button basic color={color} type='submit'>Submit</Button>
                                <Message>
                                <pre>formData</pre>
                                </Message>
                            </Form>
                        </Grid.Column>
                        <Grid.Column width={4}>
                        </Grid.Column>
                    </Grid.Row>
                </Grid>
            </div>
        )
    }
}