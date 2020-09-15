import { Injectable } from '@angular/core';
import { AngularFirestore } from '@angular/fire/firestore';
import { of } from 'rxjs';

@Injectable({
  providedIn: 'root'
})
export class AppFirebaseService {

  visitantes : any = [];

  constructor(private firestore: AngularFirestore) { }

  getUsuarios(){
    return this.firestore.collection('visitantes');
  }


}
