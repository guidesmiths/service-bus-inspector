import React from 'react';
import './Dropdown.css';

const Dropdown = ({ items = [], itemSelected, selectedNamespace }) => (
	<div style={{ minWidth: 285 }}>
		<select
			className="browser-default custom-select"
			onChange={(e) => itemSelected(e.target.value)}
		>
			{selectedNamespace ? <option>{selectedNamespace}</option> : ''}
			{selectedNamespace ? items.sort((a, b) => a.name.localeCompare(b.name))
				.filter(item => item.name !== selectedNamespace)
				.map(item => (
				<option
					key={item.name}
					value={item.value}
				>
					{item.name}
				</option>
			)) : items.sort((a, b) => a.name.localeCompare(b.name)).map(item => (
				<option
					key={item.name}
					value={item.value}
				>
					{item.name}
				</option>
			))}
		</select>
	</div>
);

export default Dropdown;
