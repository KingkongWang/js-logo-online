import React, { Component } from 'react';
import {DropdownToggle, DropdownMenu, Dropdown, DropdownItem} from 'reactstrap';
import {Samples} from '../logo/Sample';

/**
 * 范例面板 
 */
class SamplePanel extends Component {
    constructor() {
        super();
        let sampleItems = Samples.map((sample, index) =>
            <DropdownItem key={index} onClick={this.onSelected.bind(this, index)}>
                {sample.desc}
            </DropdownItem>
        );

        this.state = {
            dropdownOpen: false,
            dropdownItems: sampleItems
        };
    }

    toggleSample = () => {
        this.setState(prevState => ({
            dropdownOpen: !prevState.dropdownOpen
        }));
    }

    onSelected(index, evt) {
        if(this.props.onSelected) {
            this.props.onSelected(Samples[index].code);
        }
    }

    componentDidMount() {

    }

    render() {
        return (
            <Dropdown isOpen={this.state.dropdownOpen} toggle={this.toggleSample}>
            <DropdownToggle caret>
              范例
            </DropdownToggle>
            <DropdownMenu>
              {this.state.dropdownItems}
            </DropdownMenu>
          </Dropdown>
        );
    
    }
}

export default SamplePanel;