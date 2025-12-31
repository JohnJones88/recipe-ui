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
              <Card.Title className="text-center">Sign Up</Card.Title>
              <div className={`form-floating mb-3 ${hasError ? 'was-validated' : ''}`}>
                <input type="first_name" id="firstName" required placeholder="Enter First Name" className="form-control" value={first_name} onChange={(e) => { setFirstName(e.target.value) }} />
                <label htmlFor="firstName">First Name</label>
              </div>
              <div className={`form-floating mb-3 ${hasError ? 'was-validated' : ''}`}>
                <input type="last_name" id="lastName" required placeholder="Enter Last Name" className="form-control" value={last_name} onChange={(e) => { setLastName(e.target.value) }} />
                <label htmlFor="lastName">Last Name</label>
              </div>
              <div className={`form-floating mb-3 ${hasError ? 'was-validated' : ''}`}>
                <input type="email" id="email" required placeholder="Enter Email" className="form-control" value={email} onChange={(e) => { setEmail(e.target.value) }} />
                <label htmlFor="email">Email</label>
              </div>
              <div className={`form-floating mb-3 ${hasError ? 'was-validated' : ''}`}>
                <input type="username" id="username" required placeholder="Enter Username" className="form-control" value={username} onChange={(e) => { setUsername(e.target.value) }} />
                <label htmlFor="username">Username</label>
              </div>
              <div className={`form-floating mb-3 ${hasError ? 'was-validated' : ''}`}>
                <input type="password" id="password" required placeholder="Enter Password" className="form-control" value={password} onChange={(e) => { setPassword(e.target.value) }} />
                <label htmlFor="password">Password</label>
              </div>
              <div className="d-grid mt-4">
                <button className="btn btn-primary" type="button" onClick={SignUp}>Register</button>
              </div>
              <div className="row mt-3">
                {isNotUnique &&
                  <p className="col-12 text-center error-color mb-2">
                    Username or Email already exist
                  </p>
                }
                <p className={`col-12 text-center`}>
                Already Registered? <a href="" className="ms-2 text-muted-link" onClick={() => navigate('/')}>Sign in</a>
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