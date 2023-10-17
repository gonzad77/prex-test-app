import { HttpClient, HttpHeaders } from '@angular/common/http';
import { Injectable } from "@angular/core";

@Injectable({
  providedIn: 'root'
})
export class RestService {

  private apiUrl = 'http://192.168.1.2:8000/api';
  
  constructor(
    private httpClient: HttpClient,
    ){}

  public async post(path: string, body: any, statusOK = [200]) {
    console.log('Post started')
    const headers = new HttpHeaders({
      'Content-Type': 'application/json'
    })

    return new Promise( (resolve, reject) => {
      this.httpClient.post(
        `${this.apiUrl}${path}`,
        body,
        { headers, observe: 'response' }
      ).subscribe( data => {
        if( !statusOK.includes(data.status)) {
          console.log('Post finish faild');
          reject(data)
        }

        console.log('Post finish OK');
        resolve(data);
      }, (error) => {
        console.log('Post finish faild 2');
        reject(error);
      })
    })
  }

  public async get(path: string, body: any, statusOK = [200]) {
    console.log('Get started')
    const headers = new HttpHeaders({
      'Content-Type': 'application/json'
    })

    const params = body;

    return new Promise((resolve, reject) => {
      this.httpClient.get(
        `${this.apiUrl}${path}`,
        { headers, observe: 'response', params }
      ).subscribe( data => {
        if( !statusOK.includes(data.status)) {
          console.log('Get finish faild');
          reject(data)
        }

        console.log('Get finish OK');
        resolve(data);
      }, (error) => {
        console.log('Get finish faild 2');
        reject(error);
      })
    })
  }

  public async put(path: string, body: any, statusOK = [200]) {
    console.log('Put started')
    const headers = new HttpHeaders({
      'Content-Type': 'application/json'
    })

    return new Promise( (resolve, reject) => {
      this.httpClient.put(
        `${this.apiUrl}${path}`,
        body,
        { headers, observe: 'response' }
      ).subscribe( data => {
        if( !statusOK.includes(data.status)) {
          console.log('Put finish faild');
          reject(data)
        }

        console.log('Put finish OK');
        resolve(data);
      }, (error) => {
        console.log('Put finish faild 2');
        reject(error);
      })
    })
  }
}