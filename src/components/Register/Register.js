import React from 'react';

const Register = ({ onRouteChange }) => {
    return (
        // google tachyon cards to use their card outline
        <article className="br3 ba b--black-10 mv4 w-100 w-50-m w-25-l mw6 shadow-5 center">

        {/* google tachyon forms to use their HTML sign in code */}
            <main className="pa4 black-80">
                <div className="measure"> {/* Important - we changed <form> to <div> because we won't be sending a form, rather through json which is more dynamic with more customization and not worry about html forms */}
                    <fieldset id="sign_up" className="ba b--transparent ph0 mh0">
                        <legend className="f1 fw6 ph0 mh0">Register</legend>
                        <div className="mt3">
                            <label className="db fw6 lh-copy f6" htmlFor="name">Name</label>
                            <input className="pa2 input-reset ba bg-transparent hover-bg-black hover-white w-100" type="text" name="name"  id="name" />
                        </div>
                        <div className="mt3">
                            <label className="db fw6 lh-copy f6" htmlFor="email-address">Email</label>
                            <input className="pa2 input-reset ba bg-transparent hover-bg-black hover-white w-100" type="email" name="email-address"  id="email-address" />
                        </div>
                        <div className="mv3">
                            <label className="db fw6 lh-copy f6" htmlFor="password" >Password</label>
                            <input className="b pa2 input-reset ba bg-transparent hover-bg-black hover-white w-100" type="password" name="password"  id="password" />
                        </div>
                    </fieldset>
                    <div className="">
                        <input 
                            // redirect to home when Register is clicked
                            // also we want this onClick function to run only when onClick happens, so we use an arrow function
                            onClick={() => onRouteChange('home')}
                            className="b ph3 pv2 input-reset ba b--black bg-transparent grow pointer f6 dib" 
                            type="submit" 
                            value="Register" 
                        />
                    </div>
                </div>
            </main>
        </article>
    );
}

export default Register;

