import { Component, OnInit, Input, Output, EventEmitter } from '@angular/core';
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

  constructor() {}

  ngOnInit() {
    Modal.init();
    this.modal = Modal.create(document.querySelector('.bx--modal'));
  }

  submit() {
    this.modalFormSubmit.emit();
  }
}
