import React, { Component } from 'react';
import {DropdownToggle, DropdownMenu, Dropdown, DropdownItem} from 'reactstrap';

/**
 * 指令菜单
 */
class CommandMenu extends Component {
    constructor() {
        super();
        this.state = {
            dropdownOpen: false,
            dropdownItems: null
        };
    }

    toggleSample = () => {
        this.setState(prevState => ({
            dropdownOpen: !prevState.dropdownOpen
        }));
    }

    componentWillMount() {
        let items = this.props.commandList.map((command, index) =>
        <DropdownItem key={index} onClick={this.onSelected.bind(this, index)}>
            {command.label}
        </DropdownItem>
        );

        this.setState({
          dropdownItems: items
        });
    } 

    onSelected(index, evt) {
        if(this.props.onSelected) {
            this.props.onSelected(this.props.commandList[index].code);
        }
    }

    componentDidMount() {

    }

    render() {
        return (
          <Dropdown isOpen={this.state.dropdownOpen} toggle={this.toggleSample}>
            <DropdownToggle caret>
              {this.props.label}
            </DropdownToggle>
            <DropdownMenu>
              {this.state.dropdownItems}
            </DropdownMenu>
          </Dropdown>
        );
    
    }
}

export default CommandMenu;