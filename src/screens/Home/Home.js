import * as React from 'react';
import Box from '@mui/material/Box';
import Button from '@mui/material/Button';
import Typography from '@mui/material/Typography';
import Modal from '@mui/material/Modal';
import './Home.css';
import { useTheme } from '@mui/material/styles';
import OutlinedInput from '@mui/material/OutlinedInput';
import InputLabel from '@mui/material/InputLabel';
import MenuItem from '@mui/material/MenuItem';
import FormControl from '@mui/material/FormControl';
import Select from '@mui/material/Select';
import Chip from '@mui/material/Chip';
import Card from './components/Card';
import axios from "axios"
import AppBar from '@mui/material/AppBar';
import Toolbar from '@mui/material/Toolbar';
import IconButton from '@mui/material/IconButton';
import PowerSettingsNewIcon from '@mui/icons-material/PowerSettingsNew';
import {useNavigate} from 'react-router-dom';
import { useEffect } from 'react';

//import MenuIcon from '@mui/icons-material/Menu';

const style = {
  position: 'absolute',
  top: '50%',
  left: '50%',
  transform: 'translate(-50%, -50%)',
  width: 500,
  height:400,
  bgcolor: 'background.paper',
  border: '2px solid #000',
  boxShadow: 24,
  p: 4,
};
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

function getStyles(name, personName, theme) {
  return {
    fontWeight:
      personName.indexOf(name) === -1
        ? theme.typography.fontWeightRegular
        : theme.typography.fontWeightMedium,
  };
}




const myStyle={
  color:"white",                                                    
  backgroundColor:"black"
}

export default function Home() {

  const navigate = useNavigate();


  const [open, setOpen] = React.useState(false);
  const [listOfUsers, setListOfUsers] = React.useState([])
  const [projects, setProjects] = React.useState([])
  const theme = useTheme();
  const [personName, setPersonName] = React.useState([]);
  const [name, setName] = React.useState("");
  const [description, setDescription]=React.useState("");

  React.useEffect(() => {
    axios.get("http://localhost:5001/users/").then((response) => {
      setListOfUsers(response.data)
    });
    getProjects()
   }, [])

   const getProjects = () => {
    axios.get("http://localhost:5001/projects/").then((response) => {
      setProjects(response.data)
    });
   }

  

   const handleChanges = (event) => {
    const {
      target: { value },
    } = event;
    setPersonName(
      typeof value === 'string' ? value.split(',') : value,
    );
  };


  const handleSubmit = () => {
    axios
      .post("http://localhost:5001/projects/", {
        name: name,
        description: description,
        members: personName
      })
      .then((response) => {
        getProjects()
      });
    setOpen(false)
    setName("")
    setPersonName([])
    setDescription("")
  }

  const HandleClick=()=>{
    localStorage.removeItem("token");
    localStorage.removeItem("email");
    localStorage.removeItem("username");
    let token = localStorage.getItem('token')
    setTimeout(() => {
      if(!token) {
        navigate('/')
      }
    }, 1000);
  }
  
  useEffect(() => {
    let token = localStorage.getItem('token')
    if(!token) {
      navigate('/')
    }    
  }, []);


  return (

    <div className='project'>
        <Box sx={{ flexGrow: 1 }}>
          <AppBar position="static">
            <Toolbar className='pro'>
              <Typography className='projectList' variant="h6" component="div" sx={{ flexGrow: 1 }}>
                Project List
              </Typography>
              <Button className='addprobutton' onClick={()=>setOpen(true)} style={myStyle}><b>Add Project</b></Button>
              <PowerSettingsNewIcon className='power'  onClick={()=>{HandleClick()}} ></PowerSettingsNewIcon>

            </Toolbar>
          </AppBar>
        </Box>
        <div className='cardList'> 
          {
            projects.map(item=> {
              return (
                <Card 
                    data={item}
                /> 
              )
            })
          }
        </div>
      
      <Modal
        open={open}
        onClose={()=>setOpen(false)}
        aria-labelledby="modal-modal-title"
        aria-describedby="modal-modal-description"
      >
        <Box sx={style} className='Modal-container'>
          <div className='heading'>
           <b> Add project</b>
          </div>
          <div className='addProject'>
            <div>Project Name</div>
            <input type='text' className='textbox' value={name} onChange={(e)=>setName(e.target.value)}/>
            <label for="dname">Description</label> 
            <textarea className='textArea' value={description} onChange={(e)=>setDescription(e.target.value)}></textarea>
            <div className='dropdown'>
              <FormControl sx={{ m: 3, width: 300 }}>
                <InputLabel id="demo-multiple-chip-label">Add Members</InputLabel>
                <Select
                  labelId="demo-multiple-chip-label"
                  id="demo-multiple-chip"
                  multiple
                  value={personName}
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
                  {listOfUsers.map((user) => (
                    <MenuItem
                      key={user.email}
                      value={user.email}
                      style={getStyles(user.email, personName, theme)}
                    >
                      {user.name}
                    </MenuItem>  
                  ))}
                </Select>
              </FormControl>
            </div>
            <input className='submitButton' type="submit" onClick={()=> handleSubmit()} />
          </div>
        </Box> 
      </Modal>
    </div>
  );
}
