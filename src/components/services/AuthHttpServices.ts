import BaseHttpServices from "./BaseHttpServices";

export class AuthHttpServices extends BaseHttpServices {
async login(username: string, password: string): Promise<string | undefined> {
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
            return data.token;
    
            
          } catch (error) {
            console.log("error logging in");
  
}}}