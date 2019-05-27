/*global firebaseUser*/
import React, {Component} from 'react';
export default class User extends Component {
    constructor(props){
        super(props);
        this.state = {addressList: []}
        firebaseUser.ref.addressList.on('value', (snapshot)=>{
            this.setState({addressList: snapshot.val()});
        });
    }
    createNew(){
        let address = "asdasd";
        firebaseUser.ref.addressList.child(address).set({
            address: address,
            time: Date.now()
        })
    }
    render() {
        const {addressList} = this.state; 
        return (<div>{
            addressList.map((address, index)=>{
                return <p key={index}>{address}</p>
            })
        }
        <button onClick={()=>{
            debugger;
            this.createNew()}}>Create and add to DB</button>
        </div>);
    }
}