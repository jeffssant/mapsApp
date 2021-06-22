import { Component, OnInit, ElementRef, ViewChild, AfterViewInit } from '@angular/core';

import * as mapboxgl from "mapbox-gl";

@Component({
  selector: 'app-marks',
  templateUrl: './marks.component.html',
  styles: [
    `
    .map-container{
      width: 100%;
      height: 100%;
    }

    .row{
      background-color: white;
      position: fixed;
      bottom: 50px;      
      left: 50px;
      border-radius: 5px;
      padding: 10px;
      z-index = 99999;
    }
    `
  ]
})
export class MarksComponent implements AfterViewInit {

  @ViewChild('map') divMap!:ElementRef
  maps!: mapboxgl.Map;
  zoomLevel: number = 15;
  center: [number,number] = [-46.451020460515885 , -23.533707897122152 ];

  constructor() { }

  ngAfterViewInit(): void {
    this.maps = new mapboxgl.Map({
    container: this.divMap.nativeElement,
    style: 'mapbox://styles/mapbox/streets-v11',
    center: this.center,
    zoom: this.zoomLevel
    });

    new mapboxgl.Marker()
      .setLngLat(this.center)
      .addTo(this.maps)
  }

 

}
