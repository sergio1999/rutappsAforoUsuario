import { Component } from '@angular/core';
import { BlockUI, NgBlockUI } from 'ng-block-ui';

@Component({
  selector: 'app-root',
  templateUrl: './app.component.html',
  styleUrls: ['./app.component.css']
})
export class AppComponent {
  title = 'rutappsAforoUsuario';
  
  @BlockUI() blockUI: NgBlockUI;

  constructor(){
    // this.blockUI.start('Loading...'); // Start blocking
 
    // setTimeout(() => {
    //   this.blockUI.stop(); // Stop blocking
    // }, 2000);
  }
}
