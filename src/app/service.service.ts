import { Injectable } from '@angular/core';
import { HttpClient } from '@angular/common/http';
import { Observable } from 'rxjs';
import { Key } from './key.string';

@Injectable({
  providedIn: 'root'
})
export class ServiceService {

  constructor(private http: HttpClient) { }

  getKey(): Observable<Key> {
    console.log('Success')
    return this.http.get<Key>('http://localhost:4000/key');
  }
}
