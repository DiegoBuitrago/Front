import { CommonModule } from '@angular/common';
import { Component} from '@angular/core';
import { FormsModule } from '@angular/forms';
import { Router } from '@angular/router';

@Component({
  selector: 'app-input',
  standalone: true,
  imports: [CommonModule, FormsModule],
  templateUrl: './input.component.html',
  styleUrls: ['./input.component.css']
})
export class InputComponent {
  public textAllComponent: string;
  public textSelectTypeNumber: string;
  public textNumberDocument: string;

  public documentNumber: string;
  public documentTypeValue: string | null;
  
  public documentTypes: DocumentType[];
  public isButtonDisabled: boolean;

  public documentNumberError: string;

  constructor(public router: Router) {
    this.textAllComponent = 'Todos los campos son obligatorios';
    this.textSelectTypeNumber = 'Tipo de Documento';
    this.textNumberDocument = 'Número de Documento';
    
    this.documentNumber = '';
    this.documentTypeValue = null;
    
    this.documentTypes = [
      { id: 'C', name: 'Cédula de Ciudadanía' },
      { id: 'P', name: 'Pasaporte' }
    ];

    this.isButtonDisabled = false;
    this.documentNumberError = '';
  }

  public search(): void {
    this.documentNumberError = '';
    this.documentNumber = this.removeCommas(this.documentNumber);
    
    if (!this.validateDocumentNumber(this.documentNumber)) {
      return;
    }

    console.log('Número de Documento:', this.documentNumber);
    console.log('Tipo de Documento:', this.documentTypeValue);
    this.router.navigate(['/response'], {
      state: {
        documentTypeValue: this.documentTypeValue, 
        documentNumber: this.documentNumber 
      }
    });
  }

  private validateDocumentNumber(number: string): boolean {
    if(!this.validateIsNumber(number)) {
      this.documentNumberError = 'El número de documento solo puede contener números.';
      return false;
    }
    if (number.length < 8 || number.length > 11) {
      this.documentNumberError = 'El número de documento debe tener entre 8 y 11 caracteres.';
      return false;
    }
    this.documentNumberError = '';
    return true;
  }

  private validateIsNumber(number: string): boolean {
    let numberWithoutCommas = this.removeCommas(number);
    let parsedNumber = parseFloat(numberWithoutCommas);
    if (isNaN(parsedNumber)) {
      return false;
    }
    return true;
  }

  public formatNumber(event: Event): void {
    const input = event.target as HTMLInputElement;
    let value = input.value.replace(/\D/g, '');
    this.documentNumber = value.replace(/\B(?=(\d{3})+(?!\d))/g, ',');
  }

  public removeCommas(str: string): string {
    return str.replace(/,/g, '');
  }
}

interface DocumentType {  
  id: string;
  name: string;
}