import React, { Component } from 'react'
import './App.css'

import AuthService from './../service/AuthService'
import { Switch, Route } from 'react-router-dom'

import Navigation from './pages/ui/Navbar'
import Message from './pages/ui/CustomToast'
import Footer from './pages/ui/Footer'
import Signup from './auth/Signup'
import Home from './pages/home'
import Login from './auth/Login'

class App extends Component {
  constructor() {
    super()
    this.state = {
      loggedInUser: null,
      toast: {
        visible: false,
        text: ''
      }

    }
    this.AuthService = new AuthService()
  }

  setTheUser = user => this.setState({ loggedInUser: user }, () => console.log("El estado de App ha cambiado:", this.state))

  fetchUser = () => {
    this.AuthService
      .isLoggedIn()
      .then(response => this.state.loggedInUser === null && this.setState({ loggedInUser: response.data }))
      .catch(err => console.log({ err }))
  }

  handleToast = (visible, text = '') => {
    let toastCopy = { ...this.state.toast }
    toastCopy = { visible, text }
    this.setState({ toast: toastCopy })
  }

  render() {
    return (
      <>
        <Navigation setTheUser={this.setTheUser} loggedInUser={this.state.loggedInUser} handleToast={this.handleToast} />
        <main>
          <Switch>
            <Route exact path="/" render={() => <Home />} />
            <Route path="/signup" render={props => <Signup {...props} setTheUser={this.setTheUser} handleToast={this.handleToast} />} />
            <Route path="/login" render={props => <Login {...props} setTheUser={this.setTheUser} handleToast={this.handleToast} />} />


          </Switch>
        <Footer />
        </main>
        <Message {...this.state.toast} handleToast={this.handleToast} />
      </>
    )
  }
}

export default App;


