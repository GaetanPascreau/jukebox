import { Injectable } from '@angular/core';
import {CD} from '../models/CD.model';
import {Subject} from 'rxjs';
import * as firebase from 'firebase';

@Injectable({
  providedIn: 'root'
})
export class CDsService {

  cds: CD[] = [];
  cdsSubject = new Subject<CD[]>();

  constructor() { }

  emitCds(){
    this.cdsSubject.next(this.cds);
  }

  saveCds(){
    firebase.database().ref('/cds').set(this.cds);
  }

  getCds(){
    firebase.database().ref('/cds').on('value', (data) => {
      this.cds = data.val() ? data.val() : [];
      this.emitCds();
    });
  }

  getSingleCd(id: number){
    return new Promise(
      (resolve, reject) => {
        firebase.database().ref('/cds/' + id).once('value').then(
          (data) => {
            resolve(data.val());
          }, (error) => {
            reject(error);
          }
        );
      }
    );
  }

  createNewCd(newCd: CD){
    this.cds.push(newCd);
    this.saveCds();
    this.emitCds();
  }

  removeCd(cd: CD){
    if (cd.photo){
      const storageRef = firebase.storage().refFromURL(cd.photo);
      storageRef.delete().then(
        () => {
          console.log('Photo supprimée !');
        }
      ).catch(
        (error) => {
          console.log('Fichier non trouvé:' + error);
        }
      );
    }
    const cdIndexToRemove = this.cds.findIndex(
      (cdEl) => {
        if (cdEl === cd){
          return true;
        }
      }
    );
    this.cds.splice(cdIndexToRemove, 1);
    this.saveCds();
    this.emitCds();
  }

  uploadFile(file: File){
    return new Promise(
      (resolve, reject) => {
        const almostUniqueFileName = Date.now().toString();
        const upload = firebase.storage().ref()
          .child('image/' + almostUniqueFileName + file.name)
          .put(file);
        upload.on(firebase.storage.TaskEvent.STATE_CHANGED,
          () => {
            console.log('Chargement...');
          },
          (error) =>{
            console.log('Erreur de chargement:' + error);
            reject();
          },
          () => {
          resolve(upload.snapshot.ref.getDownloadURL());
          }
        );
      }
    );
  }
}
