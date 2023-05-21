import {Routes, Route, useNavigate} from 'react-router-dom';
export default function Card(props){

    const navigate = useNavigate();

    // console.log(props.data)

    return(

        <div className="cards">
            <div className="cardName"> {props.data.name} </div>
            <div > {props.data.description} </div>
            <button className="cardButton" onClick={()=>navigate(`/details/${props.data.name}`)}>View Details</button>
            <div className="cardMember">Number of members: {props.data.members.length}</div>
        </div>

    )
        

}