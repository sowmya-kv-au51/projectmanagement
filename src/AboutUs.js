import { useEffect } from 'react';
import './App.css';
import { useNavigate } from 'react-router-dom';
import Link from "@mui/material/Link";

export default function AboutUs(props){
    let navigate = useNavigate()

    useEffect(() => {
        if(localStorage.getItem("token")) {
            navigate("/home")
        }
    })

    return(

        <div>
          {!localStorage.getItem("token") && <div style={{display: "flex", justifyContent: "flex-start", alignItems: "center", width: "100%", height: "50px", backgroundColor: "black"}}>
            <div>
                <Link style={{color: "white", margin: "0px 20px", textDecoration: "none", cursor: "pointer"}} href="/about-us">About Us </Link>
                </div>
                <div>
                <Link style={{color: "white", margin: "0px 20px", textDecoration: "none", cursor: "pointer"}} href="/sign-up">Sign Up </Link>
                <Link style={{color: "white", margin: "0px 20px", textDecoration: "none", cursor: "pointer"}} href="/">Sign In </Link>
                </div>
            </div>
            }
            <div className="about-us-page">
               The project management app is used to track the developments and tasks related to a particular project.
               In this app a user can login and create a Project along with the team members who are associated in the project.
               A single user can create multiple projects and track them simultaneously. He can also, add the bugs, tasks and particular documents related to the project.
               These tasks and bugs show as a list and can be marked complete once done. The user can also upload documents like images to the documents tab and he can store them and also download them later.
            </div>
        </div>

    )
        

}