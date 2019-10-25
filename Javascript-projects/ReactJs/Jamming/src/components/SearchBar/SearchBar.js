import React, { Component } from 'react';
import './SearchBar.css';


class SearchBar extends Component {
    constructor(props) {
        super(props);

        this.state = {
            term: ''
        }

        this.handleSearch = this.handleSearch.bind(this);
        this.handleKeyPress = this.handleKeyPress.bind(this)
        this.handleTermChange = this.handleTermChange.bind(this);
    }
    handleSearch() {
        this.props.onSearch(this.state.term);
    }

    handleTermChange(event) {
        this.setState({ term: event.target.value });
    }
    handleKeyPress(target) {
    if(target.charCode==13){
            this.props.onSearch(this.state.term);
    }}

    render() {
        return (
            <div className="SearchBar">
                <input placeholder="Enter A Song, Album, or Artist" onChange={this.handleTermChange} onKeyPress={this.handleKeyPress}/>
                <a onClick={this.handleSearch}>SEARCH</a>
            </div>
        );
    }
}

export default SearchBar;
