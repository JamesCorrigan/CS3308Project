import React, {Component} from 'react'
import { Route, Link } from 'react-router-dom'
import Home from '../components/Home'
import Vacations from '../components/Vacations'
import Header from '../components/Header'
import PhotoAlbum from '../components/PhotoAlbum'
import MealPlan from '../components/MealPlan'
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
