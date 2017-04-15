import { Component, OnInit } from '@angular/core';
import { FormBuilder, FormGroup, Validators } from '@angular/forms';
import { Task } from './../task';

@Component({
  selector: 'app-new-task',
  templateUrl: './new-task.component.html',
  styleUrls: ['./new-task.component.css']
})
export class NewTaskComponent implements OnInit {

  newTask = new Task('');
  newTaskForm: FormGroup;
  submitted = false;

  constructor(private fb: FormBuilder) {
    this.createForm();
  }

  ngOnInit() {
  }

  onSubmit() : void {
    this.submitted = true;
    this.newTask = this.newTaskForm.value;
  }

  createForm() : void {
    
    var date = new Date();
    
    this.newTaskForm = this.fb.group({
      title: ['New task', Validators.required ],
      description: ['Task description', Validators.required],
      dueDate: date.getMonth() + 3 + "/" + date.getDay() + 1 + "/" + date.getFullYear(),
      parent: '1'
    });

    this.newTaskForm.valueChanges
        .subscribe(data => this.onValueChanged(data));

    this.onValueChanged();
  }

  onValueChanged(data?: any) : void {
    if (! this.newTaskForm) { return; }
    const form = this.newTaskForm;
    
    for(const field in this.formErrors) {
      this.formErrors[field] = '';
      const control = form.get(field);

      if (control && control.dirty && !control.valid) {
        const messages = this.validationMessage[field];
        for(const key in control.errors) {
          this.formErrors[field] += messages[key] + ' ';
        }
      }
    }    
  }

  formErrors = {
    'title': '',
    'description': '',
    'dueDate': ''
  }

  validationMessage = {
    'title' : {
      'required' : 'Title is required'
    },
    'description' : {
      'required' : 'Description is required'
    }
  }
}
