import { useContext, useState } from "react"
import { UserContext } from "../UserContext"
import { Navigate, useParams } from "react-router-dom";
import axios from "axios";
import PlacesPage from "./PlacesPage";
import AccountNav from "../AccountNav";


export default function ProfilePage() {
    const {user, ready, setUser} = useContext(UserContext);
    const [redirect, setRedirect] = useState(null);
    
    let {subpage} = useParams();
    if(subpage === undefined){
        subpage = 'profile';
    }

    async function logout(){
        await axios.post('/logout');
        setUser(null);
        setRedirect('/');
    }

    if(!ready){
        return 'Loading....';
    }

    if(ready && !user && !redirect){
        return <Navigate to={'/login'}/>
    }

    if(redirect){
        return <Navigate to={redirect} />
    }

    async function profileChanges(){
        try{
            await axios.put('/profile-update', {...user});
            alert('Your profile updated!');
        } catch(e){
            alert('Error occured: could not update your profile.')
        }
    }
    

    return (
        <div>
           <AccountNav />
            { subpage === 'profile' && (
                <div className="text-left max-w-lg mx-auto grid grid-cols-1">
                    <div className="text-xl">Logged in as </div>
                    <div> 
                        <input type="text" defaultValue={user.name} 
                        onChange={(ev) => {user.name = ev.target.value}}/> 
                    </div>
                     <div>
                        <input type="email" defaultValue={user.email}
                        onChange={(ev) => {user.email = ev.target.value}} /> 
                    </div>
                    <div className="grid grid-cols-2 gap-2">
                        <button onClick={profileChanges} className="primary max-w-sm mt-2">Update</button>
                        <button onClick={logout} className="primary max-w-sm mt-2">Logout</button>
                    </div>
                </div>
            )}

            { subpage === 'places' && (
                <PlacesPage />
            )}
        </div>
    )
}