import { Component } from '@angular/core';

interface MenuItem {
  route: string;
  name: string;
}

@Component({
  selector: 'app-menu',
  templateUrl: './menu.component.html',
  styles: [
    `
    li {
      cursor: pointer;
    }
    
    `
  ]
})
export class MenuComponent {

  menu: MenuItem[] = [
    {
      route: '/maps/fullscreen',
      name: 'FullScreen'
    },
    {
      route: '/maps/zoom-range',
      name: 'Zoom Range'
    },
    {
      route: '/maps/marks',
      name: 'Marks'
    },
    {
      route: '/maps/properties',
      name: 'Properties'
    }
  ]

}
