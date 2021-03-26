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

  /* ATTRIBUTES */
  public form: FormGroup;

  /* CONSTRUCTOR */
  constructor(private fb: FormBuilder,
              private router: Router,
              private auth: AuthService) {

    /* Form group */
    this.form = fb.group({
      email: ['test@testemail.com', [Validators.required]],
      password: ['test', [Validators.required]]
    });
  }

  /* ON INIT */
  ngOnInit(): void {
  }

  /* LOGIN */
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
