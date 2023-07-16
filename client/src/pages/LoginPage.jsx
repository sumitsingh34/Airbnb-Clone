import axios from "axios";
import { useContext, useState } from "react";
import { Link, Navigate } from "react-router-dom";
import { UserContext } from "../UserContext";

export default function LoginPage() {
    const [email, setEmail] = useState('');
    const [password, setPassword] = useState('');
    const [redirect, setRedirect] = useState('');
    const {setUser} = useContext(UserContext);

    async function handelLoginSubmit(ev){
        ev.preventDefault();
        try{
            const {data} = await axios.post('/login', {
                email,
                password,
            });
            setUser(data);
            alert('Login successful.');
            setRedirect(true);
        } catch(e) {
            alert('Login failed');
        }
    }

    if(redirect){
        return <Navigate to={'/'}/>
    }
    
    return (
        <div className="mt-4 grow flex items-center justify-around">
            <div className="mb-64">
                <h1 className="text-4xl text-center mb-4">Login</h1>
                <form className="max-w-md mx-auto" onSubmit={handelLoginSubmit}>
                    <input type="email" placeholder="your@email.com" 
                    value={email}
                    onChange={ev => setEmail(ev.target.value)} />
                    <input type="password" placeholder="password" 
                    value={password}
                    onChange={ev => setPassword(ev.target.value)} />
                    <button className="primary">Login</button>
                    <div className="text-center text-gray-500 py-2"> 
                        Don't have an account yet? <Link className="underline text-black" to={'/register'}>Register now</Link>
                    </div>
                </form>
            </div>
        </div>
    )
}