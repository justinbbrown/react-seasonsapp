import "./Render.css";
import React from "react";
import ReactDOM from "react-dom";
import SeasonDisplay from "./SeasonDisplay";
import Loader from "./Loader";


class MainApp extends React.Component {
  state = { lat: null, errorMessage: "" };
  componentDidMount() {
    window.navigator.geolocation.getCurrentPosition(
      position => this.setState({ lat: position.coords.latitude }), //Call setState to update state!!!
      err => this.setState({ errorMessage: err.message })
    );
  }

  renderContent () {
    //conditional rendering
    if (this.state.errorMessage && !this.state.lat) {
      return <div>Error:{this.state.errorMessage}</div>;
    }
    if (!this.state.errorMessage && this.state.lat) {
      return <SeasonDisplay lat ={this.state.lat} />
    }
    return <Loader message = "Please accept location request"  /> ;
  }

  //React requires the render () to be defined!! the render method is only for return some JSX back to the user
  render() {
    return <div className="border-red">
      {this.renderContent()}
    </div>
}
}

ReactDOM.render(<MainApp />, document.querySelector("#root"));
