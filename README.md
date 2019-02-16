
# webpack-react-scratch
How to set up a React project from scratch (2019)

This repo offers a customized setup based on the [Tutorial: How to set up React, webpack, and Babel 7 from scratch (2019)
](https://www.valentinog.com/blog/react-webpack-babel/).

## Set up React, webpack, and Babel

## Setting up the project
Create a directory for the project and a minimal directory structure:

```bash
mkdir webpack-react-scratch
cd webpack-react-scratch/
mkdir -p src
```

Add a little bit of NPM magic to the project.

```bash
npm init -y
```
## Setting up webpack

**webpack** produces a bundle of your project code, when adding loaders (babel), webpack ingests raw React components for producing JavaScript code that (almost) every browser can understand .

Install webpack and webpack client. 

```bash
npm i  --save-dev webpack  webpack-cli 
```

Set up add a webpack command inside package.json:

```js
"scripts": {
  "build": "webpack --mode production"
}
```
## Setting up babel

**babel preset env** for compiling Javascript ES6 code down to ES5 (please note that babel-preset-es2015 is now deprecated)
**babel preset react** for compiling JSX and other stuff down to Javascript

```bash
npm i @babel/core babel-loader @babel/preset-env @babel/preset-react --save-dev

touch  .babelrc
touch webpack.config.js
```

Inside the babel configuration file `.babelrc` add the following `presets`.

```json
{
  "presets": ["@babel/preset-env", "@babel/preset-react"]
}
```

Add the following configuration to webpack by modifying the file `webpack.config.js` 

```js
const HtmlWebPackPlugin = require("html-webpack-plugin");

module.exports = {
  module: {
    rules: [
      {
        test: /\.(js|jsx)$/,
        exclude: /node_modules/,
        use: {
          loader: "babel-loader"
        }
      },
      {
        test: /\.html$/,
        use: [
          {
            loader: "html-loader"
          }
        ]
      }
    ]
  },
  plugins: [
    new HtmlWebPackPlugin({
      template: "./src/index.html",
      filename: "./index.html"
    })
  ]
};
```

For every file with a js or jsx extension Webpack pipes the code through babel-loader for transforming ES6 down to ES5.


## Writing React components

Install **react** , **react-dom** and  **prop-types** to start creating React components. Add the minimal folder structure for the project as following:

```bash
npm i react react-dom --save-dev
mkdir -p src/js/components/{container,presentational}
touch src/js/components/container/FormContainer.jsx
touch src/js/components/presentational/Input.jsx
npm i prop-types --save-dev
```

The content of `FormContainer.jsx` is: 

```js
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

```

The content of `Input.jsx` is: 

```js
import React from "react";
import PropTypes from "prop-types";

const Input = ({ label, text, type, id, value, handleChange }) => (
  <div className="form-group">
    <label htmlFor={label}>{text}</label>
    <input
      type={type}
      className="form-control"
      id={id}
      value={value}
      onChange={handleChange}
      required
    />
  </div>
);

Input.propTypes = {
  label: PropTypes.string.isRequired,
  text: PropTypes.string.isRequired,
  type: PropTypes.string.isRequired,
  id: PropTypes.string.isRequired,
  value: PropTypes.string.isRequired,
  handleChange: PropTypes.func.isRequired
};

export default Input;
```

## The HTML webpack plugin

To render the React Components it is necessary to configure webpack to generate an HTML page, in order to achieve this it is necessary to add **html-webpack-plugin** and **html-loader**.

```bash
npm i html-webpack-plugin html-loader --save-dev
npm i webpack-dev-server --save-dev
touch src/index.js
touch src/index.html
touch src/App.js
```

The complete webpack configuration has been already done above, there is no need to change the file at this step, but it is good to analyze it. 

The content of `index.js` is: 
```js
import React from 'react';
import ReactDOM from 'react-dom';
import App from './App';

ReactDOM.render(<App />, document.getElementById('root'));

```
The content of `index.html` is: 
```html
<!DOCTYPE html>
<html lang="en">
<head>
    <meta charset="utf-8">
    <link rel="stylesheet" href="https://maxcdn.bootstrapcdn.com/bootstrap/4.0.0-beta.2/css/bootstrap.min.css" >
    <title>How to set up React, Webpack, and Babel</title>
</head>
<body>
    <div id="root">

    </div>
</body>
</html>
```

The content of `App.js` is: 
```js
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

```

Update the `package.json` configuration file with the following scripts

```json
 "scripts": {
    "build": "webpack --mode production",
    "start": "webpack-dev-server --open --mode development",
    "test": "echo \"Error: no test specified\" && exit 1"
    }
```
Build and start your project 
```bash
npm run build
npm start
```
Open a browswer and go to the following URL
http://localhost:8080/

# Full command list
```bash
mkdir webpack-react-scratch
cd webpack-react-scratch/
mkdir -p src
npm init -y
npm i  --save-dev webpack  webpack-cli 
npm i @babel/core babel-loader @babel/preset-env @babel/preset-react --save-dev
touch  .babelrc
touch webpack.config.js
npm i react react-dom --save-dev
mkdir -p src/js/components/{container,presentational}
touch src/js/components/container/FormContainer.jsx
touch src/js/components/presentational/Input.jsx
npm i prop-types --save-dev
touch src/index.js
touch src/App.js
touch src/index.html
npm i html-webpack-plugin html-loader --save-dev
npm run build
npm i webpack-dev-server --save-dev
npm start
```
