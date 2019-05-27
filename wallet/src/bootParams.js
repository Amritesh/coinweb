let bootParams = {
    initPROD : true,
    DEV_URLS : {
        generateAddress : 'https://us-central1-coinweb.cloudfunctions.net/generateAddressTrigger'
    },
    PROD_URLS : {
        generateAddress : 'https://us-central1-coinweb-dev.cloudfunctions.net/generateAddressTrigger'
    },
    CLOUD_FUNCTIONS_URLS : {},
    isPROD : true,
    isDEV : false,
    // isMobile : 'Android' === window.System.os || 'iOS' === window.System.os,
    // isSmallScreen : window.matchMedia('(min-width: 767px)').matches?false:true,
    PRODLocationHostname : ['coinweb.io'],
    firebaseConfig: {},
    PRODFirebaseConfig : {
        apiKey: 'AIzaSyBD4S4wgCuCT069sF9o30vhAaimDcV_Ixg',
        authDomain: 'coinweb-b6ce1.firebaseapp.com',
        databaseURL: 'https://coinweb.firebaseio.com',
        messagingSenderId: '444175705757',
        projectId: 'coinweb',
        storageBucket: 'coinweb.appspot.com',
    },
    DEVFirebaseConfig : {
        apiKey: 'AIzaSyBD4S4wgCuCT069sF9o30vhAaimDcV_Ixg',
        authDomain: 'coinweb-b6ce1.firebaseapp.com',
        databaseURL: 'https://coinweb.firebaseio.com',
        messagingSenderId: '444175705757',
        projectId: 'coinweb',
        storageBucket: 'coinweb.appspot.com',
    }
};

if(bootParams.PRODLocationHostname[0] === window.location.hostname && bootParams.initPROD){
    bootParams.isPROD = true;
    bootParams.isDEV = false;
    bootParams.firebaseConfig = bootParams.PRODFirebaseConfig;
    bootParams.CLOUD_FUNCTIONS_URLS = bootParams.PROD_URLS;
}
else {
    bootParams.isPROD = false;
    bootParams.isDEV = true;
    bootParams.firebaseConfig = bootParams.DEVFirebaseConfig;
    bootParams.CLOUD_FUNCTIONS_URLS = bootParams.DEV_URLS;
}

export default bootParams;
