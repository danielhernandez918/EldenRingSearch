import React from "react";
import {
  BrowserRouter,
  Switch,
  Route,
} from "react-router-dom";
import Search from './views/Search'
import Items from './views/items'
import Ammos from "./views/ammos";
import Armors from "./views/armors";
import AshesOfWar from "./views/ashes_of_war";
import Weapons from "./views/weapons";
import Incantations from "./views/incantations";
import Shields from "./views/shields";
import Sorceries from "./views/sorceries";
import Spirits from "./views/spirits";
import Talismans from "./views/talismans";
import Categories from "./views/categories";
import CatList from "./views/list";
import "./views/styles.css";
import Header from "./views/header";
import Results from "./views/Results";
import Register from './views/Register';
import Login from './views/Login';
import Cookie from './views/Cookies';
import Favorites from "./views/favorites";




function App() {
  return (
    <div style={{ 
      backgroundImage: `url("https://i.redd.it/c86agg71sl671.jpg")`,
      backgroundPosition: 'center',
      backgroundSize: 'cover',
      backgroundRepeat: 'no-repeat',
      backgroundAttachment: 'fixed',
      width: '100%',
      minHeight: '100vh'
    }}>
      <BrowserRouter>
        <Header/>
        <Switch>
          <Route path="/favorites">
            <Favorites />
          </Route>
          <Route path="/register">
            <Register />
          </Route>
          <Route path="/login">
            <Login />
          </Route>
          <Route path="/cookies">
            <Cookie />
          </Route> 
          <Route path="/categories">
            <Categories/>
          </Route>
          <Route path="/list/:type">
            <div className="rows catList">
              <CatList />
              <Route exact path="/list/ammos/:id">
                <Ammos/>
              </Route>
              <Route exact path="/list/armors/:id">
                <Armors/>
              </Route>
              <Route exact path="/list/ashes/:id">
                <AshesOfWar/>
              </Route>
              <Route exact path="/list/incantations/:id">
                <Incantations/>
              </Route>
              <Route exact path="/list/items/:id">
                <Items/>
              </Route>
              <Route exact path="/list/shields/:id">
                <Shields/>
              </Route>
              <Route exact path="/list/sorceries/:id">
                <Sorceries/>
              </Route>
              <Route exact path="/list/spirits/:id">
                <Spirits/>
              </Route>
              <Route exact path="/list/talismans/:id">
                <Talismans/>
              </Route>
              <Route exact path="/list/weapons/:id">
                <Weapons/>
              </Route>
            </div>
          </Route>
          <Route exact path="">
            <Search />
              <Route exact path="/ammos/:id">
                <Ammos/>
              </Route>
              <Route exact path="/armors/:id">
                <Armors/>
              </Route>
              <Route exact path="/ashes/:id">
                <AshesOfWar/>
              </Route>
              <Route exact path="/incantations/:id">
                <Incantations/>
              </Route>
              <Route exact path="/items/:id">
                <Items/>
              </Route>
              <Route exact path="/search/:type/:name">
                <Results/>
              </Route>
              <Route exact path="/shields/:id">
                <Shields/>
              </Route>
              <Route exact path="/sorceries/:id">
                <Sorceries/>
              </Route>
              <Route exact path="/spirits/:id">
                <Spirits/>
              </Route>
              <Route exact path="/talismans/:id">
                <Talismans/>
              </Route>
              <Route exact path="/weapons/:id">
                <Weapons/>
              </Route>
          </Route>
        </Switch>
      </BrowserRouter>
    </div>
  );
}

export default App;
