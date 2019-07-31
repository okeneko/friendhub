import { Component, OnInit, Input, Output, EventEmitter, HostListener } from '@angular/core';
import { Location } from '@angular/common';
import { Modal } from 'carbon-components';

@Component({
  selector: 'app-form-modal',
  templateUrl: './form-modal.component.html',
  styleUrls: ['./form-modal.component.scss']
})
export class FormModalComponent implements OnInit {
  @Input() modalId: string;
  @Input() headerText: string;
  @Input() formGroup: string;
  @Output() modalFormSubmit = new EventEmitter();
  @Input() submitText: string;

  modal: any;

  constructor(private location: Location) {}

  ngOnInit() {
    // Modal.init();
    this.modal = Modal.create(document.querySelector('.bx--modal'));
    setTimeout(() => {
      // So that the show() function is a bit delayed and the entry animation shows.
      this.modal.show();
    });
  }

  submit() {
    this.modalFormSubmit.emit();
  }

  @HostListener('modal-hidden', ['$event'])
  onModalClose(event) {
    this.location.back();
  }
}
