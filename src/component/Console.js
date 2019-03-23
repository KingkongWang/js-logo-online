import React, { Component } from 'react';


class Console extends Component {

    componentDidMount() {

    }

    render() {
        return (
            <textarea className="footer" value={this.props.value} >
            </textarea>
        );
    
    }
}

export default Console;