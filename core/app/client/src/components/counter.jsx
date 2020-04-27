import moment from 'moment'
import Datetime from 'react-datetime'
import Select from 'react-select';
import {
    Col,
    Checkbox,
    Alert,
    Collapse,
    ControlLabel,
    FormGroup,
    FormControl,
    Button,
    Modal,
    Form
} from 'react-bootstrap';
import axios from 'axios'
import React, { Component } from 'react'
import TimePicker from 'rc-time-picker'
import { modals } from '../language.jsx'
import { ActuationTable, MaintenanceTable, FlushTable } from './tables.jsx';

export class LoveCounter extends Component {
    constructor(props) {
        super(props);

        this.state = {
            showModal: false,
            alert: false,
            alertMessage: "",
            name: "",
            love : 0
        };
        this.close = this.close.bind(this);
        this.open = this.open.bind(this);
    }
    close() {
        this.setState({
            showModal: false
        });
    }

    getLove(){
        axios.get('/love/')
            .then(res => {
                const data = res.data.data;
                this.setState({love: data.love});
            })
            .catch(function (error) {
                console.log(error);
            });
    }


    componentWillMount(){
        this.getLove();
      }

    componentDidMount() {
        let self = this;
        window.setInterval(function () {
            this.getLove();
          }.bind(this), 1000);
    }
    

    // Load necessary items when opened
    open() {
        this.setState({ showModal: true });
    }

    createButton() {
        return <Button
            id="blue-button"
            bsStyle="primary"
            bsSize="large"
            onClick={this.open}
        >
            Latch
        </Button>
    }

    render() {
        return(
            <div>
              <span className="love-count">Hydraze has this much love: {this.state.love}</span>
            </div>
          )
    }
}