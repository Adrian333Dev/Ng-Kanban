import {
  Component,
  ViewEncapsulation,
  OnInit,
  OnDestroy,
  Input,
  ElementRef,
} from '@angular/core';
import { BsModalService } from '../../services/bs-modal.service';

@Component({
  selector: 'bs-modal',
  templateUrl: './bs-modal.component.html',
  styleUrls: ['./bs-modal.component.scss'],
  encapsulation: ViewEncapsulation.None,
})
export class BsModalComponent implements OnInit, OnDestroy {
  @Input() id: string;
  isOpen = false;
  private element: any;

  constructor(private modalService: BsModalService, private el: ElementRef) {
    this.element = el.nativeElement;
  }

  ngOnInit() {
    // add self (this modal instance) to the modal service so it can be opened from any component
    this.modalService.add(this);

    // move element to bottom of page (just before </body>) so it can be displayed above everything else
    document.body.appendChild(this.element);

    // close modal on background click
    this.element.addEventListener('click', (el: any) => {
      if (el.target.className === 'modal') {
        this.close();
      }
    });
  }

  ngOnDestroy() {
    // remove self from modal service
    this.modalService.remove(this);

    // remove modal element from html
    this.element.remove();
  }

  open() {
    this.element.style.display = 'block';
    document.body.classList.add('modal-open');
    this.isOpen = true;
  }

  close() {
    this.element.style.display = 'none';
    document.body.classList.remove('modal-open');
    this.isOpen = false;
  }
}
