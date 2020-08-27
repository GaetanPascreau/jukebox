import { Component, OnInit } from '@angular/core';
import {FormBuilder, FormGroup, Validators} from '@angular/forms';
import {Router} from '@angular/router';
import {CDsService} from '../../services/cds.service';
import {CD} from '../../models/CD.model';

@Component({
  selector: 'app-cd-form',
  templateUrl: './cd-form.component.html',
  styleUrls: ['./cd-form.component.scss']
})
export class CDFormComponent implements OnInit {

  cdForm: FormGroup;
  fileIsUploading = false;
  fileUrl: string;
  fileUploaded = false;
  
  constructor(private formBuilder: FormBuilder,
              private cdsService: CDsService,
              private router: Router) { }

  ngOnInit(): void {
    this.initForm();
  }

  initForm(){
    this.cdForm = this.formBuilder.group({
      title: ['', Validators.required],
      author: ['', Validators.required]
    });
  }

  onSaveCd(){
    const title = this.cdForm.get('title').value;
    const author = this.cdForm.get('author').value;
    const newCd = new CD(title, author);
    if (this.fileUrl && this.fileUrl !== ''){
      newCd.photo = this.fileUrl;
    }
    this.cdsService.createNewCd(newCd);
    this.router.navigate(['/cds']);
  }

  onUploadFile(file: File){
    this.fileIsUploading = true;
    this.cdsService.uploadFile(file).then(
      (url: string) => {
        this.fileUrl = url;
        this.fileIsUploading = false;
        this.fileUploaded = true;
      }
    );
  }

  detectFiles(event){
    this.onUploadFile(event.target.files[0]);
  }

}
