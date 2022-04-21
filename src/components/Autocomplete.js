import { AsyncTypeahead } from 'react-bootstrap-typeahead';
import 'react-bootstrap-typeahead/css/Typeahead.css';
import React, { useState} from 'react';

const SEARCH_URI = 'http://localhost:5500/namelist';

const Autocomplete = (props) => {
	const [isLoading, setIsLoading] = useState(false);
	const [options, setOptions] = useState([]);

	const handleChange = (value) => {
       if( undefined !== value[0]){
        const recipientName = value[0].name || value[0];
        props.onChange(recipientName)
       }
		
	};

	const handleSearch = (query) => {
		setIsLoading(true);

		fetch(SEARCH_URI)
			.then((resp) => resp.json())
			.then((items) => {
				const options = items.names;

				setOptions(options);
				setIsLoading(false);
			});
	};

	// Bypass client-side filtering by returning `true`. Results are already
	// filtered by the search endpoint, so no need to do it again.
	const filterBy = () => true;

	return (
		<AsyncTypeahead
			allowNew
			newSelectionPrefix="New contact: "
			onChange={(value) => handleChange(value)}
			value={props.value}
            onFocus={props.onFocus}
			filterBy={filterBy}
			id={props.id}
			name={props.name}
			isLoading={isLoading}
			labelKey="name"
			minLength={1}
			onSearch={handleSearch}
			options={options}
			renderMenuItemChildren={(option, props) => (
				<React.Fragment>{option}</React.Fragment>
			)}
		/>
	);
};

export default Autocomplete;
