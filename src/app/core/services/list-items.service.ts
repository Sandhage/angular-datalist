import { Injectable } from '@angular/core';

@Injectable()
export class ListItemsService {
  items: Array<string> = ['First item']

  constructor() { }

}
