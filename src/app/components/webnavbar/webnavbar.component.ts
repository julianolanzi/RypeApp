import { Component } from '@angular/core';

@Component({
  selector: 'app-webnavbar',
  templateUrl: './webnavbar.component.html',
  styleUrls: ['./webnavbar.component.scss'],
})
export class WebnavbarComponent {
  ngOnInit(): void {
    //Called after the constructor, initializing input properties, and the first call to ngOnChanges.
    //Add 'implements OnInit' to the class.

    let hamMenuIcon = document.getElementById('ham-menu') as HTMLElement;
    let navBar = document.getElementById('nav-bar')as HTMLElement;
    let navLinks = navBar.querySelectorAll("li");

    hamMenuIcon.addEventListener('click', () => {
      navBar.classList.toggle('active');
    
    });

    navLinks.forEach((navLinks) => {
      navLinks.addEventListener("click", () => {
        navBar.classList.remove("active");
        hamMenuIcon.classList.toggle("fa-times");
      });
    });
  }
}
