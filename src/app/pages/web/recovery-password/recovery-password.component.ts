import { Component } from '@angular/core';
import { FormControl, FormGroup, Validators } from '@angular/forms';
import { Router } from '@angular/router';
import { RecoveryPassword } from 'src/app/models/auth/recovery-password';
import { SecurityService } from 'src/app/services/security.service';

@Component({
  selector: 'app-recovery-password',
  templateUrl: './recovery-password.component.html',
  styleUrls: ['./recovery-password.component.scss'],
})
export class RecoveryPasswordComponent {
  recoveryForm!: FormGroup;
  errors: any[] = [];
  isLoading: boolean = false;
  isPassRecoverySucess: boolean = false;
  user!: RecoveryPassword;

  constructor(
    private router: Router,
    private securityService: SecurityService
  ) {
    this.isLoading = false;
    this.recoveryForm = new FormGroup({
      email: new FormControl('', [Validators.required]),
    });
  }

  get email() {
    return this.recoveryForm.get('email')!;
  }

  recoveryPass() {
    if (this.recoveryForm.invalid) {
      return;
    }
    this.user = Object.assign({}, this.user, this.recoveryForm.value);
    this.isLoading = true;
    this.securityService.recoveryPassword(this.user).subscribe(
      (sucesso) => {
        this.processarSucesso(sucesso);
      },
      (falha) => {
        this.processarFalha(falha);
      }
    );
  }

  processarSucesso(response: any) {
    this.isLoading = true;
    this.errors = [];
    let token = response.crypt;
    this.router.navigate(['/reset-password/', token]);
  }
  processarFalha(fail: any) {
    this.isLoading = false;
    this.errors = fail.error.errors;
  }
}
