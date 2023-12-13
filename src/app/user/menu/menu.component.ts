import { HttpClient } from '@angular/common/http';
import { Component, EventEmitter, OnDestroy, OnInit, Output } from '@angular/core';
import { FormBuilder, FormControl, FormGroup, Validators } from '@angular/forms';
import { Router } from '@angular/router';
import * as CryptoJS from 'crypto-js';
import { AdminProductsService } from 'src/app/admin/services/admin-products.service';
import { AuthUserGuard } from 'src/app/auth-user.guard';
import { CartService } from 'src/app/user/services/cart.service';
import { ProductsDataService } from 'src/app/user/services/products-data.service';
import { ApiUrl, MenuBar, logData, loginLogData } from 'src/environments/environment';
import { NGXLogger } from "ngx-logger";
import { LogService } from '../services/log.service';
import { Subscription } from 'rxjs';

@Component({
  selector: 'app-menu',
  templateUrl: './menu.component.html',
  styleUrls: ['./menu.component.css']
})
export class MenuComponent implements OnInit, OnDestroy {
  admins: any = "";
  adminLoggedin: boolean = false;
  users: any = "";
  loggedin: boolean = false;
  loggedinUser: any = "";
  loggedinUserMail: string = "";

  cartDataCount: number = 0;
  forgotPasswordFormGroup!: FormGroup;

  remainingTime: any;
  subscriptionData: Subscription[]|undefined = [];

  forgotPasswordRequestUrl = ApiUrl.forgotPasswordRequestUrl;
  registeredUrl = ApiUrl.getRegisteredUsersUrl;

  loginModalImage = MenuBar.images.loginModalImage;
  registerModalImage = MenuBar.images.registerModalImage;

  alphabetsValidation = MenuBar.validations.usernameValidation.alphabetsValidation;
  whiteSpaceValidation = MenuBar.validations.usernameValidation.whiteSpaceValidation;
  nameValidation = MenuBar.validations.usernameValidation.nameValidation;
  mailValidation = MenuBar.validations.mailMobilePasswordValidation.mailValidation;
  mobileValidation = MenuBar.validations.mailMobilePasswordValidation.mobileValidation;
  passwordValidation = MenuBar.validations.mailMobilePasswordValidation.passwordValidation;

  forgotPasswordMailValidation = MenuBar.validations.mailMobilePasswordValidation.mailValidation;

  private readonly encryptionKey = 'RkMart Member';

  @Output() loginStatus: EventEmitter<boolean> = new EventEmitter<boolean>();

  constructor(private dataService: ProductsDataService, private logger: NGXLogger, private logService : LogService,private cartService: CartService, private FormBuilder: FormBuilder, private admin: AdminProductsService, private productDataService: ProductsDataService, private auth: AuthUserGuard, private router: Router, private http: HttpClient) {
    this.subscriptionData?.push(this.dataService.registeredUser().subscribe((user) => {
      this.users = user;
    }));
    this.subscriptionData?.push(this.dataService.admin().subscribe((user) => {
      this.admins = user;
    }));
    this.loggedin = this.dataService.userLogin;
    this.loggedinUser = this.dataService.activeUser;
    this.adminLoggedin = this.admin.admin;

    this.forgotPasswordFormGroup = this.FormBuilder.group(
      {
        forgotMailId: [, [Validators['required'], Validators['pattern']]],
      })
  }

  ngOnInit() {
    if (sessionStorage.getItem('userLoggedIn')) {
      this.loggedin = true;
      this.dataService.userLogin = this.loggedin;
      this.loggedinUser = sessionStorage.getItem('userName');
      this.cartService.getUsersCartList(sessionStorage.getItem('userId'));
      this.subscriptionData?.push(this.cartService.getProducts().subscribe(product => this.cartDataCount = product.length));
    }
  }

  registerForm = this.FormBuilder.group(
    {
      username: [, [Validators['required'], Validators['pattern'], Validators['minLength'], this.userValidate(this.whiteSpaceValidation , 'pattern1'), this.userValidate(this.nameValidation, 'pattern2')
      ]],
      mail: [, [Validators['required'], Validators['pattern']]],
      mobile: [, [Validators['required'], Validators['pattern']]],
      password: ['', [Validators['required'], Validators.pattern(this.passwordValidation)]]
    }
  )

  userValidate(pattern: any, errorKey: any) {
    return (control: FormControl) => {
      const username: any = control.value;
      const isValid = pattern.test(username);

      if (!username) {
        return null;
      }

      if (!isValid) {
        return {
          [errorKey]: true
        };
      }

      return false;
    };
  }

  loginModal() {
    this.subscriptionData?.push(this.dataService.registeredUser().subscribe((user) => {
      this.users = user;
    }, (error: any) => {
      this.logService.fetchError(error);
    } ));
    const LoginPanel: any = document.querySelector(".Loginmodal");
    const RegisterPanel: any = document.querySelector(".Registermodal");
    const SuccessfulRegistered: any = document.querySelector('.registerSuccessModal');

    RegisterPanel.close();
    SuccessfulRegistered.close();
    LoginPanel.showModal();
  }

  closePanel() {
    const loginDiv: any = document.querySelector(".Loginmodal");
    const RegisterPanel: any = document.querySelector(".Registermodal");
    loginDiv.close();
    RegisterPanel.close();
  }

  registerModal() {
    const RegisterPanel: any = document.querySelector(".Registermodal");
    const LoginPanel: any = document.querySelector(".Loginmodal");
    LoginPanel.close();
    RegisterPanel.showModal();
  }

