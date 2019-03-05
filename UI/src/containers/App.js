import React, {Component} from 'react';
import { Route, Link } from 'react-router-dom';
import Home from '../components/Home/Home.js';
import Vacations from '../components/Vacations/Vacations.js';
import Header from '../components/Header/Header.js';
import PhotoAlbum from '../components/PhotoAlbum/PhotoAlbum.js';
import MealPlan from '../components/MealPlan/MealPlan.js';
class App extends Component {
  constructor(props) {
    super(props);
    this.state = {
      data: null
    }
  }

  componentDidMount() {
    this.callUsers().then(res => this.setState({data: res}))
    .catch(err => console.log(JSON.stringify(err)));
    console.log(this.state)
  }
  //demo server call
  callBackendAPI = async () => {
    const response = await fetch('/');
    const body = await response.json();
     if (response.status !== 200) {
       throw Error(body.message)
     }
     return body;
  };

  callUsers = async () => {
    const response = await fetch('/users');
    const body = await response.json();
     if (response.status !== 200) {
       throw Error(body.message)
     }
     return body;
  };
  render() {
    return (
      <div>
        <Header />
        <main>
          <Route exact path="/" component={Home} />
          <Route exact path="/vacations" component={Vacations} />
          <Route exact path="/photoalbum" component={PhotoAlbum} />
          <Route exact path="/mealplan" component={MealPlan} />
        </main>
      </div>
    );
  }
}

export default App
