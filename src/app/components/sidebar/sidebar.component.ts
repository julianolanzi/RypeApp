import { Component } from '@angular/core';

@Component({
  selector: 'app-sidebar',
  templateUrl: './sidebar.component.html',
  styleUrls: ['./sidebar.component.scss'],
})
export class SidebarComponent {
  constructor() {}
  ngOnInit(): void {
    let sidebar = document.querySelector('nav') as HTMLElement;
    let sidebarContainer = document.querySelector(
      '.sidebar-container'
    ) as HTMLElement;
    let toggle = document.querySelector('.toggle') as HTMLElement;

    let adminContent = document.querySelector(
      '.container-admin-content'
    ) as HTMLElement;

    let modeSwitch = document.querySelector('.toggle-switch') as HTMLElement;
    let body = document.querySelector('.container-admin') as HTMLElement;
    let modeText = document.querySelector('.mode-text') as HTMLElement;

    let list = document.querySelectorAll('.nav-link');

    let width =
      window.innerWidth ||
      document.documentElement.clientWidth ||
      document.body.clientWidth;

    let subMenu = document.querySelectorAll('.sub-item');

    list.forEach((linkItem, index) => {
      linkItem.addEventListener('click', () => {
        document.querySelector('.active')?.classList.remove('active');
        linkItem.classList.add('active');
      });
    });

    subMenu.forEach((linkItem, index) => {
      linkItem.addEventListener('click', () => {
        if (width < 769) {
          sidebar.classList.toggle('close');
          sidebarContainer.classList.toggle('close');
          adminContent.classList.toggle('close');
        }
      });
    });

    toggle.addEventListener('click', () => {
      sidebar.classList.toggle('close');
      sidebarContainer.classList.toggle('close');
      adminContent.classList.toggle('close');
    });

    modeSwitch.addEventListener('click', () => {
      body.classList.toggle('dark');

      if (body.classList.contains('dark')) {
        modeText.innerText = 'Light mode';
      } else {
        modeText.innerText = 'Dark mode';
      }
    });
  }
}
