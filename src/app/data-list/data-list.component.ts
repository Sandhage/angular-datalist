import _ from 'lodash';
import { Component, OnInit } from '@angular/core';
import { ListItemsService } from '../core/services/list-items.service';

@Component({
  selector: 'app-data-list',
  templateUrl: './data-list.component.html',
  styleUrls: ['./data-list.component.scss']
})
export class DataListComponent implements OnInit {
  listItems = {
      'all': [],
      'display': 'none',
      'match': [],
      'selected': {
        'value': 'Default value',
        'highlighted': false
      }
  };
  itemHighlighted: number = null;

  constructor( private listItemService: ListItemsService ) { }

  ngOnInit() {
    this.getItems();
  }

  getItems() {
    _.forEach(this.listItemService.items, item => {
      this.listItems.all.push({'value': item,'highlighted':false});
      this.listItems.match = this.listItems.all;
    });
  }

  selectItem(event: any) {
    let e       = event,
        target  = e.target;

        if (e.type === "mouseenter") {
            this.itemHighlighted = this.listItems.match.findIndex(o => o.value === target.value);
            this.listItems.match[this.itemHighlighted].highlighted = true;
        } else if (e.type === "mouseleave" && this.itemHighlighted !== null) {
            this.listItems.match[this.itemHighlighted].highlighted = false;
            this.itemHighlighted = null;
        }
        
        if (e.type === "keyup") {
            if (this.itemHighlighted > this.listItems.match.length) {
                return "block";
            }
            if (e.keyCode === 40 && this.itemHighlighted === null) {
                this.itemHighlighted = 0;
                this.listItems.match[this.itemHighlighted].highlighted = true;
            } else if (e.keyCode === 40) {
                this.listItems.match[this.itemHighlighted].highlighted = false;
                if (this.itemHighlighted < this.listItems.match.length - 1) {
                    this.itemHighlighted++;
                }
                this.listItems.match[this.itemHighlighted].highlighted = true;
            }
            
            if (e.keyCode === 38 && this.itemHighlighted === null) {
                return "none";
            } else if (e.keyCode === 38 && this.itemHighlighted == 0) {
                this.listItems.match[this.itemHighlighted].highlighted = false;
                this.itemHighlighted = null;
            } else if (e.keyCode === 38) {
                this.listItems.match[this.itemHighlighted].highlighted = false;
                this.itemHighlighted--;
                this.listItems.match[this.itemHighlighted].highlighted = true;
            }
        
            return "block";
        }
  }

  setItem(item: any) {
      this.listItems.selected = item;
      this.listItems.match[this.itemHighlighted].highlighted = false;
      this.listItems.match = this.listItems.match.filter(c => c.value.match(new RegExp(item)));
      this.itemHighlighted = null;
      this.listItems.display = "none";
  }

  toggleItemDropdown(event: any) {
    let e       = event,
        target  = e.target,
        that    = this,
        display = this.listItems.display,
        regex   = "(" + target.value + ")";

    if (e.type === "dblclick" && display === "none") {
        display = "block";
    } else if ((e.type === "dblclick" || e.type === "click") && display === "block") {
        display = "none";
    }

    if (e.type === "keyup") {
        display = "block";
        e.preventDefault();
        if (e.keyCode === 40 || e.keyCode === 38) {
            display = this.selectItem(e);
        }
        if (e.keyCode === 13 && this.itemHighlighted !== null) {
            this.setItem(this.listItems.match[this.itemHighlighted]);
            return;
        }
        this.listItems.match = this.listItems.all.filter(c=>c.value.match(new RegExp(regex, 'gi')));
    }

    if (this.listItems.match.length < 1) {
        display = "none";
    }
    
    this.listItems.display = display;
  }
}
