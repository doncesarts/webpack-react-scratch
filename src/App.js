import React, { Component } from "react";
import FormContainer from "./js/components/container/FormContainer.jsx";

class App extends Component {
  render() {
    return (
        <div className="container">
        <div className="row mt-5">
            <div className="col-md-4 offset-md-1">
                <p>Create a new article</p>
                <div id="create-article-form">
                <FormContainer/>
                </div>
            </div>
        </div>
        </div>
    );
  }
}
export default App;
