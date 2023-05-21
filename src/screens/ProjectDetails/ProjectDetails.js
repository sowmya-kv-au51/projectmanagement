import * as React from 'react';
import Button from '@mui/material/Button';
import { useTheme } from '@mui/material/styles';
import './ProjectDetails.css';
import Box from '@mui/material/Box';
import Modal from '@mui/material/Modal';
import OutlinedInput from '@mui/material/OutlinedInput';
import InputLabel from '@mui/material/InputLabel';
import MenuItem from '@mui/material/MenuItem';
import FormControl from '@mui/material/FormControl';
import Select from '@mui/material/Select';
import Chip from '@mui/material/Chip';
import { useState } from "react";
import BugsPage from './components/BugsPage';
import TasksPage from './components/TasksPage';
import Document from './components/Document';
import Link from "@mui/material/Link";
import axios from "axios";
import AppBar from '@mui/material/AppBar';
import Toolbar from '@mui/material/Toolbar';
import Typography from '@mui/material/Typography';
import IconButton from '@mui/material/IconButton';
import PowerSettingsNewIcon from '@mui/icons-material/PowerSettingsNew';
import ArrowBackIcon from '@mui/icons-material/ArrowBack';
import {useNavigate} from 'react-router-dom';
import { useEffect } from 'react';
//import ArrowLeftOutlinedIcon from '@mui/icons-material/ArrowLeftOutlined';
//import Button from '@material-ui/core/Button';
// import PhotoCamera from '@material-ui/icons/PhotoCamera';
// import IconButton from '@material-ui/core/IconButton';

let Bugs=[{completed: false, description: "Lorem Ipsum is simply dummy text of the printing and typesetting industry. Lorem Ipsum has been the industry's standard dummy text ever since the 1500s", members: [{name: "Sow"}]},
{completed: true, description: "Lorem Ipsum is simply dummy text of the printing and typesetting industry. Lorem Ipsum has been the industry's standard dummy text ever since the 1500s", members: [{name: "Sowmy"}]},
{completed: false, description: "Lorem Ipsum is simply dummy text of the printing and typesetting industry. Lorem Ipsum has been the industry's standard dummy text ever since the 1500s", members: [{name: "Sowmya"}]},
]

let Tasks=[{completed: false, description: "Lorem Ipsum is simply dummy text of the printing and typesetting industry. Lorem Ipsum has been the industry's standard dummy text ever since the 1500s", members: [{name: "Sow"}]},
{completed: false, description: "Lorem Ipsum is simply dummy text of the printing and typesetting industry. Lorem Ipsum has been the industry's standard dummy text ever since the 1500s", members: [{name: "Sowmy"}]},
{completed: false, description: "Lorem Ipsum is simply dummy text of the printing and typesetting industry. Lorem Ipsum has been the industry's standard dummy text ever since the 1500s", members: [{name: "Sowmya"}]},
]





const ITEM_HEIGHT = 48;
const ITEM_PADDING_TOP = 8;
const MenuProps = {
  PaperProps: {
    style: {
      maxHeight: ITEM_HEIGHT * 4.5 + ITEM_PADDING_TOP,
      width: 250,
    },
  },
};

  function getStyles(name, employeeName, theme) {
    return {
      fontWeight:
        employeeName.indexOf(name) === -1
          ? theme.typography.fontWeightRegular
          : theme.typography.fontWeightMedium,
    };
  }


const myStyle={
    color:"white",
    backgroundColor:"black"
  }
  const style = {
    position: 'absolute',
    top: '50%',
    left: '50%',
    transform: 'translate(-50%, -50%)',
    width: 400,
    bgcolor: 'background.paper',
    border: '2px solid #000',
    boxShadow: 24,
    p: 4,
  };