  registerUser() {
    let invalidRegistration: any = document.querySelector('#registerError');

    if (this.registerForm.valid) {
      let newUser: boolean = true;

      let SuccessfulRegistered: any = document.querySelector('.registerSuccessModal');
      const RegisterPanel: any = document.querySelector(".Registermodal");
      RegisterPanel.close();

      this.subscriptionData?.push(this.http.get<any>(`${this.registeredUrl}`).subscribe((user) => {
        user.find((userData: any) => {
          if (userData.mail == this.registerForm.get('mail')?.value || userData.mobile == this.registerForm.get('mobile')?.value) {
            newUser = false;
          }
        });
        if (newUser) {
          let userPassword: any = this.registerForm.controls["password"].value;
          let encryptedPassword: any = CryptoJS.AES.encrypt(userPassword, this.encryptionKey).toString();

          let usernameData: any = this.registerForm.controls['username'].value;
          let updatedData = usernameData.charAt(0)?.toUpperCase() + usernameData.slice(1);
          let userDatas = {
            ...this.registerForm.value,
            username: updatedData,
            password: encryptedPassword
          }
          this.subscriptionData?.push(this.dataService.registerUser(userDatas).subscribe());

          let logDataFetched = logData;
          logDataFetched.message = `New User Registration: ${JSON.stringify(userDatas)}` ;
          
          this.logService.info(logDataFetched, ApiUrl.registrationLogUrl);

          SuccessfulRegistered.showModal();
        } else {
          alert("Already Registered");
          RegisterPanel.showModal();
        }
      }, (error: any) => {
        this.logService.fetchError(error);
      }));
    } else {
      invalidRegistration.innerHTML = "Enter all the fields";
      setTimeout(() => invalidRegistration.innerHTML = '', 3000)
    }
  }

  login(usermail: any, userpassword: any) {
    var invalidLogin: any = document.querySelector('#loginError');
    this.loggedin = false;

    if (usermail.value.trim() !== '' || userpassword.value.trim() !== '') {
      this.users.find((user: any) => {
        let decryptedValue = CryptoJS.AES.decrypt(user.password, this.encryptionKey).toString(CryptoJS.enc.Utf8);
        if (usermail.value === user.mail && userpassword.value === decryptedValue) {
          invalidLogin.innerHTML = "";
          this.loggedinUser = user;
          this.dataService.activeUser = this.loggedinUser;
          this.loggedin = true;
          this.dataService.userLogin = this.loggedin;
          sessionStorage.setItem('userLoggedIn', 'true')
          sessionStorage.setItem('userName', user.username);
          sessionStorage.setItem('userMail', user.mail);
          sessionStorage.setItem('userId', user.id);
          this.cartService.getUsersCartList(sessionStorage.getItem('userId'));
          this.subscriptionData?.push(this.cartService.getProducts().subscribe(product => this.cartDataCount = product.length));
          this.closePanel();
          alert("Login Successful");
          this.loginStatus.emit(this.loggedin);
        }
      })

      if (!this.loggedin) {
        this.admins.find((user: any) => {
          let decryptedValue = CryptoJS.AES.decrypt(user.password, this.encryptionKey).toString(CryptoJS.enc.Utf8);

          if (usermail.value === user.mail && userpassword.value === decryptedValue) {
            this.loggedin = true;
            this.admin.admin = true;
            sessionStorage.setItem('adminLoggedIn', 'true')
            sessionStorage.setItem('userName', user.name);
            this.closePanel();
            this.router.navigate(['admin/dashboard']);
          }
        })
      }

      if (!this.loggedin) {
        var invalidLogin: any = document.querySelector('#loginError');
        invalidLogin.innerHTML = "Invalid Credentials";

        let loginLog = loginLogData;
        loginLog.message = `Invalid Login Attempt : ${JSON.stringify(usermail.value)}`;

        this.logService.warn(loginLog, ApiUrl.invalidLoginLogUrl);
        
        setTimeout(() => {
          invalidLogin.innerHTML = " "
        }, 3000);
      }
    } else {
      invalidLogin.innerHTML = "Enter all the fields";
      setTimeout(() => invalidLogin.innerHTML = " ", 3000)
    }
  }

  forgot() {
    let forgotPasswordModal: any = document.querySelector('.forgotPasswordModal');
    forgotPasswordModal.showModal();
  }

  forgotPassword(mail: any) {
    if (this.forgotPasswordFormGroup.valid) {
      let forgotPasswordData = {
        mail,
        Query: "Forgot Password"
      }
      this.subscriptionData?.push(this.http.post(`${this.forgotPasswordRequestUrl}`, forgotPasswordData).subscribe((response) => {
        let forgotPasswordDiv: any = document.querySelector('.forgotPasswordModal');
        forgotPasswordDiv.close();
        let forgotPasswordModal: any = document.querySelector('.ForgotPasswordSuccessModal');
        forgotPasswordModal.showModal();
      }));
    }
  }

  forgotModalClose() {
    let forgotPasswordModal: any = document.querySelector('.forgotPasswordModal');
    forgotPasswordModal.close();
  }

  closeSuccessModal() {
    let forgotPasswordModal: any = document.querySelector('.ForgotPasswordSuccessModal');
    forgotPasswordModal.close();
  }

  logout() {
    let result = confirm("Are you sure want to Logout");
    if (result) {
      this.loggedin = false;
      this.dataService.userLogin = this.loggedin;
      this.loggedinUser = "";
      this.dataService.activeUser = this.loggedinUser;
      sessionStorage.clear();
      this.loginStatus.emit(this.loggedin);
      this.router.navigate(['/home']);
    }
  }

  toggleMenuBar() {
    let menu = document.querySelector('.menuBox');
    menu?.classList.toggle('menuActive');
  }

  ngOnDestroy(): void {
    this.subscriptionData?.forEach((subscribeData:Subscription)=> subscribeData.unsubscribe());
  }
}