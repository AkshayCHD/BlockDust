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
import Nav from '../components/Nav';
import '../../App.css';
import MovieContract from '../blockchain/build/contracts/MovieContract.json';

import getWeb3 from '../utils/getWeb3';



let contractInstance = null;
const contract = require('truffle-contract');

class AddMovie extends Component {
  constructor(props) {
    super(props);
      
    this.state = {
      rating: 0,
      web3: null,
      successful: false,
    }
    this.handleChange = this.handleChange.bind(this);
    this.formSubmit = this.formSubmit.bind(this);
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
        const auctionContract = contract(MovieContract);
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
    const Mname = document.getElementById("title").value;
    const Mdirector = document.getElementById("title").value;
    const Mdescription = document.getElementById("title").value;
    //const Mrating = parseInt(document.getElementById("title").value);
    const thisInstance = this;
    contractInstance.addMovie(
      Mname,
      Mname,
      Mdirector,
      Mdescription,
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

  const ratings = [
    {
      value: '1',
    },
    {
      value: '2',
    },
    {
      value: '3',
    },
    {
      value: '4',
    },
    {
      value: '5',
    },
  ];

  return (
    <div>
      <Nav />
      <center>
        <Paper className="container" elevation={4}>
          <Typography variant="headline" component="h3">
            Add new Movie.
          </Typography>
          <Typography component="p">
            Disclaimer: These details can not be altered once they are set.
          </Typography>
          <form noValidate autoComplete="off" onSubmit={this.formSubmit}>
            <TextField
              required
              id="title"
              label="Title of the Movie"
              className="textField"
              margin="normal"
            />
            <br />
            <TextField
              required
              id="description"
              label="Enter movie description"
              multiline
              rows="4"
              className="textField"
              margin="normal"
            />
            <br />
            <TextField
              required
              id="director"
              label="Director name"
              className="textField"
              margin="normal"
            />

            <TextField
              id="rating"

              className="textField"
              select
              label="Rating"
              value={this.state.rating}
              onChange={this.handleChange}
              SelectProps={{
                native: true,
              }}
              helperText="Please enter movie rating"
              margin="normal"
            >
              {ratings.map(option => (
                <option key={option.value} value={option.value}>
                  {option.value}
                </option>
              ))}
            </TextField>

            <center>
              <Button variant="contained" color="primary" type="submit" className="login_button" >
                Submit
              </Button>
            </center>
          </form>
        </Paper>
      </center>
    </div>
  );
}
}


export default AddMovie;
