import axios from 'axios';

import "./Document.css"

import React,{Component} from 'react';

class Document extends Component {

	state = {

	// Initially, no file is selected
	selectedFile: null
	};
	
	// On file select (from the pop up)
	onFileChange = event => {
	
	// Update the state
	this.setState({ selectedFile: event.target.files[0] });
	
	};

	saveFile() {
		this.getBase64(this.state.selectedFile).then((data) => {
			console.log(this.props)
			let body = {
				baseString: data,
				name: this.state.selectedFile.name,
				type: this.state.selectedFile.type,
				projectName: this.props.projectName
			}
			axios
            .post("https://project-management-backend-w32q.onrender.com/projects/documents", body)
            .then((response) => {
                this.props.getSingleProject()
            });
		})
	}

	download(file) {
		console.log(file)
		this.downloadBase64File(file.baseString, file.name);
	}

	downloadBase64File(base64Data, fileName) {
		const linkSource = `${base64Data}`;
		const downloadLink = document.createElement("a");
		downloadLink.href = linkSource;
		downloadLink.download = fileName;
		downloadLink.click();
	  }
	   
	getBase64(file) {
		return new Promise((resolve, reject) => {
			let reader = new FileReader();
			reader.readAsDataURL(file);	
			reader.onload = function () {
				resolve(reader.result)
			};	
			reader.onerror = function (error) {
				console.log('Error: ', error);
			};	
		})
	}	
	
	// On file upload (click the upload button)
	onFileUpload = () => {
		this.saveFile()
	
	// Create an object of formData
	// const formData = new FormData();
	
	// Update the formData object
	// formData.append(
	// 	"myFile",
	// 	this.state.selectedFile,
	// 	this.state.selectedFile.name
	// );
	
	// Details of the uploaded file
	// console.log(this.state.selectedFile);
	
	// Request made to the backend api
	// Send formData object
	// axios.post("api/uploadfile", formData);
	};
	
	// File content to be displayed after
	// file upload is complete
	fileData = () => {
	
	if (this.state.selectedFile) {
		
		return (
		<div>
			<p>File Name: {this.state.selectedFile.name}</p>

			<p>File Type: {this.state.selectedFile.type}</p>

			<p>
			Last Modified:{" "}
			{this.state.selectedFile.lastModifiedDate.toDateString()}
			</p>

		</div>
		);
	} else {
		return (
		<div>
			<br />
			
		</div>
		);
	}
	};
	
	render() {
	console.log(this.props)
	return (
		<div>
			<h3>

			</h3>
			<div className='doc'>
				<input type="file" onChange={this.onFileChange} />
				{/* <div style={{width: 300}}>{this.state.selectedFile?.name}</div> */}
				<button onClick={this.onFileUpload}>
				Upload!
				</button>
			</div>
			{/* {this.fileData()} */}
			<div>
				<h2 style={{margin: "20px auto", width: 450}}>
					List of already uploaded Documents
				</h2>
				<div style={{width: 500, margin: "20px auto"}}>
					{this.props.data.map((item, index) => {
						return (
							<div>{index+1}: &nbsp;{item.name} <button className='download' onClick={() => this.download(item)}>Download</button></div>
						)
					})}
				</div>
			</div>
		</div>
	);
	}
}

export default Document;
