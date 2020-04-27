import {
    Navbar,
    Nav,
    Grid,
    Checkbox,
    Table,
    Panel,
    Label,
    ButtonToolbar,
    Glyphicon,
    InputGroup,
    Pagination,
    Row,
    Col,
    Alert,
    Collapse,
    ControlLabel,
    NavDropdown,
    MenuItem,
    FormGroup,
    FormControl,
    Button,
    Modal,
    Form,
    PageHeader
} from 'react-bootstrap';
import React, { Component } from "react";
import axios from "axios";
import { DeleteModal, LatchDeviceViewModal, FlushDeviceViewModal } from "./modals.jsx"


export class StallTable extends Component {
    constructor(props) {
        super(props)
        this.handlePage = this.handlePage.bind(this);
        this.elementTable = this.elementTable.bind(this);
        this.handleCheckBox = this.handleCheckBox.bind(this);
        this.state = {
            shouldUpdate: this.props.shouldUpdate,
            elements: [],
            activePage: 1,
            searchTerm: '',
            pages: 1
        }
    }

    componentDidMount() {
        let self = this;
        self.getElements();

    }

    capitalizeFirstLetter(string) {
        return string.charAt(0).toUpperCase() + string.slice(1);
    }

    getElements() {
        let self = this;
        axios.get('/stalls')
            .then(res => {
                const data = res.data.data.stalls;
                this.setState({ elements: data, shouldUpdate: true });
            })
            .catch(function (error) {
                console.log(error);
            });


    }

    componentWillReceiveProps(newProps) {
        let self = this;
        // this.setState({groupKey: newProps.groupKey, searchTerm: newProps.searchTerm}, function () {
        //     self.getTasks();
        // })
    }

    createList(elems) {
        return elems.map(stall => (
            <tr key={stall.id}>
                <td> {stall.name}</td>
                <td> {stall.version}</td>
                <td> {stall.status}</td>
                <td> <FlushDeviceViewModal flush={stall.flush} /></td>
                <td> <LatchDeviceViewModal latch={stall.latch} /></td>
            </tr>
        ))
    }

    handlePage(eventKey) {
        this.setState({
            activePage: eventKey,
        }, function () {
            this.getElements()
        });

    }

    handleCheckBox(event) {
        this.setState({ [event.target.name]: event.target.checked }, function () {
            this.getElements()
        });
    }

    pagination() {
        if (this.state.pages > 1) {

            return <Pagination
                prev
                next
                ellipsis
                boundaryLinks
                items={this.state.pages}
                maxButtons={4}
                activePage={this.state.activePage}
                onSelect={this.handlePage} />
        }

    }

    tableHeader() {
        return <tr>
            <th>Stall ID</th>
            <th>Type</th>
            <th>Status</th>
            <th>Flush Device</th>
            <th>Latch Device</th>
        </tr>
    }

    elementTable() {
        if (this.createList(this.state.elements).length <= 0)
            return <h4>No results, try changing your filters.</h4>
        else
            return <Table>
                <thead>
                    {this.tableHeader()}
                </thead>
                <tbody>
                    {
                        this.createList(this.state.elements)
                    }
                </tbody>
            </Table>
        {
            this.pagination()
        }
    }

    render() {
        return <div>
            {this.elementTable()}
        </div>
    }

}

export class ActuationTable extends Component {
    constructor(props) {
        super(props)
        this.elementTable = this.elementTable.bind(this);
        this.state = {
            shouldUpdate: this.props.shouldUpdate,
            elements: [],
            activePage: 1,
            searchTerm: '',
            pages: 1
        }
    }

    componentDidMount() {
        let self = this;
        // self.getElements();
        // console.log(this.props.actuations);
    }

    capitalizeFirstLetter(string) {
        return string.charAt(0).toUpperCase() + string.slice(1);
    }


    componentWillReceiveProps(newProps) {
        let self = this;
        // this.setState({groupKey: newProps.groupKey, searchTerm: newProps.searchTerm}, function () {
        //     self.getTasks();
        // })
    }

    createList(elems) {
        return elems.map(actuation => (
            <tr key={actuation.id}>
                <td> {actuation.time}</td>
                <td> {actuation.close}</td>
                <td> {actuation.method}</td>
            </tr>
        ))
    }


    pagination() {
        if (this.state.pages > 1) {

            return <Pagination
                prev
                next
                ellipsis
                boundaryLinks
                items={this.state.pages}
                maxButtons={4}
                activePage={this.state.activePage}
                onSelect={this.handlePage} />
        }

    }

