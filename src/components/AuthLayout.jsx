import { React, useState, useEffect } from "react";
import { useSelector } from "react-redux";
import { useNavigate } from "react-router-dom";

export const Protected = ({ children, authentication })=> {

    const nav = useNavigate();
    const [loader, setLoader] = useState(true);
    const authStatus = useSelector(state => state.auth.status)

    useEffect(() => {
        console.log("Need Authentication ? ", authentication , "did user loged in ? " , authStatus)
       if (authentication && !authStatus) {
      nav("/login");
    }
        setLoader(false);
    }, [authStatus, authentication, loader])




   if (loader) return <h1>Loading...</h1>;

    return children;
}

