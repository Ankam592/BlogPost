import { useDispatch } from "react-redux";
import { logout } from "../../store/authSlice";
import {Logout} from "../../appwrite/auth.js";
import { useNavigate } from "react-router-dom";

export const LogoutBtn= ()=>
{
    const dispatch = useDispatch();
    const nav = useNavigate();
    const logoutHandler = ()=>
    {
        Logout().then(()=>{
            dispatch(logout())
            nav('/');
            
        })
    }

    return (
        <div className="">
            <button onClick={()=>logoutHandler()}  className="inline-block px-6 py-2 duration-200 hover:bg-blue-100 rounded-full">Logout</button>
        </div>
    )
}


