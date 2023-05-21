import '../ProjectDetails.css';

export default function BugsPage(props){

    return(

        <div className="Buglist">
                <div className='bugCheckbox'><input type="checkbox" onClick={(e) => props.handleChecked(e.target.value === "on" ? true : false, props.data.description)} checked={props.data.checked}  disabled={props.data.checked}/></div>
                <div  className='bugDescpn'
                style={{textDecoration: props.data.checked ? "none" : "none", opacity: props.data.checked ? "0.5" : "1"}}
                >{props.data.description}</div>
            

            <div className="bugMember">Assigned To: {props.data.members[0]?.name}</div>
        </div>

    )
        

}