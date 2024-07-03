import { CommonModule } from '@angular/common';
import { Component } from '@angular/core';
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
  public textAllComponent: string  = 'Todos los campos son obligatorios';
  public textSelectTypeNumber: string = 'Tipo de Documento';
  public textNumberDocument: string = 'Número de Documento';

  public documentNumber: string = '';
  public documentTypeValue: string | null = null;
  
  public documentTypes: DocumentType[] = [
    { id: 'C', name: 'Cédula de Ciudadanía' },
    { id: 'P', name: 'Pasaporte' }
  ];
  public isButtonDisabled: boolean = true;

  public documentNumberError: string = this.textAllComponent;

  constructor(public router: Router) {}

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
    if (/^\d+(\.\d+)?$/.test(numberWithoutCommas)) {
        return true;
    } else {
        return false;
    }
  }

  public formatNumber(event: Event): void {
    const input = event.target as HTMLInputElement;
    let value = input.value.replace(/[^a-zA-Z0-9]/g, '');
    this.documentNumber = value.replace(/\B(?=(\d{3})+(?!\d))/g, ',');
    this.updateButtonState();
  }

  public updateButtonState(): void {
    if(this.documentNumber!==null&&this.documentNumber!==''
      &&this.documentTypeValue!==null&&this.documentTypeValue!==''){
      this.isButtonDisabled = false
      this.documentNumberError = ''
    }else{
      this.isButtonDisabled = true
      this.documentNumberError = this.textAllComponent
    }
  }

  public removeCommas(str: string): string {
    return str.replace(/,/g, '')
  }
}

interface DocumentType {  
  id: string
  name: string
}
