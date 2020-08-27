import {Component, OnDestroy, OnInit} from '@angular/core';
import {CD} from '../models/CD.model';
import {Subscription} from 'rxjs';
import {Router} from '@angular/router';
import {CDsService} from '../services/cds.service';

@Component({
  selector: 'app-cd-list',
  templateUrl: './cd-list.component.html',
  styleUrls: ['./cd-list.component.scss']
})
export class CDListComponent implements OnInit, OnDestroy {

  cds: CD[];
  cdsSubscription: Subscription;
  lastUpdate = new Date();

  constructor(private cdsService: CDsService, private router: Router ) { }

  ngOnInit(): void {
    this.cdsSubscription = this.cdsService.cdsSubject.subscribe(
      (cds: CD[]) => {
        this.cds = cds;
      }
    );
    this.cdsService.getCds();
    this.cdsService.emitCds();
  }

  onNewCd(){
    this.router.navigate(['/cds', 'new']);
  }

  onDeleteCd(cd: CD){
    this.cdsService.removeCd(cd);
  }

  onViewCd(id: number){
    this.router.navigate(['/cds', 'view', id]);
  }

  ngOnDestroy(){
    this.cdsSubscription.unsubscribe();
  }
}
