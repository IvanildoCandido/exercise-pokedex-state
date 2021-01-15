import React, {Component} from 'react'
import './Button.css'

class Button extends Component {
    render() {
        return(<button onClick={this.props.clickEvent}>{this.props.type}</button>)
    }
}
export default Button