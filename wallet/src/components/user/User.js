/*global firebaseUser*/
import React, {Component} from 'react';
export default class User extends Component {
    constructor(props){
        super(props);
        this.state = {addressList: []}
        firebaseUser.ref.addressList.on('value', (snapshot)=>{
            let addressList = snapshot.val() || [];
            this.setState({addressList});
        });
    }
    createNew(){
        //Create new Addresses from bitcoinjs
        let address = Math.random().toString(36).substring(2);
        firebaseUser.ref.addressList.child(address).set({
            address: address,
            time: Date.now()
        })
    }
    render() {
        const {addressList} = this.state; 
        return (<div>
            <h1>List of Addresses</h1>
            {
                Object.keys(addressList).map((address, index)=>{
                    return <p key={index}>{address}</p>
                })
            }
            <button onClick={()=>{this.createNew()}}>Create and add to DB</button>
        </div>);
    }
}