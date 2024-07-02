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
  public clientInfo: any
  public clientDetails: any

  public textFirstLastName: string
  public textFirstName: string
  public textFirstSecondLastName: string
  public textMiddleName: string
  public textPhone: string
  public textCity: string
  public textAdress: string

  public valueFirstLastName: string
  public valueFirstName: string
  public valueFirstSecondLastName: string
  public valueMiddleName: string
  public valuePhone: string
  public valueCity: string
  public valueAdress: string

  constructor(private router: Router, private clientService: ClientService) {
    const navigation = this.router.getCurrentNavigation()
    this.clientInfo = navigation?.extras.state

    this.textFirstLastName = 'Primer Apellido'
    this.textFirstName = 'Primer Nombre'
    this.textFirstSecondLastName = 'Segundo Apellido'
    this.textMiddleName = 'Segundo Nombre'
    this.textPhone = 'Teléfono'
    this.textCity = 'Ciudad'
    this.textAdress = 'Dirección'

    this.valueFirstLastName = ''
    this.valueFirstName = ''
    this.valueFirstSecondLastName = ''
    this.valueMiddleName = ''
    this.valuePhone = ''
    this.valueCity = ''
    this.valueAdress = ''
  }

  ngOnInit(): void {
    console.log(this.clientInfo)

    if (this.clientInfo) {
      this.clientService.getClientInfo(this.clientInfo.documentTypeValue, this.clientInfo.documentNumber)
        .subscribe(
          data => {
            this.clientDetails = data;
            console.log(this.clientDetails.primer_nombre)
            this.getDataByService();
            console.log(this.clientDetails);
          },
          error => {
            console.error('Error al obtener la información del cliente', error);
          }
        );
    }
  }

  private getDataByService(): void{
    this.valueFirstLastName = this.clientDetails.primer_apellido
    this.valueFirstName = this.clientDetails.primer_nombre
    this.valueFirstSecondLastName = this.clientDetails.segundo_apellido
    this.valueMiddleName = this.clientDetails.segundo_nombre
    this.valuePhone = this.clientDetails.telefono
    this.valueCity = this.clientDetails.ciudad
    this.valueAdress = this.clientDetails.direccion
  }

  public redirectToInput(): void {
    this.router.navigate(['/input'], {
      state: {
      }
    });
  }
}
