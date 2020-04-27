import {
    Row,
    Col, 
    Image
} from 'react-bootstrap';

import axios from 'axios'
import React, { Component } from 'react'
import water from '../../dist/images/Water.jpg'

export class ReloadableGif extends Component {
    constructor(props) {
        super(props);
        this.state = {
            gif: heart,
            loaded: heart,
            love: 0
        }
        this.handleClick = this.handleClick.bind(this);
    }
    /* <iframe src="https://giphy.com/embed/LpDmM2wSt6Hm5fKJVa" width="480" height="480" frameBorder="0" class="giphy-embed" allowFullScreen></iframe><p><a href="https://giphy.com/stickers/love-heart-red-LpDmM2wSt6Hm5fKJVa">via GIPHY</a></p> */

    handleClick() {
        this.setState({ love: this.state.love + 1 });
        if(this.state.love > 0){
            this.setState({ loaded: this.state.gif })
        }
    }



    render() {
        return <div>
            <Row>
                <Col xs={12}>
                    <button onClick={this.reloadGif}>Replay Animation</button>
                    <Image height={50*this.state.love} width={50*this.state.love} src={this.state.loaded} />
                    <img src={water} />
                </Col>
            </Row>
        </div>
    }
}