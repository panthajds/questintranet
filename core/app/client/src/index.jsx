import {
    BrowserRouter,
    Switch,
    Route,
    Link
} from 'react-router-dom';
import moment from 'moment'
import { render } from 'react-dom'
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
    PageHeader,
    Div
} from 'react-bootstrap';
import { LinkContainer } from 'react-router-bootstrap';
import React, { Component } from 'react';
import axios from 'axios';
import { FolderTable } from './components/tables.jsx';
import { LoginButtonModal, FlushDeviceViewModal, AddUserButtonModal } from './components/modals.jsx';
import { LogoutButton } from './components/buttons.jsx';
import { LoveCounter } from './components/counter.jsx';
import { ReactComponent as Droplet2 } from './components/icon/droplet.svg';
import { Droplet, Logo } from './components/svgs.jsx';
// import {Droplet} from './components/icon/Droplet.js'
// import {AdminPanel} from './components/adminpanel.jsx';
// import {Wifi} from './components/icon/Wifi.js'
import { views, buttons, messages, modals } from './language.jsx';
// import Icon from "./components/icon/TelephoneIcon.js";

// Shortcut for empty Div of size 10
function Spacer10() {
    return <div id="spacer-10">

    </div>
}
//

class TopBar extends Component {
    constructor(props) {
        super(props);
    }

    render() {
        return <Row>
            <Spacer10/>
                <Col xs={10} md={10} lg={10}><Logo/></Col>
                {/* <Col xs={2} md={2} lg={2}><LogoutButton/></Col> */}
            </Row>
    }
}


// Main component for holding all other components
class App extends Component {
    constructor(props) {
        super(props)
    }

    componentDidMount() {
    }

    render() {
        return <Grid>
            <Row>
                <TopBar />
            </Row>
           <Row>
                <FolderTable />
            </Row>
        </Grid>
    }
}


render((
    <App />
), document.getElementById('root'));

