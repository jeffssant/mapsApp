import { NgModule } from '@angular/core';
import { CommonModule } from '@angular/common';

import { MapsRoutingModule } from './maps-routing.module';
import { MinMapsComponent } from './components/min-maps/min-maps.component';
import { FullScreenComponent } from './pages/full-screen/full-screen.component';
import { MarksComponent } from './pages/marks/marks.component';
import { ZoomRangeComponent } from './pages/zoom-range/zoom-range.component';
import { PropertiesComponent } from './pages/properties/properties.component';


@NgModule({
  declarations: [
    MinMapsComponent,
    FullScreenComponent,
    MarksComponent,
    ZoomRangeComponent,
    PropertiesComponent
  ],
  imports: [
    CommonModule,
    MapsRoutingModule
  ]
})
export class MapsModule { }
