import React from "react";
import {DropdownToggle, DropdownMenu, Dropdown, DropdownItem} from "reactstrap";
import PropTypes from "prop-types";



/**
 * 指令菜单
 */
class CommandMenu extends React.PureComponent {
    
	constructor() {
		super();
		this.state = {
			dropdownOpen: false,
		};
	}

	toggle = () => {
		// 需要更新下拉框状态
		this.setState(prevState => ({
			dropdownOpen: !prevState.dropdownOpen
		}));
	}


	// eslint-disable-next-line no-unused-vars
	onSelected(index, evt) {
		if(this.props.onSelected) {
			this.props.onSelected(this.props.items[index].code);
		}
	}

	renderList() {
		const {items} = this.props;
		const dropdownItems = items.map((command, index) =>
			<DropdownItem key={index} onClick={this.onSelected.bind(this, index)}>
				{command.label}
			</DropdownItem>
		);
		return dropdownItems;
	}

	render() {
		return (
			<Dropdown isOpen={this.state.dropdownOpen} toggle={this.toggle}>
				<DropdownToggle caret>
					{this.props.label}
				</DropdownToggle>
				<DropdownMenu>
					{this.renderList()}
				</DropdownMenu>
			</Dropdown>
		);
		
	}
}


CommandMenu.propTypes = {
	label: PropTypes.string.isRequired,
	items: PropTypes.array,
	onSelected: PropTypes.func,
};


CommandMenu.defaultProps = {
	// label: 'test',
	items: [],
	// onSelected: null
};


export default CommandMenu;