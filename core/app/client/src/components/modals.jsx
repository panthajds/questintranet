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
import { DocumentTable, MaintenanceTable, FlushTable } from './tables.jsx';

// import {DayPickButtonGroup} from "./button_groups.jsx";
function Spacer10() {
    return <div id="spacer-10">

    </div>
}


export class FileModal extends Component {
    constructor(props) {
        super(props);

        this.state = {
            showModal: false,
            alert: false,
            alertMessage: "",
            name: "",
            latch: { serial_no: 'null', status: "null", delay: "null" }
        };
        this.close = this.close.bind(this);
        this.open = this.open.bind(this);
    }
    close() {
        this.setState({
            showModal: false
        });
    }

    componentDidMount() {
        let self = this;
    }

    // Load necessary items when opened
    open() {
        this.setState({ showModal: true });
    }

    createButton() {
        return <Button
            id="red-button"
            bsStyle="primary"
            bsSize="large"
            onClick={this.open}
        >
            Open
        </Button>
    }

    render() {
        return <div>
            {this.createButton()}
            <Modal show={this.state.showModal} style={{opacity:1}} onHide={this.close}
                aria-labelledby="contained-modal-title-lg">
                <Form horizontal onSubmit={this.onSubmit}>
                    <Modal.Header closeButton>
                        <Modal.Title>{this.props.folder_name}</Modal.Title>

                    </Modal.Header>
                    <Modal.Body>
                        <Spacer10 />
                        <h3>Files</h3>
                        <DocumentTable folder_id={this.props.folder_id} />
                    </Modal.Body>

                    <Modal.Footer>
                    </Modal.Footer>
                </Form>
            </Modal>
        </div>
    }
}
// Called when submit button is pressed

export class FlushDeviceViewModal extends Component {
    constructor(props) {
        super(props);

        this.state = {
            showModal: false,
            alert: false,
            alertMessage: "",
            name: "",
            flush: { serial_no: 'null', status: "null", delay: "null" }
        };
        this.close = this.close.bind(this);
        this.open = this.open.bind(this);
    }
    close() {
        this.setState({
            showModal: false
        });
    }

    componentDidMount() {
        let self = this;
       
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
            Flush
            </Button>
    }

    render() {
        return <div>
            {this.createButton()}
            <Modal show={this.state.showModal} onHide={this.close}
                aria-labelledby="contained-modal-title-lg">
                <Form horizontal onSubmit={this.onSubmit}>
                    <Modal.Header closeButton>
                        <Modal.Title>{modals.flushModal.title}</Modal.Title>

                    </Modal.Header>
                    <Modal.Body>
                        <Collapse in={this.state.alert}>
                            <div>
                                <Alert bsStyle="danger">
                                    {this.state.alertMessage}
                                </Alert>
                            </div>
                        </Collapse>
                    </Modal.Body>

                    <Modal.Footer>
                        <Button className="btn" type="submit">{modals.flushModal.button}</Button>
                    </Modal.Footer>
                </Form>
            </Modal>
        </div>
    }
}

export class AddUserButtonModal extends Component {
    constructor(props) {
        super(props);

        this.state = {
            showModal: false,
            alert: false,
            alertMessage: "",
            first_name: "",
            last_name: "",
            uid: 0,
            email: "",
            directory_id: ""
        };
        this.close = this.close.bind(this);
        this.open = this.open.bind(this);
        this.handleInputChange = this.handleInputChange.bind(this);
        this.onSubmit = this.onSubmit.bind(this);
    }

    close() {
        this.setState({
            showModal: false
        });
    }

    componentDidMount() {
        let self = this;
    }

    // Load necessary items when opened
    open() {
        this.setState({ showModal: true });
    }


    // Called when submit button is pressed
    onSubmit(e) {
        e.preventDefault()
        this.postTask(this.state.first_name, this.state.last_name, this.state.uid, this.state.email, this.state.directory_id)
    }

