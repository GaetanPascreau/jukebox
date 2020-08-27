import { Component, OnInit } from '@angular/core';
import {CD} from '../../models/CD.model';
import {ActivatedRoute, Router} from '@angular/router';
import {CDsService} from '../../services/cds.service';

@Component({
  selector: 'app-single-cd',
  templateUrl: './single-cd.component.html',
  styleUrls: ['./single-cd.component.scss']
})
export class SingleCDComponent implements OnInit {

  cd: CD;

  constructor(private route: ActivatedRoute,
              private cdsService: CDsService,
              private router: Router) {}

  ngOnInit(): void {
    this.cd = new CD('', '');
    const id = this.route.snapshot.params.id;
    this.cdsService.getSingleCd(+id).then(
      (cd: CD) => {
        this.cd = cd;
      }
    );
  }

  onBack(){
    this.router.navigate(['/cds']);
  }

}
