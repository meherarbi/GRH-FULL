import { Component, OnInit } from '@angular/core';
import { FormGroup, FormBuilder, Validators } from '@angular/forms';
import { AuthService } from './../../Service/auth/auth.service';
import { Router } from '@angular/router';
import { LoginFormData } from './login-form-data';
@Component({
  selector: 'app-login',
  templateUrl: './login.component.html',
  styleUrls: ['./login.component.css']
})
export class LoginComponent implements OnInit {

  loginForm: FormGroup;

  constructor(private authService: AuthService, private formBuilder: FormBuilder, private router: Router) {
    this.loginForm = this.formBuilder.group({
      email: ['', [Validators.required, Validators.email]],
      password: ['', Validators.required]
    });
  }

  ngOnInit(): void {
  }

  onSubmit() {
    

    if (this.loginForm.valid) {
    const formData: LoginFormData = this.loginForm.value;
    this.login(formData);
  } else {
    alert('Veuillez remplir tous les champs correctement');
  }
  }

  private login(formData: LoginFormData) {
    this.authService.login(formData.id,formData.email, formData.password).subscribe(
      (response) => {
        const token = response.token;
        localStorage.setItem('access_token', token);
        this.router.navigate(['/home']);
      },
      (error) => {
        console.log(error);
        alert('Identifiants invalides');
      }
    );
  }

}