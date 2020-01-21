import React, {useState} from 'react';
import  '../style/login.css';

const Login = () =>{
    const [email, setEmail] = useState('');
    const [pass, setPass] = useState('');

    const signIn = (email: any, pass:any) => {
        console.log(email, pass);
    }
    
    return(
        
            <form className="login-form" onSubmit={(e:any )=> { e.preventDefault(); signIn(email, pass) }}>
                <div className="container">
                    <div className="input-container e">
                        <span className="title email-text">Email: </span>
                        <input className="login-input" type="email" onChange={(e: any) => setEmail(e.target.value)} />
                    </div>
                    <div className="input-container p">
                        <span className="title pass-text">Password: </span>
                        <input className="login-input" type="password" onChange={(e: any) => setPass(e.target.value)} />
                    </div>
                    <div className="button">
                        <button className="submit" type="submit">Sign In</button>
                    </div>
                </div>
            </form>

        
    );
}

export default Login;