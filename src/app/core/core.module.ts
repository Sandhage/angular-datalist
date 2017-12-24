import { NgModule } from '@angular/core';
import { CommonModule } from '@angular/common';
import { ListItemsService } from './services/list-items.service';

@NgModule({
  imports: [
    CommonModule
  ],
  declarations: [],
  providers: [
    ListItemsService
  ]
})
export class CoreModule { }
