import React, {Component} from 'react';
import { Route, Link } from 'react-router-dom';
import Home from '../components/Home/Home.js';
import Vacations from '../components/Vacations/Vacations.js';
import Header from '../components/Header/Header.js';
import PhotoAlbum from '../components/PhotoAlbum/PhotoAlbum.js';
import MealPlan from '../components/MealPlan/MealPlan.js';
class App extends Component {
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
