import { AfterViewInit, Component, ElementRef, OnInit, ViewChild } from '@angular/core';

import * as mapboxgl from "mapbox-gl";

@Component({
  selector: 'app-zoom-range',
  templateUrl: './zoom-range.component.html',
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
export class ZoomRangeComponent implements AfterViewInit {

  @ViewChild('map') divMap!:ElementRef
  maps!: mapboxgl.Map;
  zoomLevel: number = 16;

  constructor() { }

  ngAfterViewInit(): void {
    this.maps = new mapboxgl.Map({
    container: this.divMap.nativeElement,
    style: 'mapbox://styles/mapbox/streets-v11',
    center: [-46.451020460515885 , -23.533707897122152 ],
    zoom: this.zoomLevel
    });

    this.maps.on('zoom', () => {
      this.zoomLevel = this.maps.getZoom();
    })

    this.maps.on('zoomend', () => {
      if(this.maps.getZoom() > 18){
        this.maps.zoomTo(18)
      }
    })
  }

  zoomOut() {
    this.maps.zoomOut();
    
  }

  zoomIn() {
    this.maps.zoomIn();
    
  }

  zoomChaged(value: string){
    this.maps.zoomTo(Number(value))
  }

}
