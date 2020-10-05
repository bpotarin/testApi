import { Component, OnInit } from '@angular/core';
import { TodoService } from 'src/app/service/todo.service';
@Component({
  selector: 'app-emp',
  templateUrl: './emp.component.html',
  styleUrls: ['./emp.component.css'],
})
export class EmpComponent implements OnInit {
  /*public name: string;
  public age: number;
  public emps = null;*/
  //private emps = new Employee(data);
  emps = null;

  constructor(private todoService: TodoService) {
    //this.emps = this.todoService.getEmpList();

    this.todoService.getEmpList().subscribe((data) => {
      //console.warn(data);
      this.emps = data;
    });
  }

  ngOnInit(): void {}
}
