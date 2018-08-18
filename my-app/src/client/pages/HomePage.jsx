import React, { Component } from 'react';
import Nav from '../components/Nav';

class HomePage extends Component {
    constructor(props) {
      super(props);
    }

    state = {loading: true}

    componentDidMount(){
        setTimeout(() => this.setState({ loading: false }), 3500);
    }  

    render() {
        const preloader = (<div style={{height: '100vh', width: '100vw', display: 'flex', justifyContent: 'center', alignItems: 'center'}}><img src={loader} alt="loader" /></div>)

        let content;

        if (this.state.loading) {
            content = preloader;
        } else {
            content = (
                <div className="center">
            <Nav />
            <img className="carousel" src={carousel} width="100%" height="100%"/>
            <br />
            <div className="row indexlogo">
                <div className="logo_index">
                    <img src={logo} />
                </div>
                <div className="typingdiv">
                    <Typing speed="50ms">
                    <Typing.Delay ms={2000} />
                    <span className="spanblock">Block Dust is what you need!!</span>
                    </Typing>
                </div>
            </div>
            <div className = "indexcontent">
                    
                    <p>Block Dust is just not an ordinary smart city project, it uses technical knowledge and social
                        services aspect. It uses the blockchain technolgy to encrypt your information in more secured
                        manner, so your money won't go to wrong hand. Along with the social concept you can make money 
                        through it.
                        You don't beleive me, just sign up and get your money by making environment more greener and
                        your city less polluted. 
                    </p>
                    <Button variant="contained" color="primary" className="signup_button">
                        Sign Up
                    </Button>
                    
            </div>

            <div className="indexlogo">
                <div className="typingdiv">
                    <Typing speed="50ms">
                    <Typing.Delay ms={3000} />
                    <span className="spanblock">How Block Dust Works??</span>
                    </Typing>
                </div>
                <Vertical />
                
            </div>
            <footer className="footer-distributed">

			<div className="footer-left">

				<img src={logo1} />

				<p style={{fontSize:'30px', color: 'white'}}>Block Dust</p>

				<p className="footer-company-name">Block Dust &copy; 2018</p>
			</div>

			<div className="footer-center">

				<div>
					<i className="fa fa-map-marker"></i>
					<p><span>UIET</span>Panjab University, CHD</p>
				</div>

				<div>
					<i className="fa fa-phone"></i>
					<p>+919871166953</p>
				</div>

				<div>
					<i className="fa fa-envelope"></i>
					<p><a href="mailto:support@blockdust.com">support@blockdust.com</a></p>
				</div>

			</div>

			<div className="footer-right">

				<p className="footer-company-about">
					<span>About Block Dust</span>
					Block Dust is a revolutionary idea that will change the future and help in making our city clean in more playful approach.
				</p>

				<div className="footer-icons">

					<a href="#"><img src={facebook} /></a>
					<a href="#"><img src={google} /></a>
					<a href="#"><img src={instagram} /></a>
					<a href="#"><img src={linkedin} /></a>

				</div>

			</div>

		</footer>
        </div>
            )
        }

        return content;
    }
}

export default HomePage;