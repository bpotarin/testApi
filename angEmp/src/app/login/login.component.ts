import { Component, OnInit } from '@angular/core';
import { FormGroup, FormControl } from '@angular/forms';
import { NgForm } from '@angular/forms';
import { TodoService } from 'src/app/service/todo.service';

@Component({
  selector: 'app-login',
  templateUrl: './login.component.html',
  styleUrls: ['./login.component.css'],
})
export class LoginComponent implements OnInit {
  //username="";
  //password="";
  constructor(private todoService: TodoService) {}

  ngOnInit(): void {}

  login(formLogin: NgForm) {
    // this.todoService.getEmpList();
    //console.log(JSON.stringify(formLogin.value));
    this.todoService.checkLogin(formLogin.value).subscribe((data) => {
      console.log(data);
    });

    //console.log(this.todoService.checkLogin(formLogin.value));

    //const authC = this;
    //console.log(this.userame);
    //console.warn(username.value);
  }
}
