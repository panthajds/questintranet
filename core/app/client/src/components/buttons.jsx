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

// import heart from '../../dist/assets/images/heart.gif'

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

export class DownloadButton extends React.Component {
    constructor(props) {
        super(props);
        this.state = { isToggleOn: true };

        // This binding is necessary to make `this` work in the callback
        this.handleClick = this.handleClick.bind(this);
    }

    openWindow(file_name){
        window.open('http://localhost:5000/view/'+ file_name);
    }

    handleClick() {
        axios.get('/download/'+ this.props.file_id+'/'+this.props.file_name, {
        }).then(res => {
            console.log(res.data.file_name)
            this.openWindow(res.data.file_name);
        })
    }

    render() {
        return (
            <Button
                id="red-button"
                bsStyle="primary"
                bsSize="large"
                onClick={this.handleClick}>
                {buttons.downloadButton.button}
            </Button>
        );
    }
}