import React, { Component } from 'react';
import {DropdownToggle, DropdownMenu, Dropdown, DropdownItem} from 'reactstrap';
import PropTypes from 'prop-types';



/**
 * 指令菜单
 */
class CommandMenu extends React.PureComponent {
    
    constructor() {
        super();
        this.state = {
            dropdownOpen: false,
            dropdownItems: null
        };
    }

    toggleSample = () => {
        // 需要更新下拉框状态
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
            // this.props.onSelected(this.props.commandList.get(index).code);
        }
    }

    render() {
      console.log('xxxx:' +  this.props.label);
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


CommandMenu.propTypes = {
  label: PropTypes.string.isRequired,
  commandList: PropTypes.array,
  onSelected: PropTypes.func,
};


CommandMenu.defaultProps = {
  // label: 'test',
  commandList: [],
  // onSelected: null
}


export default CommandMenu;