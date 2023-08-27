import React from 'react';

const LanguageDropdown = ({ selectedLanguage, onLanguageChange }) => {
    const handleLanguageChange = (event) => {
        onLanguageChange(event.target.value);
    };

    return (
        <div id="language-dropdown">
            <label htmlFor="select-language">Select Language:</label>
            <select id="select-language" value={selectedLanguage} onChange={handleLanguageChange}>
                <option value="English">English</option>
                <option value="Hindi">Hindi</option>
                <option value="Turkish">Turkish</option>
                <option value="Arabic">Arabic</option>
                <option value="French">French</option>
                <option value="Spanish">Spanish</option>
                <option value="German">German</option>
                {/* Add more language options as needed */}
            </select>
        </div>
    );
};

export default LanguageDropdown;
