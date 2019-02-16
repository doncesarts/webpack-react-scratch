import React, { Component } from "react";
import ReactDOM from "react-dom";
import Input from "../presentational/Input.jsx";
class FormContainer extends Component {
  constructor() {
    super();
    this.state = {
      entryTitle: ""
    };
    this.handleChange = this.handleChange.bind(this);
  }
  handleChange(event) {
    this.setState({ [event.target.id]: event.target.value });
  }
  render() {
    const { entryTitle: entryTitle } = this.state;
    return (
      <form id="article-form">
        <Input
          text="New Entry Title"
          label="entryTitle"
          type="text"
          id="entryTitle"
          value={entryTitle}
          handleChange={this.handleChange}
        />
      </form>
    );
  }
}
export default FormContainer;
