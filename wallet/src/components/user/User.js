/*global firebaseUser*/
import bootParams from '../../bootParams';
import React, {Component} from 'react';
import { Button } from 'antd';
export default class User extends Component {
    constructor(props){
        super(props);
        this.state = {addressList: [], userInfo: {}}
    }
    componentDidMount(){
        firebaseUser.ref.addressList.on('value', (snapshot)=>{
            let addressList = snapshot.val() || [];
            this.setState({addressList});
        });
        firebaseUser.ref.userInfo.on('value', (snapshot)=>{
            let userInfo = snapshot.val() || [];
            this.setState({userInfo});
        }); 
    }
    createNew(){
        fetch(bootParams.CLOUD_FUNCTIONS_URLS.generateAddress,{mode: 'cors'})
        .then(function(response) {
            return response.json();
        })
        .then(function(response){
            let address = response.address;
            firebaseUser.ref.addressList.child(address).set({
                address: address,
                time: Date.now()
            });
            firebaseUser.ref.userInfo.child('lastIndex').set(address);
        })
    }
    render() {
        const {addressList, userInfo} = this.state;
        return firebaseUser.uid?(<div>
            <h1>{userInfo.name}</h1>
            <h1>Last Address Used</h1>
            <p>{userInfo.lastIndex}</p>
            <h1>Used Addresses</h1>
            <ul>
            {
                Object.keys(addressList).map((address, index)=>{
                    return <li key={index}>{address}</li>
                })
            }
            </ul>
            <Button onClick={()=>{this.createNew()}}>Create new address and add to DB</Button>
        </div>):(<h1>User not logged in</h1>);
    }
}