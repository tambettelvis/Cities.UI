import { Component } from '@angular/core';
import {FormBuilder, Validators} from "@angular/forms";
import {ApiService} from "../../services/api.service";
import {MatDialogRef} from "@angular/material/dialog";
import {MatSnackBar} from "@angular/material/snack-bar";

@Component({
  selector: 'app-login-dialog',
  templateUrl: './login-dialog.component.html',
  styleUrls: ['./login-dialog.component.scss']
})
export class LoginDialogComponent {

  form = this.fb.group({
    username: ['', Validators.required],
    password: ['', Validators.required],
  });

  constructor(private fb: FormBuilder,
              private apiService: ApiService,
              private dialogRef: MatDialogRef<LoginDialogComponent>,
              private snackBar: MatSnackBar,
              ) { }

  submit() {
    const username = this.form.get('username')?.value;
    const password = this.form.get('password')?.value;
    if (this.form.valid && username && password) {
      this.apiService.login(username, password)
        .subscribe(() => {
          this.dialogRef.close();
          this.snackBar.open('Logged in', undefined, {
            duration: 2000,
          });
        }, err => {
          this.snackBar.open('Incorrect username or password', undefined, {
            duration: 2000,
          })
        });
    } else {
      this.snackBar.open('Invalid form values', undefined, {
        duration: 2000,
      });
    }

  }
}
