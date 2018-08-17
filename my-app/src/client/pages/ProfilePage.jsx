import React, { Component } from 'react';
import Typography from '@material-ui/core/Typography';
import Paper from '@material-ui/core/Paper';
import Grid from '@material-ui/core/Grid';
import { withRouter } from 'react-router-dom';
import Chip from '@material-ui/core/Chip';
import Avatar from '@material-ui/core/Avatar';
import CountUp from 'react-countup';
import Button from '@material-ui/core/Button';

import * as firebase from 'firebase';
import Nav from '../components/Nav';
import '../../App.css';

class ProfilePage extends Component {
  constructor(props) {
    super(props);
    this.state = {
        point: 20,
        ether: 0.5,
    };
  }

  componentWillMount() {
    const rootRef = firebase.database().ref().child('akshay');
    const cleanerRef = rootRef.child('points');
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


  render() {
      return (
        <div>
        <Nav />
        <center>
        <Paper className="container" elevation={10}>
        
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
                <Button variant="contained" color="primary" onClick={this.transfer} className="login_button" >
                  Transfer
                </Button>
        </center>
        </Paper>
        </center>
        </div>
      );
    }
  
}

export default withRouter(ProfilePage);