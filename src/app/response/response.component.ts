import { Component, OnInit } from '@angular/core';
import { Router } from '@angular/router';
import { ClientService } from './client.service';
import { HttpClient } from '@angular/common/http';

@Component({
  selector: 'app-response',
  standalone: true,
  templateUrl: './response.component.html',
  styleUrl: './response.component.css',
  providers: [HttpClient]
})

export class ResponseComponent implements OnInit{
  public clientInfo: any;
  public clientDetails: any;

  constructor(private router: Router, private clientService: ClientService) {
    const navigation = this.router.getCurrentNavigation();
    this.clientInfo = navigation?.extras.state;
  }
  ngOnInit(): void {
    console.log(this.clientInfo)

    if (this.clientInfo) {
      this.clientService.getClientInfo(this.clientInfo.documentTypeValue, this.clientInfo.documentNumber)
        .subscribe(
          data => {
            this.clientDetails = data;
            console.log(this.clientDetails);
          },
          error => {
            console.error('Error al obtener la información del cliente', error);
          }
        );
    }
  }
}
