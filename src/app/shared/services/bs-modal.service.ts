import { Injectable } from '@angular/core';
import { BsModalComponent } from '../components/bs-modal/bs-modal.component';
@Injectable({ providedIn: 'root' })
export class BsModalService {
  private modals: BsModalComponent[] = [];

  add(modal: BsModalComponent) {
    // ensure component has a unique id attribute
    console.log(this.modals); 
    if (!modal.id || this.modals.find((x) => x.id === modal.id)) {
      // if (!modal.id) {
      //   console.error('modal must have an id');
      // }
      // if (this.modals.find((x) => x.id === modal.id)) {
      //   console.error(`modal with id ${modal.id} already exists`);
      // }
      throw new Error('modal must have a unique id attribute');
    }

    // add modal to array of active modals
    this.modals.push(modal);
  }

  remove(modal: BsModalComponent) {
    // remove modal from array of active modals
    this.modals = this.modals.filter((x) => x !== modal);
  }

  open(id: string) {
    // open modal specified by id
    const modal = this.modals.find((x) => x.id === id);

    if (!modal) {
      throw new Error(`modal '${id}' not found`);
    }

    modal.open();
  }

  close() {
    // close the modal that is currently open
    const modal = this.modals.find((x) => x.isOpen);
    modal?.close();
  }
}
