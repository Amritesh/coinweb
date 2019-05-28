/*global firebaseUser */
import React, {Component} from 'react';
import firebase from 'firebase/app';
import 'firebase/auth';
import 'firebase/database';
import bootParams from '../bootParams';
import utils from '../utils';

export default class Login extends Component{
    constructor(props){
        super(props);
        this.state={
            form:{
                firstName:null,
                lastName:null,
                email:null,
                password:null
            },
            errorMessage:null
        };
    }
    setData(field,data){
        let stateJSON={
            form : this.state.form
        };
        if(field==='firstName') stateJSON.form.firstName = data;
        if(field==='email') stateJSON.form.email = data;
        if(field==='lastName') stateJSON.form.lastName = data;
        if(field==='password') stateJSON.form.password = data;
        if(field==='name') stateJSON.form.name = data;

        this.setState(stateJSON);
    }
    submit(){
        let scope = this;
        if(utils.getQueryParams('subtype')==='signup'){
            let user = null;
		
            firebase.auth().createUserWithEmailAndPassword(scope.state.form.email, scope.state.form.password)
                .then(function () {
                    user = firebase.auth().currentUser;
                    user.updateProfile({
                        displayName: scope.state.form.name
                    });
                })
                .catch(function(error) {
                    scope.setState({
                        errorMessage : error.message
                    });
                });
        } else {
            firebase.auth().signInWithEmailAndPassword(scope.state.form.email, scope.state.form.password)
                .then(()=>{
                    window.location = decodeURIComponent(utils.getQueryParams('redirectpath'));
                })
                .catch(function(error) {
                    scope.setState({
                        errorMessage : error.message
                    });
                });
        }
    }
    socialLogin(providerName){
        var provider;
        if(providerName==='google') provider = new firebase.auth.GoogleAuthProvider();
        if(providerName==='facebook') provider = new firebase.auth.FacebookAuthProvider();
        firebase.auth().signInWithRedirect(provider);
    }
    render(){
        let scope = this;
        var auth = firebase.auth();
        if(!scope.state.errorMessage){
            auth.getRedirectResult().then(function() {
                // console.log(authData);
                return;
            }).catch(function(error) {
                if (error.code === 'auth/account-exists-with-different-credential') {
                    var pendingCred = error.credential;
                    var email = error.email;
                    auth.fetchProvidersForEmail(email).then(function(methods) {
                        if (methods[0] === 'password') {
                            // var password = promptUserForPassword(); // TODO: implement promptUserForPassword.
                            // auth.signInWithEmailAndPassword(email, password).then(function(user) {
                            //     return user.link(pendingCred);
                            // }).then(function() {
                            // goToApp();
                            // });
                            return;
                        }
                        var provider;
                        if(methods[0]==='google.com') provider = new firebase.auth.GoogleAuthProvider();
                        if(methods[0]==='facebook.com') provider = new firebase.auth.FacebookAuthProvider();
                        alert('You already have an account but with a different provider @ '+methods[0]+', sign in with the old provider to link this provider.'); 
                        auth.signInWithPopup(provider).then(function(result) {
                            result.user.linkAndRetrieveDataWithCredential(pendingCred).then(function() {
                                return;
                            });
                        });
                    });
                } else {
                    let json = scope.state;
                    json.errorMessage = error;
                    scope.setState(json);
                }
            });
        }
        let signup = (utils.getQueryParams('subtype')==='signup')?true:false;
        // window.history.pushState({},'',window.location.href);
        var redirectpath = decodeURIComponent(utils.getQueryParams('redirectpath'));
        if(redirectpath && redirectpath.includes('login')){
            redirectpath='/';
        }
        if(firebaseUser.uid && redirectpath){
            window.location = redirectpath;
        }
        
        return(
            <div style={{display: 'flex'}}>
                <div className='center-flex login-container'>
                    <h3 className='pb-3 uppercase-text' style={{fontWeight:'700'}}>
                        {(signup)?'Please sign Up with your email ID':'Please sign in to continue'}
                    </h3>
                    <div style={{width:bootParams.isSmallScreen?'90%':'50%'}}>
                        {/*<h5 className="py-3 mt-3" style={{margin: '0px'}}>using email</h5>*/}
                        <div className='center-flex mt-3'>
                            <button className="py-3 mr-3 border-0 blue-button rounded" style={{justifyContent:'center',width:'100%',cursor:'pointer',fontWeight:'700',fontSize:'1.2em',whiteSpace:'nowrap',background:'#dd4b39',color:'white'}}
                                onClick={()=>{scope.socialLogin('google');}}>
                                GOOGLE
                            </button>
                            <button className="py-3 border-0 blue-button rounded" style={{justifyContent:'center',width:'100%',cursor:'pointer',fontWeight:'700',fontSize:'1.2em',whiteSpace:'nowrap',background:'#3b5998',color:'white'}}
                                onClick={()=>{scope.socialLogin('facebook');}}>
                                FACEBOOK
                            </button> 
                        </div>
                        <p className="py-3" style={{margin: '0px', textAlign: 'center'}}>or via email</p>
                        <div className='center-flex'>
                            <input type="text"
                                className="form-control form-control-lg rounded m-3"
                                placeholder="Email Address"
                                onChange={e=>{scope.setData('email',e.target.value);}}/>
                            <input type="password"
                                className="form-control form-control-lg rounded m-3"
                                placeholder="Password"
                                onChange={e=>{scope.setData('password',e.target.value);}}/>
                        </div>
                        {(signup)?<input type="name"
                            className="form-control form-control-lg rounded m-3"
                            placeholder="Name"
                            onChange={e=>{scope.setData('name',e.target.value);}}/>:null}
                        {scope.state.errorMessage?(
                            <p className='py-2' style={{color:'red'}}>{'Error: ' + scope.state.errorMessage}</p>
                        ):null}
                        <div style={{display: 'flex', alignItems: 'baseline', flexDirection: 'column'}}>
                            <button className="py-3 border-0 blue-button rounded" style={{justifyContent:'center',width:'100%',cursor:'pointer',fontWeight:'700',fontSize:'1.2em'}}
                                onClick={()=>{scope.submit();}}>
                                {(signup)?'SIGN UP':'SIGN IN'}
                            </button>
                            {/* {signup?null:<a style={{cursor: 'pointer',textDecoration: 'underline'}} onClick={()=>{$('#ForgotPasswordModal').modal('show');}}>Forgot password</a>} */}
                        </div>
                    </div>
                    {signup
                        ?(<p className='pt-3'>Back to <a href='/login?redirectpath=/'>Sign In</a></p>)
                        :(<p className='pt-3'><a href='/login?subtype=signup&redirectpath=/'>Sign Up</a> using email</p>)}
                </div>
                <div className='center-flex login-banner'></div> 
            </div>
        );
    }
}