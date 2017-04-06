import { NgModule } from '@angular/core';
import { HomeComponent } from './home.component';
import { HomeRoutingModule } from './home-routing.module';
import { SharedModule } from '../shared/shared.module';
import { NameListService } from '../shared/name-list/name-list.service';
import { SubComponent } from './subcomponent.component';


@NgModule({
  imports: [HomeRoutingModule, SharedModule],
  declarations: [HomeComponent, SubComponent],
  exports: [HomeComponent, SubComponent],
  providers: [NameListService]
})
export class HomeModule { }
