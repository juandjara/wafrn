import { Component, OnInit } from '@angular/core';
import { UntypedFormControl, UntypedFormGroup, Validators } from '@angular/forms';
import { first } from 'rxjs/operators';
import { MessageService } from 'primeng/api';
import { LoginService } from 'src/app/services/login.service';
import { environment } from 'src/environments/environment';

@Component({
  selector: 'app-register',
  templateUrl: './register.component.html',
  styleUrls: ['./register.component.scss']
})
export class RegisterComponent implements OnInit {


  loading = false;
  logo = environment.logo;

  minimumRegistrationDate: Date;
  minDate: Date;
  img: File|null = null;


  loginForm = new UntypedFormGroup({
    email:  new UntypedFormControl('', [Validators.required, Validators.email]),
    password: new UntypedFormControl('', [Validators.required]),
    url: new UntypedFormControl('', [Validators.required]),
    description: new UntypedFormControl('', [Validators.required]),
    birthDate: new UntypedFormControl('', [Validators.required]),
    captchaResponse:  new UntypedFormControl('', []),
    avatar:  new UntypedFormControl('', [])
  });



  constructor(
    private loginService: LoginService,
    private messages: MessageService
  ) {
    // minimum age: 14
    this.minimumRegistrationDate = new Date();
    this.minimumRegistrationDate.setFullYear(this.minimumRegistrationDate.getFullYear() - 14);
    // do not accept dates before 1900
    this.minDate = new Date();
    this.minDate.setFullYear(1900, 0, 1);
   }

  ngOnInit(): void {
  }



  async onSubmit(){
    this.loading = true;
    try {

      const petition = await this.loginService.register(this.loginForm, this.img);
      if(petition) {
        this.messages.add({severity:'success', summary:'Success!', detail:'Please check your email to activate your account'});
      } else {
        this.messages.add({severity:'warn', summary:'Email or url in use', detail:'Email or url already in use!'});
        this.loading = false;
      }

    } catch (exception) {
      this.messages.add({severity:'error', summary:'Something failed!', detail:'Something has failed. Check your internet connection or try again later'});
      this.loading = false;

    }
  }

  imgSelected(filePickerEvent: any){
    if(filePickerEvent.target.files[0]) {
      this.img = filePickerEvent.target.files[0];
    }
  }

}
