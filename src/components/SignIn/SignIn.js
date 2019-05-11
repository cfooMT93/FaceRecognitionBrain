import React from 'react';

class SignIn extends React.Component {
    constructor(props) {
        super(props);
        this.state = {
            signInEmail: '',
            signInPassword: ''
        }
    }
    onEmailChange = (event) => {
        this.setState({signInEmail: event.target.value})
    }

    onPasswordChange = (event) => {
        this.setState({signInPassword: event.target.value})
    }

    onSubmitSignIn = () => {
        // fetch() by default does a 'GET' request, but we want to do a 'POST'
        // To do a POST request:
        // We paWss an object in the second parameter that describes what the request will be: method, headers, body {email, password}
        // In order to send it to the backend, we can't just send it a Javascript object--we have to JSON.stringify() the object
        fetch('http://localhost:3000/signin', {
            method: 'post',
            headers: {'Content-Type': 'application/json'},
            body: JSON.stringify({
                email: this.state.signInEmail,
                password: this.state.signInPassword
            })
        })
            // Changes route if email/pw input is correct, else you stay on the same route and it outputs an error and bad request status
            .then(response => response.json())
            .then(data => {
                if (data === 'success') {
                    this.props.onRouteChange('home')
                }
            })
        
    }
    render() {
        const { onRouteChange } = this.props;
        return (
            // google tachyon cards to use their card outline
            <article className="br3 ba b--black-10 mv4 w-100 w-50-m w-25-l mw6 shadow-5 center">
    
            {/* google tachyon forms to use their HTML sign in code */}
                <main className="pa4 black-80">
                    <div className="measure"> {/* Important - we changed <form> to <div> because we won't be sending a form, rather through json which is more dynamic with more customization and not worry about html forms */}
                        <fieldset id="sign_up" className="ba b--transparent ph0 mh0">
                            <legend className="f1 fw6 ph0 mh0">Sign In</legend>
                            <div className="mt3">
                                <label className="db fw6 lh-copy f6" htmlFor="email-address">Email</label>
                                <input
                                    className="pa2 input-reset ba bg-transparent hover-bg-black hover-white w-100" 
                                    type="email" 
                                    name="email-address"  
                                    id="email-address" 
                                    onChange={this.onEmailChange}
                                />
                            </div>
                            <div className="mv3">
                                <label className="db fw6 lh-copy f6" htmlFor="password" >Password</label>
                                <input 
                                    className="b pa2 input-reset ba bg-transparent hover-bg-black hover-white w-100" 
                                    type="password" 
                                    name="password"  
                                    id="password" 
                                    onChange={this.onPasswordChange}
                                />
                            </div>
                        </fieldset>
                        <div className="">
                            <input 
                                // redirect to home when signin is clicked
                                // also we want this onClick function to run only when onClick happens, so we use an arrow function
                                // onClick={() => onRouteChange('home')} // this is moved into the onSubmitSignIn function/state
                                onClick={this.onSubmitSignIn}
                                className="b ph3 pv2 input-reset ba b--black bg-transparent grow pointer f6 dib" 
                                type="submit" 
                                value="Sign in" 
                            />
                        </div>
                        <div className="lh-copy mt3">
                            {/* we don't want this as an anchor tag, so we replace it with a <p> tag */}
                            {/* also add an onClick route change to redirect to register */}
                            <p onClick={() => onRouteChange('register')} className="f6 link dim black db pointer">Register</p>
                        </div>
                    </div>
                </main>
            </article>
        );
    }
}

export default SignIn;

