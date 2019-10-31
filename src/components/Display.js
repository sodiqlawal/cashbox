import React from 'react';
import axios from 'axios';


export default class Display extends React.Component {
    constructor(props){
        super(props)
        this.state={
            data:[]
        }
    }



    componentDidMount() {
        axios.get('https://jsonplaceholder.typicode.com/posts').then(response => this.setState({data:response})) 
    }

    render(){
        console.log(this.state.data)
        return(
            <React.Fragment>
                <div  className='container-fluid pt4'>
                <table className="table w-100">
                    <thead>
                        <tr>
                        <th scope="col">#</th>
                        <th scope="col">FirstName</th>
                        <th scope="col">Surname</th>
                        <th scope="col">Actions<button className='ml3'>Create+</button></th>
                        </tr>
                    </thead>
                    <tbody>
                        <tr>
                        <th scope="row">1</th>
                        <td>Sodiq</td>
                        <td>Lawal</td>
                        <td>
                            <div className="action">
                                <button>More...</button>
                                <button className='edit'>Edit</button>
                                <button className='delete'>Delete</button>
                                </div>
                                </td>
                        </tr>
                    </tbody>
                    </table>
                </div>
            </React.Fragment>
        )
    }
}



// export default Display;