import React, { Component } from 'react';
import Particles from 'react-particles-js';
import Clarifai from 'clarifai';
import './App.css';
import Navigation from './components/Navigation/Navigation';
import Logo from './components/Logo/Logo';
import ImageLinkForm from './components/ImageLinkForm/ImageLinkForm';
import Rank from './components/Rank/Rank';
import FaceRecognition from './components/FaceRecognition/FaceRecognition';
import SignIn from './components/SignIn/SignIn';
import Register from './components/Register/Register';

// this just means to importing it like the above.
// const Clarifai = require('clarifai');

const app = new Clarifai.App({
 apiKey: '1600eaf37080404690838429f4578d3a'
});

const particlesOptions = {
  particles: {
    number: {
      value: 30,
      density: {
        enable: true,
        value_area: 800
      }
    }
  }
}

class App extends Component {
  // Create a state for our app to store the value the user enters and updates it
  constructor() {
    super();
    this.state = {
      input: '',
      imageUrl: '',
      box: {},
      // route keeps track of where we are on the page
      route: 'signin',
      // start off with 'false' for testing purposes
      isSignedIn: false,
    }
  }

  calculateFaceLocation = (data) => {
    const clarifaiFace = data.outputs[0].data.regions[0].region_info.bounding_box;
    const image = document.getElementById('inputimage');
    const width = Number(image.width);
    const height = Number(image.height);
    // console.log(width, height);
    return {
      leftCol: clarifaiFace.left_col * width,
      topRow: clarifaiFace.top_row * height,
      rightCol: width - (clarifaiFace.right_col * width),
      bottomRow: height - (clarifaiFace.bottom_row * height)
    }
  }

  // FETCH your smart-brain-api - commented out bc it was just to test and learn about 'cors'
  // componentDidMount() {
  //   fetch('http://localhost:3000/')
  //     .then(response => response.json())
  //     .then(console.log); // shorthand version of logging data; long way would be: .then(data => console.log(data))
  // }

  // this function receives the calculation from calculateFaceLocation
  displayFaceBox = (box) => {
    console.log(box);
    this.setState({box: box});
  }
  
  // Create an onInputChange arrow function which listens to an event on the page; 
  // onInputChange is also a prop of App
  onInputChange = (event) => {
    this.setState({input: event.target.value});
  }

  onButtonSubmit = () => {
    this.setState({imageUrl: this.state.input});
    app.models
      .predict(
        Clarifai.FACE_DETECT_MODEL, 
        this.state.input)
      .then(response => this.displayFaceBox(this.calculateFaceLocation(response)))
      .catch(err => console.log(err));
  }

  // redirects user to route: 'signin' after signing in; this way when "signout" is clicked from the <Navigation /> component, it will still work and redirect to 'signin' page
  onRouteChange = (route) => {
    // If we signout, set state of 'isSignedIn' to 'false', else if route is home then set state of 'isSignedIn' to 'true'; and no matter what, we still want to change the route
    if (route === 'signout') {
      this.setState({isSignedIn: false})
    } else if (route === 'home') {
      this.setState({isSignedIn: true})
    }
    this.setState({route: route});
  }

  // Old code before adding a 'register' component due to doing additional conditional checks; 
  // Rewriting the new code so the comments in this section will make sense for this code. 

  // render() {
  //   return (
  //     <div className="App">
  //       <Particles className='particles'
  //           params={particlesOptions}
  //         />
  //       <Navigation onRouteChange={this.onRouteChange} />
  //       {/* you can't add 'if' statements within a return unless you wrap in {} so its a javascript expression */}
  //       {/* Explanation for this 'conditional statement':
  //         if this.state.route equals 'signin', 
  //         ? (means if thats true) then return <SignIn /> component,
  //         otherwise return <Logo /> and other components within the {brackets}: keep in mind you NEED to have a <div> wrapping the components here  
  //       */}
  //       { this.state.route === 'signin' 
  //         ? <SignIn onRouteChange={this.onRouteChange} />
  //         : <div>
  //             <Logo />
  //             <Rank />
  //             <ImageLinkForm 
  //               onInputChange={this.onInputChange} 
  //               onButtonSubmit={this.onButtonSubmit} 
  //             />
  //             <FaceRecognition box={this.state.box} imageUrl={this.state.imageUrl} />
  //           </div>
  //       }
  //     </div>
  //   )
  // }

  // New code with new conditional statements for register component
  render() {
    const { isSignedIn, imageUrl, route, box } = this.state;
    return (
      <div className="App">
        <Particles className='particles'
            params={particlesOptions}
          />
        <Navigation isSignedIn={isSignedIn} onRouteChange={this.onRouteChange} />
        {/* If this.state.route is home then render our home screen (home screen components)
            otherwise if 'this.state.route === 'signin' then render our <SignIn> component
            otherwise render the <Register> form 
            In short... if state.route is home: return home page, if state.route is signin: return signin, otherwise return register
        */}
        { route === 'home' 
          ? <div>
              <Logo />
              <Rank />
              <ImageLinkForm 
                onInputChange={this.onInputChange} 
                onButtonSubmit={this.onButtonSubmit} 
              />
              <FaceRecognition box={box} imageUrl={imageUrl} />
            </div>
          : (
              route === 'signin' 
              ? <SignIn onRouteChange={this.onRouteChange} />
              : <Register onRouteChange={this.onRouteChange} />
            )
        }
      </div>
    )
  }
}

export default App;

