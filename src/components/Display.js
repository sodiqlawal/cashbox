import React from 'react';
import { FormGroup, Label, Input, Button, Modal, ModalHeader, ModalBody, ModalFooter } from 'reactstrap';
import axios from 'axios';


export default class Display extends React.Component {
    constructor(props) {
        super(props)
        this.state = {
            data: [],
            newUserCreateDataModal: false,
            newUserDisplayDataModal: false,
            newUserData: {
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
        // using axios to get our api
        axios.get('http://localhost:3010/data')
            .then(response => this.setState({ data: response.data }))

    }


    // to toggle the modal for create button
    toggleNewUserCreateDataModal = () => {
        this.setState({
            newUserCreateDataModal: !this.state.newUserCreateDataModal
        });
    }

    // to toggle the modal for more button
    toggleNewUserDisplayDataModal = () => {
        this.setState({
            newUserDisplayDataModal: !this.state.newUserDisplayDataModal
        });
    }


    // This method post the input data to the postgres database
    onSubmit = (e) => {
        // e.preventDefault();
        fetch('http://localhost:3010', {
            method: 'post',
            headers: { 'Content-Type': 'application/json' },
            body: JSON.stringify({
                firstname: this.state.newUserData.firstname,
                surname: this.state.newUserData.surname,
                dob: this.state.newUserData.dob
            })
        }).then(response => response.json())
            .then(dat => {
                // console.log(dat);
            let { data } = this.state;
            data.push(dat)
            this.setState({ data, newUserCreateDataModal:false,newUserData: {
                firstname: '',
                surname: '',
                dob: '',
                gender: '',
                height: '',
                haircolor: '',
                weight: ''

            } })
            })
    }

    // method for removing the user
    removeUser = id => {
        let { data } = this.state;
        data.find((user) => {
            return user.id === id
            
        })
        console.log(id)

        fetch('http://localhost:3010/remove/' + id, {
            method: 'DELETE',
            }).then(response => response.json())
            .then(data=> console.log(data))
        // axios.delete('http://localhost:3010/remove/', + id).then(response=> response.json())
        // .then(data=> console.log(data))
    }

    render() {

        return (
            <React.Fragment>
                <div className='container-fluid pt4'>
                    {/* start of create modal */}
                    <Button color="primary" onClick={this.toggleNewUserCreateDataModal}>Create+</Button>
                    <Modal isOpen={this.state.newUserCreateDataModal} toggle={this.toggleNewUserCreateDataModal}>
                        <ModalHeader className="text-danger" toggle={this.toggleNewUserCreateDataModal}>Create a new user data</ModalHeader>
                        <ModalBody>
                            <FormGroup>
                                <Label for="firstname">FirstName</Label>
                                <Input type="text" id="firstname" value={this.state.newUserData.firstname} onChange={e => {
                                    let { newUserData } = this.state;
                                    newUserData.firstname = e.target.value;
                                    this.setState({ newUserData })
                                }} />
                            </FormGroup>
                            <FormGroup>
                                <Label for="surname">Surname</Label>
                                <Input type="text" id="surname" value={this.state.newUserData.surname} onChange={e => {
                                    let { newUserData } = this.state;
                                    newUserData.surname = e.target.value;
                                    this.setState({ newUserData })
                                }} />
                            </FormGroup>
                            <FormGroup>
                                <Label for="dateofbirth">Date of Birth</Label>
                                <Input type="date" id="dateofbirth" value={this.state.newUserData.dob} onChange={e => {
                                    let { newUserData } = this.state;
                                    newUserData.dob = e.target.value;
                                    this.setState({ newUserData })
                                }} />
                            </FormGroup>
                            <FormGroup>
                                <Label for="gender">Gender</Label>
                                <Input type="select" name="gender" id="gender" className="ml2" value={this.state.newUserData.gender} onChange={e => {
                                    let { newUserData } = this.state;
                                    newUserData.gender = e.target.value;
                                    this.setState({ newUserData })
                                }} >
                                    <option></option>
                                    <option>Male</option>
                                    <option>Female</option>
                                </Input>
                            </FormGroup>
                            <FormGroup>
                                <Label for="height">Height(m)</Label>
                                <Input type="text" id="height" value={this.state.newUserData.height} onChange={(e) => {
                                    let { newUserData } = this.state;
                                    newUserData.height = e.target.value;
                                    this.setState({ newUserData })
                                }} />
                            </FormGroup>
                            <FormGroup>
                                <Label for="haircolor">Hair Color</Label>
                                <Input type="text" id="haircolor" value={this.state.newUserData.haircolor} onChange={e => {
                                    let { newUserData } = this.state;
                                    newUserData.haircolor = e.target.value;
                                    this.setState({ newUserData })
                                }} />
                            </FormGroup>
                            <FormGroup>
                                <Label for="weight">Weight</Label>
                                <Input type="text" id="weight" value={this.state.newUserData.weight} onChange={e => {
                                    let { newUserData } = this.state;
                                    newUserData.weight = e.target.value;
                                    this.setState({ newUserData })
                                }} />
                            </FormGroup>
                        </ModalBody>
                        <ModalFooter>
                            <Button type="submit" color="primary" onClick={() => { this.toggleNewUserCreateDataModal(); this.onSubmit() }}>Submit</Button>{' '}
                            <Button color="secondary" onClick={this.toggleNewUserCreateDataModal}>Cancel</Button>
                        </ModalFooter>
                    </Modal>
                    {/* end of create modal */}


                    <table className="table w-100">
                        <thead>
                            <tr>
                                <th scope="col">#</th>
                                <th scope="col"></th>
                                <th scope="col">Surname</th>
                                <th scope="col">Actions</th>
                            </tr>
                        </thead>
                        
                            {   
                                this.state.data.map((dat, i) => {
                                    let params = dat.id
                                    return <tbody key={i}> 
                                        <tr>
                                        <th scope="row">{dat.id}</th>
                                        <td>{dat.firstname}</td>
                                        <td>{dat.surname}</td>
                                        <td>
                                            <div className="action">
                                                <button className="more bg-primary" onClick={this.toggleNewUserDisplayDataModal}>More...</button>
                                                <button className='edit'>Edit</button>
                                                <button className='delete'
                                                onClick={()=>this.removeUser(params)}
                                                >Delete</button>
                                            </div>
                                        </td>
                                    </tr>
                                    </tbody>
                                })
                               
                            }
                        
                    </table>

                    {/* start of more modal */}
                    <Modal isOpen={this.state.newUserDisplayDataModal} toggle={this.toggleNewUserDisplayDataModal}>
                        <ModalHeader className="text-danger" toggle={this.toggleNewUserDisplayDataModal}>Complete User Profile</ModalHeader>
                        { this.state.data.map((data, i) => (
                        <ModalBody key={i}>
                            <FormGroup>
                                <Label for="firstname" className="b">FirstName:</Label>
                                <p>{data.firstname}</p>
                            </FormGroup>
                            <FormGroup>
                                <Label for="surname" className="b">Surname:</Label>
                                <p>{data.surname}</p>
                            </FormGroup>
                            <FormGroup>
                                <Label for="dateofbirth" className="b">Date Of Birth:</Label>
                                <p>{data.dob}</p>
                            </FormGroup>
                            <FormGroup>
                                <Label for="gender" className="b">Gender:</Label>
                                <p>{this.state.newUserData.gender}</p>
                            </FormGroup>
                            <FormGroup>
                                <Label for="height" className="b">Height(m):</Label>
                                <p>{this.state.newUserData.height}</p>
                            </FormGroup>
                            <FormGroup>
                                <Label for="haircolor" className="b">Hair Color:</Label>
                                <p>{this.state.newUserData.haircolor}</p>
                            </FormGroup>
                            <FormGroup>
                                <Label for="weight" className="b">Weight:</Label>
                                <p>{this.state.newUserData.weight}</p>
                            </FormGroup>
                        </ModalBody>
                        ))
                        }
                        <ModalFooter>
                            <Button color="secondary" onClick={this.toggleNewUserDisplayDataModal}>Cancel</Button>
                        </ModalFooter>
                    </Modal>
                    {/* end of more modal */}

                </div>
            </React.Fragment>
        )
    }
}



// export default Display;