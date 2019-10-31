import React from 'react';
import { FormGroup, Label, Input, Button, Modal, ModalHeader, ModalBody, ModalFooter } from 'reactstrap';
import axios from 'axios';


export default class Display extends React.Component {
    constructor(props){
        super(props)
        this.state={
            data:[],
            newUserCreateDataModal: false,
            newUserDisplayDataModal: false,
            newUserData:{
                firstname: '',
                surname: '',
                dob: '',
                gender: '',
                height: '',
                haircolor: '',
                weight: ''

            }
        }
    }



    componentDidMount() {
        axios.get('https://jsonplaceholder.typicode.com/posts')
        .then(response => this.setState({data:response})) 
    }

    toggleNewUserCreateDataModal = () => {
        this.setState({
          newUserCreateDataModal:!this.state.newUserCreateDataModal
        });
      }

      toggleNewUserDisplayDataModal = () => {
        this.setState({
          newUserDisplayDataModal:!this.state.newUserDisplayDataModal
        });
      }

    render(){
        console.log(this.state.data)
        return(
            <React.Fragment>
                <div  className='container-fluid pt4'>
                {/* start of create modal */}
                <Button color="primary" onClick={this.toggleNewUserCreateDataModal}>Create+</Button>
                <Modal isOpen={this.state.newUserCreateDataModal} toggle={this.toggleNewUserCreateDataModal}>
                <ModalHeader className="text-danger" toggle={this.toggleNewUserCreateDataModal}>Create a new user data</ModalHeader>
                <ModalBody>
                    <FormGroup>
                    <Label for="firstname">FirstName</Label>
                    <Input type="text" id="firstname" />
                    </FormGroup>
                    <FormGroup>
                    <Label for="surname">Surname</Label>
                    <Input type="text" id="surname" />
                    </FormGroup>
                    <FormGroup>
                    <Label for="dateofbirth">Date of Birth</Label>
                    <Input type="date" id="dateofbirth" />
                    </FormGroup>
                    <FormGroup>
                    <Label for="gender">Gender</Label>
                    <Input type="select" name="gender" id="gender" className="ml2">
                        <option></option>
                        <option>Male</option>
                        <option>Female</option>
                    </Input>
                    </FormGroup>
                    <FormGroup>
                    <Label for="height">Height(m)</Label>
                    <Input type="text" id="height" value={this.state.newUserData.height} onChange={(e)=>{
                        let { newUserData } = this.state;
                        newUserData.height = e.target.value;
                        this.setState({ newUserData })
                    }}/>
                    </FormGroup>
                    <FormGroup>
                    <Label for="haircolor">Hair Color</Label>
                    <Input id="haircolor" />
                    </FormGroup>
                    <FormGroup>
                    <Label for="weight">Weight</Label>
                    <Input id="weight" />
                    </FormGroup>
                </ModalBody>
                <ModalFooter>
                    <Button typr="submit" color="primary" onClick={this.toggleNewUserCreateDataModal}>Submit</Button>{' '}
                    <Button color="secondary" onClick={this.toggleNewUserCreateDataModal}>Cancel</Button>
                </ModalFooter>
                </Modal>
                {/* end of create modal */}


                <table className="table w-100">
                    <thead>
                        <tr>
                        <th scope="col">#</th>
                        <th scope="col">FirstName</th>
                        <th scope="col">Surname</th>
                        <th scope="col">Actions</th>
                        </tr>
                    </thead>
                    <tbody>
                        <tr>
                        <th scope="row">1</th>
                        <td>Sodiq</td>
                        <td>Lawal</td>
                        <td>
                            <div className="action">
                                <button className="more bg-primary" onClick={this.toggleNewUserDisplayDataModal}>More...</button>
                                <button className='edit'>Edit</button>
                                <button className='delete'>Delete</button>
                                </div>
                                </td>
                        </tr>
                    </tbody>
                    </table>

                {/* start more modal */}
                <Modal isOpen={this.state.newUserDisplayDataModal} toggle={this.toggleNewUserDisplayDataModal}>
                <ModalHeader className="text-danger" toggle={this.toggleNewUserDisplayDataModal}>Complete User Profile</ModalHeader>
                <ModalBody>
                    <FormGroup>
                    <Label for="firstname" className="b">FirstName:</Label>
                    <p>Sodiq</p>
                    </FormGroup>
                    <FormGroup>
                    <Label for="surname" className="b">Surname:</Label>
                    <p>Lawal</p>
                    </FormGroup>
                    <FormGroup>
                    <Label for="dateofbirth" className="b">Date Of Birth:</Label>
                    <p></p>
                    </FormGroup>
                    <FormGroup>
                    <Label for="gender" className="b">Gender:</Label>
                    <p>Male</p>
                    </FormGroup>
                    <FormGroup>
                    <Label for="height" className="b">Height(m):</Label>
                    <p></p>
                    </FormGroup>
                    <FormGroup>
                    <Label for="haircolor" className="b">Hair Color:</Label>
                    <p></p>
                    </FormGroup>
                    <FormGroup>
                    <Label for="weight" className="b">Weight:</Label>
                    <p></p>
                    </FormGroup>
                </ModalBody>
                <ModalFooter>
                    <Button typr="submit" color="primary" onClick={this.toggleNewUserDisplayDataModal}>Submit</Button>{' '}
                    <Button color="secondary" onClick={this.toggleNewUserDisplayDataModal}>Cancel</Button>
                </ModalFooter>
                </Modal>              
                {/* end more modal */}
                </div>
            </React.Fragment>
        )
    }
}



// export default Display;