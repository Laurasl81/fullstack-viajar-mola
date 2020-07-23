import React, { Component } from 'react'
import './App.css'

import AuthService from './../service/AuthService'
import { Switch, Route } from 'react-router-dom'

import Navigation from './ui/NavBar'
import Message from './ui/CustomToast'
import Footer from './ui/Footer'

import Home from './pages/home'

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

          </Switch>
        </main>
        <Footer />
        <Message {...this.state.toast} handleToast={this.handleToast} />
      </>
    )
  }
}

export default App;


