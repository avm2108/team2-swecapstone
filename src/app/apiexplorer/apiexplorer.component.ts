import { Component } from '@angular/core';
import { ServiceService } from '../service.service';
import { AuthService } from '../auth.service';

@Component({
  selector: 'app-apiexplorer',
  templateUrl: './apiexplorer.component.html',
  styleUrls: ['./apiexplorer.component.css']
})
export class ApiexplorerComponent {


  private key: any

  selected = 'Pickup'
  selected2 = ''
  value: any = 'Select API'
  endpointValue: any = 'Select endpoint'
  apiEndpoint: any = ''
  displayKey!: string
  displayErr!: string
  retrieveKey = 'Retrieve key'
  get = 'GET'
  shortenEndpoint = '/key'


  constructor(private service: ServiceService, private auth: AuthService) {}

  //Controls the selection of API's from dropdownlist and what's displayed to user in the request feild.
  onSelected(value: any) {
    if (value == 'pickup') {
      this.reset()
    } else if (value == 'key') {
      this.apiEndpoint = 'http://localhost:4000/key'
      this.reset()
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
    this.displayErr = ''
  }


  // Makes API call
  async showResponse(value: any) {
    this.reset()
    if (value == 'key') {
      this.service.getKey().subscribe({
      next: (res: any) => {
        this.key = res
        this.displayKey = JSON.stringify(this.key)
      },
      error: (err: any) => {
        this.displayErr = err
      }
    })
    }
  }

  logout() {
    this.auth.logout();
  }

}
