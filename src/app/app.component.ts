import { Component } from '@angular/core';
import * as firebase from 'firebase';

@Component({
  selector: 'app-root',
  templateUrl: './app.component.html',
  styleUrls: ['./app.component.scss']
})
export class AppComponent {
  constructor() {// Your web app's Firebase configuration
    var firebaseConfig = {
      apiKey: "AIzaSyAl2HeJ36qX0IcufmOIpid17PAklkrljn4",
      authDomain: "jukebox-pascreau.firebaseapp.com",
      databaseURL: "https://jukebox-pascreau.firebaseio.com",
      projectId: "jukebox-pascreau",
      storageBucket: "jukebox-pascreau.appspot.com",
      messagingSenderId: "327784479645",
      appId: "1:327784479645:web:01ddb22fb21ac584d70d74",
      measurementId: "G-HB8T9RS040"
    };
    // Initialize Firebase
    firebase.initializeApp(firebaseConfig);
    firebase.analytics();

  }
}
