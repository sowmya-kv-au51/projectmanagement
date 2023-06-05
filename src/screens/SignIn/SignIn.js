import Button from "@mui/material/Button";
import TextField from "@mui/material/TextField";
import FormControlLabel from "@mui/material/FormControlLabel";
import Checkbox from "@mui/material/Checkbox";
import Link from "@mui/material/Link";
import Grid from "@mui/material/Grid";
import Box from "@mui/material/Box";
import Typography from "@mui/material/Typography";
import Container from "@mui/material/Container";
import { useEffect, useState } from "react";
import {useNavigate} from 'react-router-dom';


export default function SignIn() {

  const handleSubmit = async(event) => {
    event.preventDefault();
    const data = new FormData(event.currentTarget);    
      const body = JSON.stringify({
        email: data.get("email"),
        password: data.get("password"),
      })
      const response = await callApi('https://project-management-backend-w32q.onrender.com/users/login', 'POST', body)
  };

  const navigate = useNavigate();


  useEffect(() => {
    let token = localStorage.getItem('token')
    if(token) {
        navigate('/home')
    }
  }, []);

  

  async function callApi(apiUrl,method,body) {
    try {
    
      // Define the API request options
      const requestOptions = {
        method: method,
        headers: {
          'Content-Type': 'application/json'
        }
      };
    
      if(body){
          requestOptions.body= body
      }
    
      const response = await fetch(apiUrl, requestOptions);
        // Handle the API response
      if (!response.ok) {
        throw new Error('Network response was not ok');
      }
      const data = await response.json();
      console.log(data)
      localStorage.setItem("token", data.token)
      localStorage.setItem("username", data.username)
      localStorage.setItem("email", data.email)
    //   localStorage.setItem("type", data.type)
      setTimeout(() => {
        window.location.href="/home"        
      }, 100);
      // return data;
    } catch (error) {
        // Handle errors that occur during the API request
        console.error('There was a problem with the API request:', error);
        return false;
    }
  }
  

  return (
    <div>
      {!localStorage.getItem("token") && <div style={{display: "flex", justifyContent: "flex-start", alignItems: "center", width: "100%", height: "50px", backgroundColor: "black"}}>
        <div>
          <Link style={{color: "white", margin: "0px 20px", textDecoration: "none", cursor: "pointer"}} href="/about-us">About Us </Link>
        </div>
        <div>
          <Link style={{color: "white", margin: "0px 20px", textDecoration: "none", cursor: "pointer"}} href="/sign-up">Sign Up </Link>
          <Link style={{color: "white", margin: "0px 20px", textDecoration: "none", cursor: "pointer"}} href="/">Sign In </Link>
        </div>
      </div>}

   

    <Container component="main" maxWidth="sm">
      <Box
        sx={{
          boxShadow: 3,
          borderRadius: 2,
          px: 1,
          py: 3,
          marginTop: 6,
          display: "flex",
          flexDirection: "column",
          alignItems: "center",
        }}
      >
        <Typography component="h1" variant="h5">
          Sign In
        </Typography>

        <Box component="form" onSubmit={handleSubmit} noValidate sx={{ mt: 1 }}>
          <TextField
            margin="normal"
            required
            fullWidth
            id="email"
            label="Email Address"
            name="email"
            autoComplete="email"
            autoFocus
          />
          <TextField
            margin="normal"
            required
            fullWidth
            name="password"
            label="Password"
            type="password"
            id="password"
            autoComplete="current-password"
          />
          {/* <FormControlLabel
            control={<Checkbox value="remember" color="primary" />}
            label="Remember me"
          /> */}
          <Button
            type="submit"
            fullWidth
            variant="contained"
            sx={{ mt: 3, mb: 2 }}
          >
            Sign In
          </Button>
          <Grid container>
            <Grid item xs>
              {false && <Link href="#" variant="body2">
                Forgot password?
              </Link>}
            </Grid>
            <Grid item>
              <Link href="/sign-up" variant="body2">
                {"Don't have an account? Sign Up"}
              </Link>
            </Grid>
          </Grid>
        </Box>
      </Box>
    </Container>
    </div>
  );
}