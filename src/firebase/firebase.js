import * as firebase from 'firebase';

const config = {
	apiKey: 'AIzaSyCil8eDmHhh5_ETA8F7AGzWW87zOn6-Csg',
	authDomain: 'flext-a73e7.firebaseapp.com',
	databaseURL: 'https://flext-a73e7.firebaseio.com',
	projectId: 'flext-a73e7',
	storageBucket: 'flext-a73e7.appspot.com',
	messagingSenderId: '426368761632',
	appId: '1:426368761632:web:7c663ac1715bc250262145',
};

firebase.initializeApp(config);
const database = firebase.database();

export { firebase, database as default };

// firebase.database().ref().set({
// 	name: 'test data',
// });
