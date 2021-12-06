import React from "react";
import { useNavigate } from 'react-router-dom';
import axios from 'axios';


class Login extends React.Component{
    state ={
        username: '',
        password: '',
        errorStyle : {display: 'none'}
    }

    handleChange = event =>{
        this.setState({[event.target.name]: event.target.value});
    }

    handleSubmit = event => {
        const navigation = this.props.navigate;
        event.preventDefault();
        const creds={
            username :this.state.username,
            password : this.state.password,
           }
          axios.post('https://localhost:5001/admin',creds).then(res=>{
              if(res.data=='Incorrect credentials')
              {
                this.setState({errorStyle :{display: 'block'}})

              }
              else{
                navigation("/admin");
 
              }
             })
    }

    render(){
        return(
            <div class="login-page">
            <div className="auth-wrapper">
                <div className="auth-inner">                    
                        <form onSubmit={this.handleSubmit}>
                            <h3>Admin Sign In</h3>
                            <div className="login-error" style={this.state.errorStyle}>
                                <h3>Invalid username or password</h3>
                            </div>                       

                            <div className="form-group">
                                <label className="form-label">Username</label>
                                <input type="text" name="username" className="form-control" placeholder="Your username" onChange={this.handleChange} />
                                
                            </div>

                            <div className="form-group">
                                <label className="form-label">Password</label>
                                <input type="password" name="password" className="form-control" placeholder="Enter password" onChange={this.handleChange}/>
                            </div>

                            <button type="submit" className="btn btn-primary btn-block">Log In</button>
                        </form>
                    </div>
                </div>
            </div>
        )
    }
}

export default function LoginWithNavigate(props) {
    const navigate = useNavigate();
  
    return <Login {...props} navigate={navigate} />;
  }