    // Make new task
    postTask(first_name, last_name, uid, email, directory_id) {
        let self = this;
        if (first_name === '' || last_name === '' || uid === 0 || email === '') {
            this.setState({ alert: true, alertMessage: "All fields must be completed" })
        }
        else {
            axios.post('/register', {
                first_name: first_name,
                last_name: last_name,
                uid: uid,
                email: email,
                directory_id: directory_id
            })
                .then(function (response) {
                    self.close()
                    self.setState({
                        first_name: "",
                        last_name: "",
                        uid: 0,
                        email: "",
                        directory_id: ""
                    });
                })
        }

    }


    // Handler for checkboxes
    handleInputChange(event) {
        const target = event.target;
        const value = target.type === 'checkbox' ? target.checked : target.value;
        const name = target.name;

        this.setState({
            [name]: value, alert: false
        });
    }

    // Makes button for this on the index
    createButton() {
        return <Button
            id="red-button"
            bsStyle="primary"
            bsSize="large"
            onClick={this.open}
        >
            User
        </Button>
    }

    // Renders entire modal
    render() {
        return <div>
            {this.createButton()}

            <Modal show={this.state.showModal} onHide={this.close}
                aria-labelledby="contained-modal-title-lg">
                <Form horizontal onSubmit={this.onSubmit}>
                    <Modal.Header closeButton>
                        <Modal.Title>{modals.userModal.title}</Modal.Title>

                    </Modal.Header>
                    <Modal.Body>
                        <Collapse in={this.state.alert}>
                            <div>
                                <Alert bsStyle="danger">
                                    {this.state.alertMessage}
                                </Alert>
                            </div>
                        </Collapse>
                        <FormGroup name="first_name">
                            <Col componentClass={ControlLabel} sm={2}>
                                {modals.userModal.first_name}
                            </Col>
                            <Col sm={10}>
                                <FormControl name="first_name" type="text" placeholder="First Name"
                                    value={this.state.first_name}
                                    onChange={this.handleInputChange} />
                            </Col>
                        </FormGroup>
                        <FormGroup name="last_name">
                            <Col componentClass={ControlLabel} sm={2}>
                                {modals.userModal.last_name}
                            </Col>
                            <Col sm={10}>
                                <FormControl name="last_name" type="text" placeholder="Last Name"
                                    value={this.state.last_name}
                                    onChange={this.handleInputChange} />
                            </Col>
                        </FormGroup>
                        <FormGroup name="directory_id">
                            <Col componentClass={ControlLabel} sm={2}>
                                {modals.userModal.directory_id}
                            </Col>
                            <Col sm={10}>
                                <FormControl name="directory_id" type="text" placeholder="Directory ID"
                                    value={this.state.directory_id}
                                    onChange={this.handleInputChange} />
                            </Col>
                        </FormGroup>
                        <FormGroup name="uid">
                            <Col componentClass={ControlLabel} sm={2}>
                                {modals.userModal.uid}
                            </Col>
                            <Col sm={10}>
                                <FormControl name="uid" type="integer" placeholder="123456789" value={this.state.uid}
                                    onChange={this.handleInputChange} />
                            </Col>
                        </FormGroup>
                        <FormGroup name="email">
                            <Col componentClass={ControlLabel} sm={2}>
                                {modals.userModal.email}
                            </Col>
                            <Col sm={10}>
                                <FormControl name="email" type="text" placeholder="example@umd.edu"
                                    value={this.state.email}
                                    onChange={this.handleInputChange} />
                            </Col>
                        </FormGroup>

                    </Modal.Body>

                    <Modal.Footer>
                        <Button className="btn" type="submit">{modals.userModal.button}</Button>
                    </Modal.Footer>
                </Form>
            </Modal>
        </div>

    }
}

export class LoginButtonModal extends Component {
    constructor(props) {
        super(props);

        this.state = {
            showModal: false,
            alert: false,
            alertMessage: "",
            email: "",
            password: "",
            remember: false
        };
        this.close = this.close.bind(this);
        this.open = this.open.bind(this);
        this.handleInputChange = this.handleInputChange.bind(this);
        this.onSubmit = this.onSubmit.bind(this);
    }

    close() {
        this.setState({
            showModal: false
        });
    }

    componentDidMount() {
        let self = this;
    }

    // Load necessary items when opened
    open() {
        this.setState({ showModal: true });
    }


