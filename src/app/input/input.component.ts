import { CommonModule } from '@angular/common';
import { Component, OnInit } from '@angular/core';
import { FormsModule } from '@angular/forms'
import { Router } from '@angular/router';

@Component({
  selector: 'app-input',
  standalone: true,
  imports: [CommonModule, FormsModule],
  templateUrl: './input.component.html',
  styleUrl: './input.component.css'
})
export class InputComponent{

  public textAllComponent: string;
  public textSelectTypeNumber: string;
  public textNumberDocument: string;

  public documentNumber: string;
  public documentTypeValue: string;
  
  public documentTypes: DocumentType[];

  constructor(public router: Router){
    this.textAllComponent = 'Todos los campos son obligatorios';
    this.textSelectTypeNumber = 'Tipo de Documento';
    this.textNumberDocument = 'Número de Documento';
    
    this.documentNumber = '';
    this.documentTypeValue = 'D';
    
    this.documentTypes = [
      { id: 'C', name: 'Cédula de Ciudadanía' },
      { id: 'P', name: 'Pasaporte' }
    ];
  }

  public search(): void {
    console.log('Número de Documento:', this.documentNumber);
    console.log('Tipo de Documento:', this.documentTypeValue);
    this.router.navigate(['/response'], {
       state: {
         documentTypeValue: this.documentTypeValue, 
         documentNumber: this.documentNumber }
        }
    );
  }
}

interface DocumentType {  
  id: string;
  name: string;
}