export default function ProjectDetails(){

    const navigate = useNavigate();

    const [selectedTab, setSelectedTab] = React.useState("Bugs");
    const [projectDetails, setProjectDetails] = React.useState({})
    const [listOfUsers, setListOfUsers] = React.useState([])
    const[employeeName,setEmployeeName]=React.useState([])
    const[description ,setDescriptionBug]=React.useState("")
    const [open, setOpen] = React.useState(false);
    const handleOpen = () => setOpen(true);
    const handleClose = () => setOpen(false);
    const theme = useTheme();

    const HandleClick=()=>{
        localStorage.removeItem("token");
        localStorage.removeItem("email");
        localStorage.removeItem("username");
        let token = localStorage.getItem('token')
        setTimeout(() => {
          if(!token) {
            navigate('/')
          }
        }, 900);
      }
      
      useEffect(() => {
        let token = localStorage.getItem('token')
        if(!token) {
          navigate('/')
        }    
      }, []);

    React.useEffect(() => {
        getSingleProject()
    }, [])

    const getSingleProject = () => {
        let projectName = window.location.pathname.replace("/details/", "")
        axios.get(`https://project-managementbackend-production.up.railway.app/projects/${projectName}`).then((response) => {
            setProjectDetails(response.data[0])
            getListOfUsers()                
        });
    }

    const getListOfUsers = () => {
        axios.get("https://project-managementbackend-production.up.railway.app/users/").then((response) => {
            setListOfUsers(response.data)
        });
    }

    const handleChanges = (event) => {
        const {
          target: { value },
        } = event;
        setEmployeeName(
          typeof value === 'string' ? value.split(',') : value,
        );
      };

    const handleSubmit=()=>{
        let assignedEmployee = listOfUsers?.filter(user => user.email === employeeName[0])
        console.log(assignedEmployee)
        let projectName = window.location.pathname.replace("/details/", "")
        if(selectedTab === "Bugs") {
            axios
            .post("https://project-managementbackend-production.up.railway.app/projects/bugs", {
              projectName: projectName,
              checked: false,
              description: description,
              members: assignedEmployee
            })
            .then((response) => {
                getSingleProject()
            });
        }
        else {
            axios
            .post("https://project-managementbackend-production.up.railway.app/projects/tasks", {
              projectName: projectName,
              checked: false,
              description: description,
              members: assignedEmployee
            })
            .then((response) => {
                getSingleProject()
            });            
        }
        setOpen(false)
    }

    const handleChecked = (checked, description) => {
        let projectName = window.location.pathname.replace("/details/", "")
        if(selectedTab === "Bugs") {
            axios
            .patch("https://project-managementbackend-production.up.railway.app/projects/bugs", {
              projectName: projectName,
              checked: checked,
              description: description,
            })
            .then((response) => {
                getSingleProject()
            });
        }
        else {
            axios
            .patch("https://project-managementbackend-production.up.railway.app/projects/tasks", {
              projectName: projectName,
              checked: checked,
              description: description,
            })
            .then((response) => {
                getSingleProject()
            });
        }
    }

    let userOptions = []

    listOfUsers.filter(user => {
        if(projectDetails.members.indexOf(user.email) > -1) {
            userOptions.push(user)
        }
    })

    let projectName = window.location.pathname.replace("/details/", "")
    return(

        <div className="projectDetails">
            <Box sx={{ flexGrow: 1 }}>
                <AppBar position="static">
                    <Toolbar>
                        <ArrowBackIcon onClick={()=>{navigate('/home')}} className='arrow'></ArrowBackIcon>
                    <Typography className='pro-Heading' variant="h6" component="div" sx={{ flexGrow: 1 }}>
                    Project Details - {projectDetails.name}
                    </Typography>  
                    <PowerSettingsNewIcon className='power' onClick={()=>{HandleClick()}} ></PowerSettingsNewIcon>
                    </Toolbar>
                </AppBar>
            </Box>
            
            {/* <div className='navPro'>
                <Link className='linkDetails' href="/home">{"Go back"}</Link>
                <div className='pro-Heading'>Project Details - {projectDetails.name}</div>
                <button>Meetings</button>
            </div> */}
            <div className='pro-tabs-container' >
                <button
                    style={{backgroundColor: selectedTab === "Bugs" ? "#ff5e00" : "white", color: selectedTab === "Bugs" ? "white" : "#ff5e00"}}
                    className='single-tab' onClick={()=> setSelectedTab("Bugs")}>Bugs</button>
                <button 
                    style={{backgroundColor: selectedTab === "Tasks" ? "#ff5e00" : "white", color: selectedTab === "Tasks" ? "white" : "#ff5e00"}}
                    className='single-tab' onClick={()=> setSelectedTab("Tasks")}>Tasks</button>
                <button
                    style={{backgroundColor: selectedTab === "documents" ? "#ff5e00" : "white", color: selectedTab === "documents" ? "white" : "#ff5e00"}}                
                    className='single-tab' onClick={()=> setSelectedTab("documents")}>Documents</button>
            </div>

                {selectedTab === "Bugs" && 
                <div className='bugss'> 
                    <h2 className='bugsHead'>List of Bugs</h2>
                        <div>
                            <Button className='button2' onClick={()=>setOpen(true)} style={myStyle}><b>Add Bugs</b></Button>                       
                        </div>
            <               div className='bugsList'> 
                            {
                                projectDetails?.bugs?.map(item=> {
                                return (
                                    <BugsPage 
                                        handleChecked={handleChecked}
                                        data={item}
                                    /> 
                                )
                                })
                             }
                            </div>
                </div>
            }
            {selectedTab === "Tasks" && 
                <div className='taskss'> 
                    <h2 className='headings'>Tasks List</h2>
                        <div>
                            <Button className='button3' onClick={()=>setOpen(true)} style={myStyle}><b>Add Tasks</b></Button>                       
                            
                        </div> 
                        <div className='tasksList'> 
                            {
                                projectDetails?.tasks.map(item=> {
                                return (
                                    <TasksPage
                                        handleChecked={handleChecked}
                                        data={item}
                                    /> 
                                )
                                })
                             }
                            </div>

                </div>
            }
            {selectedTab === "documents" && 

                <div>
                   
                <Document data={projectDetails?.documents} getSingleProject={getSingleProject} projectName={projectName}/>

                    
                 </div>
                
            }
            <div className='Modal-container'>
            <Modal
                open={open}
                onClose={handleClose}
                aria-labelledby="modal-modal-title"
                aria-describedby="modal-modal-description"
            >
                <Box sx={style}>
                    <div className='headings'>{selectedTab}</div> 
                    <div className='headName'>{selectedTab} name</div>
                    <input type='text' className='textTab' value={description} onChange={(e)=>setDescriptionBug(e.target.value)}/>
                    <div className='dropdown'>
                        <FormControl sx={{ m: 3, width: 300 }}>
                            <InputLabel id="demo-multiple-chip-label">Add Members</InputLabel>
                            <Select
                            labelId="demo-multiple-chip-label"
                            id="demo-multiple-chip"
                            value={employeeName}
                            onChange={handleChanges}
                            input={<OutlinedInput id="select-multiple-chip" label="Add Members" />}
                            renderValue={(selected) => (
                                <Box sx={{ display: 'flex', flexWrap: 'wrap', gap: 0.5 }}>
                                {selected.map((value) => (
                                    <Chip key={value} label={value} />
                                ))}
                                </Box>
                            )}
                            MenuProps={MenuProps}
                            >
                            {userOptions.map((user) => (
                                <MenuItem
                                key={user.email}
                                value={user.email}
                                style={getStyles(user.email, employeeName, theme)}
                                >
                                {user.name}
                                </MenuItem>  
                            ))}
                            </Select>
                        </FormControl>
                    </div>
                    <input className='submitButton' type="submit" onClick={()=> handleSubmit()} />
                </Box>

            </Modal>
            </div>

        </div>

    )
}