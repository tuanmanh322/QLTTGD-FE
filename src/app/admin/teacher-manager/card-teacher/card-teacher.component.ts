import {Component, Input, OnInit} from '@angular/core';
import {NgbActiveModal} from '@ng-bootstrap/ng-bootstrap';
import {CardModel} from '../../../shared/model/card-model';

@Component({
  selector: 'app-card-teacher',
  templateUrl: './card-teacher.component.html',
  styleUrls: ['./card-teacher.component.css']
})
export class CardTeacherComponent implements OnInit {
  @Input() card: any;

  cardd: CardModel;


  constructor(
    public activeModal: NgbActiveModal
  ) { }

  ngOnInit(): void {
    this.cardd  = this.card;
  }

  cancel() {
    this.activeModal.dismiss();
  }

}