    // Called when submit button is pressed
    onSubmit(e) {
        e.preventDefault()
        this.postTask(this.state.email, this.state.password, this.state.remember)
    }

    // Make new task
    postTask(email, password, remember) {
        let self = this;
        if (password === '' || email === '') {
            this.setState({ alert: true, alertMessage: "All fields must be completed" })
        }
        else {
            axios.post('/login', {
                email: email,
                password: password,
                remember: remember
            })
                .then(function (response) {
                    self.close()
                    self.setState({
                        password: "",
                        email: "",
                        remember: false
                    });
                })
        }

    }


    // Handler for checkboxes
    handleInputChange(event) {
        const target = event.target;
        const value = target.type === 'checkbox' ? target.checked : target.value;
        const name = target.name;

        this.setState({
            [name]: value, alert: false
        });
    }

    // Makes button for this on the index
    createButton() {
        return <Button
            id="blue-button"
            bsStyle="primary"
            bsSize="large"
            onClick={this.open}
        >
            Login
        </Button>
    }

    // Renders entire modal
    render() {
        return <div>
            {this.createButton()}

            <Modal show={this.state.showModal} onHide={this.close}
                aria-labelledby="contained-modal-title-lg">
                <Form horizontal onSubmit={this.onSubmit}>
                    <Modal.Header closeButton>
                        <Modal.Title>{modals.loginModal.title}</Modal.Title>

                    </Modal.Header>
                    <Modal.Body>
                        <Collapse in={this.state.alert}>
                            <div>
                                <Alert bsStyle="danger">
                                    {this.state.alertMessage}
                                </Alert>
                            </div>
                        </Collapse>
                        <FormGroup name="email">
                            <Col componentClass={ControlLabel} sm={2}>
                                {modals.loginModal.email}
                            </Col>
                            <Col sm={10}>
                                <FormControl name="email" type="text" placeholder="email@gmail.com"
                                    value={this.state.email}
                                    onChange={this.handleInputChange} />
                            </Col>
                        </FormGroup>
                        <FormGroup name="password">
                            <Col componentClass={ControlLabel} sm={2}>
                                {modals.loginModal.password}
                            </Col>
                            <Col sm={10}>
                                <FormControl name="password" type="text" placeholder="******"
                                    value={this.state.password}
                                    onChange={this.handleInputChange} />
                            </Col>
                        </FormGroup>
                        <FormGroup name="remember login">
                            <Col componentClass={ControlLabel} sm={2}>

                            </Col>
                            <Col sm={10}>
                                <Checkbox checked={this.state.remember} inline name='remember'
                                    onChange={this.handleInputChange}>
                                    {modals.loginModal.remember}
                                </Checkbox>
                            </Col>
                        </FormGroup>

                    </Modal.Body>

                    <Modal.Footer>
                        <Button className="btn" type="submit">{modals.loginModal.button}</Button>
                    </Modal.Footer>
                </Form>
            </Modal>
        </div>

    }
}


export class DeleteModal extends Component {
    constructor(props) {
        super(props);
        this.close = this.close.bind(this);
        this.open = this.open.bind(this);
        this.deleteTask = this.deleteTask.bind(this);
        this.state = { showModal: false };
    }

    close() {
        this.setState({ showModal: false });
    }

    deleteTask() {
        this.setState({ showModal: false });
        axios.delete('/' + this.props.type + '/' + this.props.id)

    }

    open() {
        this.setState({ showModal: true });
    }

    render() {
        return (
            <div>
                <Button
                    bsSize="large"
                    onClick={this.open}
                >
                    {modals.deleteModal.button}
                </Button>

                <Modal show={this.state.showModal} onHide={this.close}>
                    <Modal.Header closeButton>
                        <Modal.Title>{modals.deleteModal.title}</Modal.Title>
                    </Modal.Header>
                    <Modal.Body>
                        <Alert bsStyle="danger">{modals.deleteModal.text}</Alert>
                    </Modal.Body>
                    <Modal.Footer>
                        <Button onClick={this.close}>{modals.deleteModal.close}</Button>
                        <Button bsStyle='danger' onClick={this.deleteTask}>{modals.deleteModal.button}</Button>
                    </Modal.Footer>
                </Modal>
            </div>
        );
    }
}
