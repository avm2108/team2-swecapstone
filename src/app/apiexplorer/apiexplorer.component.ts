import { Component } from '@angular/core';
import { MatSnackBarVerticalPosition } from '@angular/material/snack-bar'
import { ServiceService } from '../service.service';
import { Key } from '../key.string';
import { FormControl } from '@angular/forms';

@Component({
  selector: 'app-apiexplorer',
  templateUrl: './apiexplorer.component.html',
  styleUrls: ['./apiexplorer.component.css']
})
export class ApiexplorerComponent {
  selected = 'Pickup'
  selected2 = ''
  value: any = 'Pickup'
  endpointValue: any = 'Selected endpoint'
  apiEndpoint: any = ''
  key: any
  displayKey!: string
  retrieveKey = 'Retrieve key'
  get = 'GET'
  shortenEndpoint = '/key'


  constructor(private service: ServiceService) {}

  onSelected(value: any) {
    // this.value = value
    if (value == 'pickup') {
      this.reset()
    } else if (value == 'key') {
      this.apiEndpoint = 'http://localhost:4000/key'
    } else if (value == 'location') {
      this.reset()
    } 
    
  }

  onSelectedEndpoint(endpointValue: any) {
    if (endpointValue == 'status') {
      this.apiEndpoint = null
    } else if (endpointValue == 'key') {
      this.apiEndpoint = 'http://localhost:4000/key'
    }
  }

  reset() {
    this.selected2 = ''
    this.displayKey = ''
    this.apiEndpoint = ''
  }

  showResponse(value: any) {
    if (value == 'key') {
      this.service.getKey().subscribe((res: any) => {
        this.key = res;
        this.displayKey = JSON.stringify(this.key); 
      })
    }
    
  }

}
