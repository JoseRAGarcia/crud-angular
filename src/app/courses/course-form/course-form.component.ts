import { Component } from '@angular/core';
import { FormBuilder, FormGroup, ReactiveFormsModule } from '@angular/forms';
import { Router } from '@angular/router';

import { AppMaterialModule } from '../../shared/app-material/app-material.module';
import { CoursesService } from '../services/courses.service';
import { MatSnackBar } from '@angular/material/snack-bar';

@Component({
  selector: 'app-course-form',
  standalone: true,
  imports: [
    AppMaterialModule,
    ReactiveFormsModule,
  ],
  templateUrl: './course-form.component.html',
  styleUrl: './course-form.component.scss'
})
export class CourseFormComponent {
  form: FormGroup;

  constructor(
    private formBuilder: FormBuilder,
    private coursesServise: CoursesService,
    private router: Router,
    private _snackBar: MatSnackBar
  ) {
    this.form = this.formBuilder.group({
      name: [null],
      category: [null],
    })
  }

  back() {
    this.router.navigate(['courses'])
  }

  onSubmit() {
    this.coursesServise.save(this.form.value).subscribe(response => {
      console.log(response);
      this.back()
    }, error => {
      console.log(error);
      this.onError()
    }
    )
  }

  onCancel() { }

  onError() {
    this._snackBar.open('Erro ao salvar curso', '', { duration: 2000 });
  }
}
