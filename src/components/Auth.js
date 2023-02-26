import {useState, useContext} from 'react'
import axios from 'axios'
import AuthContext from '../context/authContext'
 
const Auth = () => {
    const authCtx = useContext(AuthContext);

   const [username, setUsername] = useState('')
   const [password, setPassword] = useState('')
   const [register, setRegister] = useState(true)

   const handleUsername = (event) => {
    setUsername(event.target.value)
   };

   const handlePassword = (event) => {
    setPassword(event.target.value)
   };

   const handleClick = (event) => {
    setRegister(!register)
   };
 
   const submitHandler = async (e) => {
       e.preventDefault()
       let response;

       const body = {
            username,
            password
        }
  
        try {
            if (register) {
                response = await axios.post('/register', body);
            } else {
                response = await axios.post('/login', body);
            } 
        } catch (error) {
            console.log(error);
            setUsername('')
            setPassword('')
        }
       console.log('response auth FE', response);
       authCtx.login(response.data.token, response.data.exp, response.data.userId);
   }

        // const body = {
        //     username,
        //     password
        // }

        // const baseUrl = 'https://socialmtn.devmountain.com';
        // const endpoint = register ? 'register' : 'login';

        // try {
        //     response = await axios.post(`${baseUrl}/${endpoint}`, body);
        // } catch (error) {
        //     console.log(error);
        //     setUsername('')
        //     setPassword('')
        // }
        // console.log('response', response);
        // authCtx.login(response.data.token, response.data.exp, response.data.userId);
        // }
   
   return (
       <main>
           <h1>Welcome!</h1>
           <form className="form auth-form" onSubmit={submitHandler}>
               <input
                   className="form-input"
                   type= "text"
                   placeholder= "Username"
                   value= {username}
                   onChange={handleUsername}
                />
               <input
                   className="form-input"
                   type= "text"
                   placeholder= "Password"
                   value= {password}
                   onChange={handlePassword}
                />
               <button className="form-btn">
                   {register ? "Sign Up" : "Login"}
               </button>
           </form>
           <button onClick={handleClick} className='form-btn'>Need to {register ? "Login" : "Sign Up"}?</button>
       </main>
   )
}
 
export default Auth