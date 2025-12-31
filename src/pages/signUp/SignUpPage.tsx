import { useState, useEffect } from "react";
import { useNavigate } from "react-router-dom";
import { Card } from "react-bootstrap";
import './SignUpPage.css';

function SignUpPage() {
  const navigate = useNavigate();
  const [username, setUsername] = useState('');
  const [password, setPassword] = useState('');
  const [email, setEmail] = useState('');
  const [first_name, setFirstName] = useState('');
  const [last_name, setLastName] = useState('');
  const [hasError, setHasError] = useState(false);
  const [isNotUnique, setIsNotUnique] = useState(false);

  return (
    <div className="signup container d-flex align-items-center justify-content-center">
      <Card style={{ maxWidth: '100%', width: "50rem" }}>
        <Card.Body>
          <div className="50-w p-5 rounded">
            <form className="needs-validation">
              <h3 className="text-center">Sign Up</h3>
              <div className={`mb-2 ${hasError ? 'was-validated' : ''}`}>
                <label typeof="text">First Name</label>
                <input type="first_name" required placeholder="Enter First Name" className="form-control" value={first_name} onChange={(e) => { setFirstName(e.target.value) }} />
              </div>
              <div className={`mb-2 ${hasError ? 'was-validated' : ''}`}>
                <label typeof="text">Last Name</label>
                <input type="last_name" required placeholder="Enter Last Name" className="form-control" value={last_name} onChange={(e) => { setLastName(e.target.value) }} />
              </div>
              <div className={`mb-2 ${hasError ? 'was-validated' : ''}`}>
                <label htmlFor="email">Email</label>
                <input type="email" required placeholder="Enter Email" className="form-control" value={email} onChange={(e) => { setEmail(e.target.value) }} />
              </div>
              <div className={`mb-2 ${hasError ? 'was-validated' : ''}`}>
                <label typeof="text">Username</label>
                <input type="username" required placeholder="Enter Username" className="form-control" value={username} onChange={(e) => { setUsername(e.target.value) }} />
              </div>
              <div className={`mb-2 ${hasError ? 'was-validated' : ''}`}>
                <label htmlFor="password">Password</label>
                <input type="password" required placeholder="Enter Password" className="form-control" value={password} onChange={(e) => { setPassword(e.target.value) }} />
              </div>
              <div className="d-grid mt-2">
                <button className="btn btn-primary" type="button" onClick={SignUp}>Register</button>
              </div>
              <div className="row">
                {isNotUnique &&
                  <p className="col-4 error-color">
                    Username or Email already exist
                  </p>
                }
                <p className={`text-end ${isNotUnique ? 'col-8' : 'col-12'}`}>
                Already Registered? <a href="" className="ms-2" onClick={() => navigate('/')}>Sign in</a>
                </p>
              </div>
            </form>
          </div>
        </Card.Body>
      </Card>
    </div>
  );

  function SignUp() {
    const asyncSignUp = async () => {
      const url = process.env.REACT_APP_BASE_URL + '/users';

      const options = {
        method: 'POST',
        headers: { 'Content-Type': 'application/json' },
        body: JSON.stringify({ first_name: first_name, last_name: last_name, email: email, user_name: username, password: password })
      }
      console.log(options)
      try {
        const response = await fetch(url, options);
        const data = await response.json()
        if(data.errorMessage === "Internal Server Error SequelizeUniqueConstraintError: Validation error"){
          setIsNotUnique(true)
          return;
        }
        console.log(data);

        navigate('/')
      } catch (error) {
        
        setHasError(true);
        console.error(error);
      }
    }
    asyncSignUp();
  }
}

export default SignUpPage;