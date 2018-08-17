import React, { Component } from 'react';
import Typography from '@material-ui/core/Typography';

import TextField from '@material-ui/core/TextField';
import Button from '@material-ui/core/Button';
import CountUp from 'react-countup';

import Grid from '@material-ui/core/Grid';
import Paper from '@material-ui/core/Paper';
import DialogContent from '@material-ui/core/DialogContent';
import DialogContentText from '@material-ui/core/DialogContentText';
import DialogTitle from '@material-ui/core/DialogTitle';
import Slide from '@material-ui/core/Slide';
import CircularProgress from '@material-ui/core/CircularProgress';
import { withRouter } from 'react-router-dom';
import * as firebase from 'firebase';
import Nav from '../components/Nav';
import '../../App.css';
import GarbageContract from '../blockchain/build/contracts/GarbageContract.json';

import getWeb3 from '../utils/getWeb3';



let contractInstance = null;
const contract = require('truffle-contract');

class SendEther extends Component {
  constructor(props) {
    super(props);
      
    this.state = {
      rating: 0,
      web3: null,
      successful: false,
      point: 20,
      ether: 0.5,
      firebaseRef: null,
    }
    this.handleChange = this.handleChange.bind(this);
    this.formSubmit = this.formSubmit.bind(this);
    this.getAmount = this.getAmount.bind(this);
  }
  componentWillMount() {
    getWeb3.then((results) => {
      this.setState({
        web3: results.web3,
        metamask: true,
      });
      this.instantiateContract();
    }).catch(() => {
      this.setState({ metamask: false });
      console.log('Error finding web3. Please make sure MetaMask is installed.');
    });
    const rootRef = firebase.database().ref().child('akshay');
    const cleanerRef = rootRef.child('points');
    this.setState({
        firebaseRef: rootRef,
    });
    cleanerRef.on('value', snap=> {
        this.setState({
            point: snap.val(),
        });
        let points = snap.val();
        let etherAva = points/200;
        this.setState({
            ether: etherAva,
        });
        
    });
  }

  instantiateContract() {
    const instance = this;
    this.state.web3.eth.getAccounts((error, result) => {
      if (error != null) {
        console.log('Could not get accounts');
      } else {
        [instance.state.web3.eth.defaultAccount] = result;
        const auctionContract = contract(GarbageContract);
        auctionContract.setProvider(instance.state.web3.currentProvider);
        auctionContract.deployed().then((cinstance) => {
          contractInstance = cinstance;
        });
      }
    });
  }

  handleChange = (e) => {
    e.preventDefault();
    this.setState({rating: e.target.value});
  };

  formSubmit = (e) => {
    e.preventDefault();
    console.log("entered form submit");

    let amount = this.state.ether;

    amount = amount.toString();
    const thisInstance = this;
    contractInstance.sendEther(
        thisInstance.state.web3.utils.toWei(amount, 'ether'),
      { from: thisInstance.state.web3.eth.defaultAccount },
    ).then((res) => {
      console.log(res);
      if (res) {
        console.log("*****************************");
        console.log(res);
        this.state.firebaseRef.child('points').set(0);
        thisInstance.setState({ successful: true });
      }
    }).catch((err) => {
      console.log(err);
    });
  }

  getAmount = (e) => {
    e.preventDefault();
    const thisInstance = this;
    contractInstance.getAmount.call(
      { from: thisInstance.state.web3.eth.defaultAccount },
    ).then((res) => {
      console.log(res);
      if (res) {
        console.log("*****************************");
        console.log(res);

        thisInstance.setState({ successful: true });
      }
    }).catch((err) => {
      console.log(err);
    });
  }

  render() {
    return (
      <div>
        <Nav />
        <center>
          <Paper className="container" elevation={4}>
            <form noValidate autoComplete="off" onSubmit={this.formSubmit}>
            <Grid container justify="center" spacing={24}>
            <Grid item >
              <Paper style={{ height: 200, width: 200, padding: 35 }} elevation={4}>
                <center>
                  <CountUp
                    className="count-animation"
                    start={1000}
                    end={this.state.point}
                    duration={2.75}
                    useEasing
                  />
                  <p>Points</p>
                </center>
              </Paper>
            </Grid>
            <Grid item >
              <Paper style={{ height: 200, width: 200, padding: 35 }} elevation={4}>
                <center>
                  <CountUp
                    className="count-animation"
                    start={1000}
                    end={this.state.ether}
                    duration={2.75}
                    useEasing
                  />
                  <p>Ether</p>
                </center>
              </Paper>
            </Grid>
          </Grid>
      
              <center>
                <Button variant="contained" color="primary" type="submit" className="login_button" >
                  Submit
                </Button>
              </center>
            </form>
            <center>
                <Button variant="contained" color="primary" onClick={this.getAmount} className="login_button" >
                  See Amount
                </Button>
            </center>
          </Paper>
        </center>
      </div>
    );
  }
}


export default withRouter(SendEther);