    tableHeader() {
        return <tr>
            <th>Time</th>
            <th>Closed</th>
            <th>Method</th>
        </tr>
    }

    elementTable() {
        if (this.createList(this.props.actuations).length <= 0)
            return <h4>No results, try changing your filters.</h4>
        else
            return <Table>
                <thead>
                    {this.tableHeader()}
                </thead>
                <tbody>
                    {
                        this.createList(this.props.actuations)
                    }
                </tbody>
            </Table>
        {
            this.pagination()
        }
    }

    render() {
        return <Grid>
            <Row>
                <Col xs={12}>
                    {this.elementTable()}
                </Col>
            </Row>
        </Grid>
    }

}

export class FlushTable extends Component {
    constructor(props) {
        super(props)
        this.elementTable = this.elementTable.bind(this);
        this.state = {
            shouldUpdate: this.props.shouldUpdate,
            elements: [],
            activePage: 1,
            searchTerm: '',
            pages: 1
        }
    }

    componentDidMount() {
        let self = this;
        // self.getElements();
        // console.log(this.props.actuations);
    }

    capitalizeFirstLetter(string) {
        return string.charAt(0).toUpperCase() + string.slice(1);
    }


    componentWillReceiveProps(newProps) {
        let self = this;
        // this.setState({groupKey: newProps.groupKey, searchTerm: newProps.searchTerm}, function () {
        //     self.getTasks();
        // })
    }

    createList(elems) {
        return elems.map(flush => (
            <tr key={flush.id}>
                <td> {flush.time}</td>
                <td> {flush.volume}</td>
                <td> {flush.method}</td>
            </tr>
        ))
    }


    pagination() {
        if (this.state.pages > 1) {

            return <Pagination
                prev
                next
                ellipsis
                boundaryLinks
                items={this.state.pages}
                maxButtons={4}
                activePage={this.state.activePage}
                onSelect={this.handlePage} />
        }

    }

    tableHeader() {
        return <tr>
            <th>Time</th>
            <th>Volume</th>
            <th>Method</th>
        </tr>
    }

    elementTable() {
        if (this.createList(this.props.flushes).length <= 0)
            return <h4>No results, try changing your filters.</h4>
        else
            return <Table>
                <thead>
                    {this.tableHeader()}
                </thead>
                <tbody>
                    {
                        this.createList(this.props.flushes)
                    }
                </tbody>
            </Table>
        {
            this.pagination()
        }
    }

    render() {
        return <Grid>
            <Row>
                <Col xs={12}>
                    {this.elementTable()}
                </Col>
            </Row>
        </Grid>
    }

}

export class MaintenanceTable extends Component {
    constructor(props) {
        super(props)
        this.elementTable = this.elementTable.bind(this);
        this.state = {
            shouldUpdate: this.props.shouldUpdate,
            elements: [],
            activePage: 1,
            searchTerm: '',
            pages: 1
        }
    }

    componentDidMount() {
        let self = this;
        // self.getElements();
        console.log(this.props.maintenances);
    }

    capitalizeFirstLetter(string) {
        return string.charAt(0).toUpperCase() + string.slice(1);
    }


    componentWillReceiveProps(newProps) {
        let self = this;
        // this.setState({groupKey: newProps.groupKey, searchTerm: newProps.searchTerm}, function () {
        //     self.getTasks();
        // })
    }

    createList(elems) {
        return elems.map(maintenance => (
            <tr key={maintenance.id}>
                <td> {maintenance.time}</td>
                <td> {maintenance.note}</td>
                <td> {maintenance.method}</td>
            </tr>
        ))
    }


    pagination() {
        if (this.state.pages > 1) {

            return <Pagination
                prev
                next
                ellipsis
                boundaryLinks
                items={this.state.pages}
                maxButtons={4}
                activePage={this.state.activePage}
                onSelect={this.handlePage} />
        }

    }

    tableHeader() {
        return <tr>
            <th>Time</th>
            <th>Notes</th>
            <th>Method</th>
        </tr>
    }

    elementTable() {
        if (this.createList(this.props.maintenances).length <= 0)
            return <h4>No results, try changing your filters.</h4>
        else
            return <Table>
                <thead>
                    {this.tableHeader()}
                </thead>
                <tbody>
                    {
                        this.createList(this.props.maintenances)
                    }
                </tbody>
            </Table>
        {
            this.pagination()
        }
    }

    render() {
        return <Grid>
            <Row>
                <Col xs={12}>
                    {this.elementTable()}
                </Col>
            </Row>
        </Grid>
    }

}
