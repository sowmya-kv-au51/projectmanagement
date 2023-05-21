export default function TasksPage(props){

    // console.log(props.data)

    return(

        <div className="Tasklist">
                <div className='taskCheckbox'><input type="checkbox" onClick={(e) => props.handleChecked(e.target.value === "on" ? true : false, props.data.description)}  checked={props.data.checked}  disabled={props.data.checked}/></div>
                <div  className='taskDescpn'
                style={{textDecoration: props.data.checked ? "none" : "none", opacity: props.data.checked ? "0.5" : "1"}}
                >{props.data.description}</div>
            

            <div className="taskMember">Assigned To: {props.data.members[0].name}</div>
        </div>

    )
        

}