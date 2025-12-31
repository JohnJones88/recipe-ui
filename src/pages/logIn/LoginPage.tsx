import { useNavigate, useParams } from "react-router-dom";
import { Card } from "react-bootstrap";
import './LoginPage.css';
import BaseHttpServices from "../../components/services/BaseHttpServices";
import { useState, useEffect } from "react";

function LogInPage(){
    const navigate = useNavigate();
    const { } = useParams();

    const[username, setUsername] = useState('');
    const[password, setPassowrd] = useState('');
    const[hasError, setHasError] = useState(false);


    return(
        <div className="login-page container d-flex align-items-center justify-content-center">
            <Card style={{ maxWidth: '100%', width: "50rem"}}>
                <Card.Body>
                    <div className="50-w p-5 rounded">
                        <form className="needs-validation">
                            <Card.Title className="text-center">Sign In</Card.Title> 
                            <div className={`form-floating mb-3 ${hasError ? 'was-validated' : ''}`}>
                            <input type="username" id="username" required placeholder="Enter Username" className={`form-control`} value={username} onChange={(e) => {setUsername(e.target.value)}}/>
                            <label htmlFor="username">Username</label>
                            <div className="invalid-feedback">
                                Please Enter Your Username
                            </div>
                             </div>
                             <div className={`form-floating mb-3 ${hasError ? 'was-validated' : ''}`}>
                                <input type="password" id="password" required placeholder="Enter Password" className={`form-control`} value={password} onChange={(e) => {setPassowrd(e.target.value)}} />
                                <label htmlFor="password">Password</label>
                                <div className="invalid-feedback">
                                    Please Enter Your Password</div>
                                    </div>
                                    <div className="mb-3 form-check">
                                        <input type="checkbox" className="form-check-input" id="check" />
                                        <label htmlFor="check" className="form-check-label">
                                            Remember me</label></div>
                                            <div className="d-grid">
                                                <button className="btn btn-primary" type="button" onClick={userLogIn}>Log In</button>
                                                </div>
                                                <div className="row mt-3">
                                                    {hasError &&
                                                    <p className="col-12 text-center error-color mb-2">
                                                        Invaild Credentials
                                                    </p>
}
<p className={`col-12 text-center`}>
    Forgot <a href="" className="text-muted-link">Password?</a><a href="" className="ms-2 text-muted-link" onClick={() => navigate('/signup')}>Register</a> 
    </p></div>                       </form>

                    </div>
                </Card.Body>
            </Card>

        </div>
    );
    function userLogIn() {

        const httpService = new BaseHttpServices();
    
        const asyncGetUserLogIn = async () => {
          const url = process.env.REACT_APP_BASE_URL + '/login';
    
          const options = {
            method: 'POST',
            headers: { 'content-Type': 'application/json', 'authorization': `${localStorage.getItem('profile-token')}` },
            body: JSON.stringify({ user_name: username, password: password })
          }
          console.log(options)
          try {
            const response = await fetch(url, options);
            const data = await response.json()
            console.log(data);
    
            localStorage.setItem('profile-token', data.token)
    
            navigate('/home')
          } catch (error) {
            setHasError(true);
            
          }
        }
        asyncGetUserLogIn()
      }
    }

    export default LogInPage;