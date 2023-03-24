import { Component, OnInit } from '@angular/core';
import { FormGroup, FormBuilder, Validators } from '@angular/forms';
import { HttpResponse, HttpErrorResponse } from '@angular/common/http';
import { AuthService } from 'src/app/Service/auth/auth.service';
import { Router } from '@angular/router';

@Component({
    selector: 'app-register',
    templateUrl: './register.component.html',
    styleUrls: ['./register.component.css'],
})
export class RegisterComponent implements OnInit {
    registerForm!: FormGroup;
    

    constructor(private formBuilder: FormBuilder, private authService: AuthService,private router: Router) {}

    ngOnInit(): void {
        this.registerForm = this.formBuilder.group({
            email: ['', [Validators.required, Validators.email]],
            password: ['', Validators.required],
        });
    }

    onSubmit(): void {
        const formData = this.registerForm.value;
        this.authService.register(formData.email, formData.password).subscribe(
            (response:HttpResponse<any>) => {
                console.log(response);
                this.router.navigate(['/login']);
            },
            (error:HttpErrorResponse) => {
                console.log(error);
            }
        );
    }
}
