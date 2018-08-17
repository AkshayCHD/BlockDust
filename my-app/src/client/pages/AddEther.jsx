import React, { Component } from 'react';
import Typography from '@material-ui/core/Typography';

import TextField from '@material-ui/core/TextField';
import Button from '@material-ui/core/Button';
import Paper from '@material-ui/core/Paper';
import DialogContent from '@material-ui/core/DialogContent';
import DialogContentText from '@material-ui/core/DialogContentText';
import DialogTitle from '@material-ui/core/DialogTitle';
import Slide from '@material-ui/core/Slide';
import CircularProgress from '@material-ui/core/CircularProgress';
import { withRouter } from 'react-router-dom';
import Nav from '../components/Nav';
import '../../App.css';
import GarbageContract from '../blockchain/build/contracts/GarbageContract.json';

import getWeb3 from '../utils/getWeb3';



let contractInstance = null;
const contract = require('truffle-contract');

class AddEther extends Component {
  constructor(props) {
    super(props);
      
    this.state = {
      rating: 0,
      web3: null,
      successful: false,
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
    let amount = parseInt(document.getElementById("amount").value);
    
    amount = amount.toString();
    const thisInstance = this;
    contractInstance.addEther(
      { from: thisInstance.state.web3.eth.defaultAccount, value: thisInstance.state.web3.utils.toWei(amount, 'ether') },
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
            <Typography variant="headline" component="h3">
              Add Amount.
            </Typography>
            <Typography component="p">
              Disclaimer: These details can not be altered once they are set.
            </Typography>
            <form noValidate autoComplete="off" onSubmit={this.formSubmit}>
              <TextField
                required
                id="amount"
                label="Amount to added to contract"
                className="textField"
                margin="normal"
              />
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


export default withRouter(AddEther);
