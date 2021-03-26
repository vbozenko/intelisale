import {Component, OnInit} from '@angular/core';
import {FormBuilder, FormGroup, Validators} from '@angular/forms';
import {Router} from '@angular/router';
import {AuthService} from '../../core/services/auth.service';

@Component({
  selector: 'app-login',
  templateUrl: './login.component.html',
  styleUrls: ['./login.component.scss']
})
export class LoginComponent implements OnInit {

  /* Member variables */
  public form: FormGroup;

  /* Constructor */
  constructor(private fb: FormBuilder,
              private router: Router,
              private auth: AuthService) {

    this.form = fb.group({
      email: ['test@testemail.com', [Validators.required]],
      password: ['test', [Validators.required]]
    });
  }

  /* ngOnInit */
  ngOnInit(): void {
  }

  /* Login */
  public login(): any {
    const val = this.form.value;

    this.auth.login(val.email, val.password)
      .subscribe(
        () => {
          this.router.navigateByUrl('/home/clients');
        },
        error => alert('Login failed'));
  }

}
