import {
    Col,
    Row,
    Grid,
    Button,
    Image
} from 'react-bootstrap';
import axios from 'axios'
import React, { Component } from 'react'
import { buttons } from '../language.jsx'

import heart from '../../dist/assets/images/heart.gif'

// import {DayPickButtonGroup} from "./button_groups.jsx";
function Spacer10() {
    return <div id="spacer-10">

    </div>
}

export class LogoutButton extends React.Component {
    constructor(props) {
        super(props);
        this.state = { isToggleOn: true };

        // This binding is necessary to make `this` work in the callback
        this.handleClick = this.handleClick.bind(this);
    }

    handleClick() {
        this.setState(state => ({
            isToggleOn: !state.isToggleOn
        }));
        axios.post('/logout', {
        }).then(function (response) {
            window.location.reload(false);
        })
    }

    render() {
        return (
            <Button
                id="blue-button"
                bsStyle="primary"
                bsSize="large"
                onClick={this.handleClick}>
                {buttons.logoutButton.button}
            </Button>
        );
    }
}

export class LoveButton extends React.Component {
    constructor(props) {
        super(props);
        this.state = {
            isToggleOn: true,
            gif: heart,
            love: 0
        };

        // This binding is necessary to make `this` work in the callback
        this.handleClick = this.handleClick.bind(this);
    }

    handleClick() {
        axios.post('/love/', {
        })
        this.setState({ love: 1 });

    }

    render() {
        return (
            <Grid>
                <Row>
                    <Col xs={3} md={3} lg={3}>
                        <Button
                            id="blue-button"
                            bsStyle="primary"
                            bsSize="large"
                            width={10}
                            onClick={this.handleClick}>
                            {buttons.loveButton.button}
                        </Button>
                    </Col>
                    <Col xs={3} md={3} lg={3}>
                        <Image height={50*this.state.love} width={50*this.state.love} src={this.state.gif} />
                    </Col>
                </Row>
            </Grid>
        );
    }
}