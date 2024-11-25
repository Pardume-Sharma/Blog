import { useContext, useState } from 'react';
import './Login.css';
import { assets } from '../../assets/assets';
import { StoreContext } from '../context/StoreContext';
import axios from 'axios'

const Login = ({ setShowLogin }) => {

    const {url,setToken} = useContext(StoreContext);

    const [currState, setCurrState] = useState("Login");

    const [data, setData] = useState({
        name:"",
        email: "",
        password: ""
    })

    const onChangeHandler = async (event)=>{
        const name = event.target.name;
        const value = event.target.value;
        setData(data=>({
            ...data,[name]:value
        }))
        const response = await axios.post(url,data);
        
    if(response.data)
    {
        setToken(response.data.token);
        localStorage.setItem("token",response.data.token)
        setShowLogin(false);
    }
    else{
        alert(response.data.message);
    }    
}
    const onLogin = async (event)=>{
        event.preventDefault();
        let newUrl = url;
        if(currState==="Login")
        {
            newUrl += "/api/user/login"
        }
        else{
            newUrl += "/api/user/register"
        }
        const response = await axios.post(newUrl,data);
        if(response.data){
            setToken(response.data.token)
            localStorage.setItem("token",response.data.token)
            alert(response.data.message);
            setShowLogin(false);
        }
        else{
            alert(response.data.message);
        }
    }

    return (
        <>
            <div className="login-popup">
                <form className="login-form" onSubmit={onLogin}>
                    <div className="login-head">
                        <h2>{currState}</h2>
                        <img
                            onClick={() => setShowLogin(false)}
                            src={assets.cross_icon}
                            className="login-cross-icon"
                            alt="Close"
                        />
                    </div>
                    <div className="login-details">
                        {currState === "Sign Up" && (
                            <input
                                type="text"
                                placeholder='Enter Name'
                                required
                                name='name'
                                value={data.name}
                                onChange={onChangeHandler}
                            />
                        )}
                        <input
                            type="email"
                            placeholder='Enter Email'
                            required
                            name='email'
                            value={data.email}
                            onChange={onChangeHandler}
                        />
                        <input
                            type="password"
                            placeholder='Password'
                            required
                            name='password'
                            value={data.password}
                            onChange={onChangeHandler}
                        />
                    </div>
                    <button className='btn-class' type="submit">
                        {currState === "Sign Up" ? "Create account" : "Login"}
                    </button>
                    <div className="login-footer">
                        <br/>
                        {currState === "Login" ?
                            <p>Dont have an account? 
                                <span className='login-span' onClick={() => setCurrState("Sign Up")}> Sign Up</span>
                            </p>
                            :
                            <p>Already have an account? 
                                <span className='login-span' onClick={() => setCurrState("Login")}> Login Here</span>
                            </p>
                        }
                    </div>
                </form>
            </div>
        </>
    );
};

export default Login;
