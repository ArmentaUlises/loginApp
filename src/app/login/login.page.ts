import { Component, OnInit } from '@angular/core';
import { Router } from '@angular/router';
import { AngularFireAuth } from '@angular/fire/auth';
import { AlertController } from '@ionic/angular';

@Component({
  selector: 'app-login',
  templateUrl: './login.page.html',
  styleUrls: ['./login.page.scss'],
})
export class LoginPage implements OnInit {
  user = {
    email: '',
    password: '',
  };

  constructor(
    private router: Router,
    public ngFireAuth: AngularFireAuth,
    private alertController: AlertController
  ) {}

  ngOnInit() {}

  async LogMeIn() {
    const user = await this.ngFireAuth.signInWithEmailAndPassword(
      this.user.email,
      this.user.password
    )
    .then( () => {
      this.router.navigate(['/home']);
    })
    .catch(res => {
      if (res.code === "auth/wrong-password" || res.code ==="auth/user-not-found") {
        this.errorAlert('The credetial is wrong!');
      } 
    });

  }

  async Register() {
    const user = await this.ngFireAuth.createUserWithEmailAndPassword(
      this.user.email,
      this.user.password
    )
    .then( () => {
      this.router.navigate(['/home']);
    })
    .catch( res => {
      console.log(res)
      if (res.code === "auth/email-already-in-use") {
        this.errorAlert('Email is already in use!');
      } 
    });
  }

  async errorAlert(msj) {
    const alert = await this.alertController.create({
      header: 'Ups!',
      message: `${msj}`,
      buttons: ['Ok'],
      mode: "ios"
    });
    alert.present();
  }
  
}
