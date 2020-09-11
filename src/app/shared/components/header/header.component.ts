import { Component, OnInit } from '@angular/core';
import { Router } from "@angular/router";

@Component({
  selector: 'app-header',
  templateUrl: './header.component.html',
  styleUrls: ['./header.component.css']
})
export class HeaderComponent implements OnInit {

  path: String;

  constructor(private router: Router) { }

  redirectTo(url){
    this.router.navigateByUrl(url)
  }

  ngOnInit() {
    this.path = window.location.pathname;
    console.log(this.path)
  }

}
