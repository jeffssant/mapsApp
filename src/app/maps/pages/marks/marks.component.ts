import { Component, OnInit, ElementRef, ViewChild, AfterViewInit } from '@angular/core';

import * as mapboxgl from "mapbox-gl";
import { element } from 'protractor';

interface MarkerColor{
  color: string;
  marker?: mapboxgl.Marker;
  center?: [number, number]
}

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
    .list-group{
      position: fixed;
      top: 20px;
      right: 20px;
      z-index: 9999;
      cursor: pointer
    }
    `
  ]
})
export class MarksComponent implements AfterViewInit {

  @ViewChild('map') divMap!:ElementRef
  maps!: mapboxgl.Map;
  zoomLevel: number = 15;
  center: [number,number] = [-46.451020460515885 , -23.533707897122152 ];
  
  markers: MarkerColor[] = []

  constructor() { }

  ngAfterViewInit(): void {
    this.maps = new mapboxgl.Map({
    container: this.divMap.nativeElement,
    style: 'mapbox://styles/mapbox/streets-v11',
    center: this.center,
    zoom: this.zoomLevel
    });

    this.readMarkerLS()

    /* const markerHtml: HTMLElement = document.createElement('div');
    markerHtml.innerHTML = 'Marcador'
    new mapboxgl.Marker({
        element: markerHtml
      })
      .setLngLat(this.center)
      .addTo(this.maps) */
    
  }

  addMarker() {
    const color = "#xxxxxx".replace(/x/g, y=>(Math.random()*16|0).toString(16));

    const AddM = new mapboxgl.Marker({
      draggable: true,
      color
    })
    .setLngLat(this.center)
    .addTo(this.maps);

    this.markers.push({
      color:color,
      marker: AddM
    });

    this.SaveMarkerLS();

    AddM.on('dragend', () => {
      this.SaveMarkerLS();
    })
  }

  goMarker(marker: mapboxgl.Marker){
    this.maps.flyTo({
      center: marker!.getLngLat()
    })
    
  }

  SaveMarkerLS(){

    const lngLatArr: MarkerColor[] = [];

    this.markers.forEach(m => {
      const color = m.color;
      const {lng, lat} = m.marker!.getLngLat();

      lngLatArr.push({
        color: color,
        center: [lng, lat]
      })
    })

    localStorage.setItem('Markers', JSON.stringify(lngLatArr) )
  }

  readMarkerLS(){
    if(!localStorage.getItem('Markers')){return;}

    const lngLatArr: MarkerColor[] = JSON.parse(localStorage.getItem('Markers')!);

    console.log(lngLatArr[0].center);

    lngLatArr.forEach(m => {
      const newMaker = new mapboxgl.Marker({
        color: m.color,
        draggable: true
      })
      .setLngLat(m.center!)
      .addTo(this.maps);

      this.markers.push({
        marker: newMaker,
        color: m.color
      });

      newMaker.on('dragend', () => {
        this.SaveMarkerLS();
      })
    })
  }


  remove(index: number) {
    this.markers[index].marker?.remove();
    this.markers.splice(index, 1)

    this.SaveMarkerLS();
  }

}
