/*global firebaseUser*/
export default class UserInfoService {
    constructor(){
        let scope = this;
        firebaseUser.ref.userInfo.once('value', function(snapshot){
            let userInfo = snapshot.val();
            if(!userInfo){
                userInfo = {};
                userInfo.name = firebaseUser.displayName;
                userInfo.uid = firebaseUser.uid;
                userInfo.email = firebaseUser.email;
                userInfo.mobile = '9999999999';
                userInfo.joiningDate = Date.now();
                userInfo.numAddresses = 0;
                userInfo.lastIndex = 0;
            }
            else{
                userInfo.lastLogin = Date.now();
            }

            scope.userInfo = userInfo;
            scope._updateUserInfo(scope.userInfo);
        });
    }

    eMailSignUp(name){
        let scope = this;
        firebaseUser.ref.userInfo.once('value', function(snapshot){
            let userInfo = snapshot.val();
            if(!userInfo){
                userInfo = {};
                userInfo.mobile = '9999999999';
                userInfo.numAddresses = 0;
                userInfo.lastIndex = 0;
            }
            userInfo.name = name;
            userInfo.uid = firebaseUser.uid;
            userInfo.email = firebaseUser.email;
            userInfo.joiningDate = Date.now();
            userInfo.lastLogin = Date.now();
            scope.userInfo = userInfo;
            scope._updateUserInfo(scope.userInfo);
        });
    }

    _updateUserInfo(info){
        firebaseUser.ref.userInfo.set(info);
    }
}
