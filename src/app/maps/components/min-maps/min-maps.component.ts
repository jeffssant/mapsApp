import { AfterViewInit, Component, Input, ViewChild, ElementRef } from '@angular/core';

import * as mapboxgl from "mapbox-gl";

@Component({
  selector: 'app-min-maps',
  templateUrl: './min-maps.component.html',
  styles: [
    `
    div{
      width: 100%;
      height: 150px;
      margin: 0;
    }
    `
  ]
})
export class MinMapsComponent implements AfterViewInit  {
  @Input() lngLat: [number, number] = [0,0];
  @ViewChild('map') divMap!: ElementRef;

  ngAfterViewInit(): void {
    const map = new mapboxgl.Map({
      container: this.divMap.nativeElement,
      style: 'mapbox://styles/mapbox/streets-v11',
      center: this.lngLat,
      zoom: 16,
      interactive: false
    });

    new mapboxgl.Marker().setLngLat(this.lngLat).addTo(map);
  }

  

}
