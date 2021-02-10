import React from "react";
import { BrowserRouter as Router, Route } from "react-router-dom";
import { Container } from "semantic-ui-react";
import "semantic-ui-css/semantic.css";
import "./App.css";

// Pages
import Home from "./pages/Home";
import Login from "./pages/Login";
import Register from "./pages/Register";

// Components
import Header from "./components/Header";

function App() {
  return (
    <Router>
      <Container>
        <Header />
        <Route path="/" exact component={Home}></Route>
        <Route path="/login" exact component={Login}></Route>
        <Route path="/join" exact component={Register}></Route>
        {/* <Route path="/@{username}" component=""></Route> */}
        {/* <Route path="/post/create" exact component=""></Route> */}
        {/* <Route path="/p/{post_id}" component=""></Route> */}
      </Container>
    </Router>
  );
}

export default App;
