import { CommonModule } from '@angular/common';
import { Component } from '@angular/core';
import { MatDialog } from '@angular/material/dialog';
import { ActivatedRoute, Router } from '@angular/router';
import { catchError, Observable, of } from 'rxjs';

import { AppMaterialModule } from '../../shared/app-material/app-material.module';
import { ErrorDialogComponent } from './../../shared/components/error-dialog/error-dialog.component';
import { Course } from './../model/course';
import { CoursesService } from './../services/courses.service';

@Component({
  selector: 'app-courses',
  standalone: true,
  imports: [AppMaterialModule, CommonModule, ErrorDialogComponent],
  templateUrl: './courses.component.html',
  styleUrl: './courses.component.scss'
})
export class CoursesComponent {
  courses$: Observable<Course[]>;
  displayedColumns = ['name', 'category', 'actions']
  // coursesServise: CoursesService;

  constructor(
    private coursesServise: CoursesService,
    public dialog: MatDialog,
    private router: Router,
    private route: ActivatedRoute
  ) {
    // this.coursesServise = new CoursesService();
    this.courses$ = this.coursesServise.list().pipe(
      catchError(error => {
        this.onError('Erro ao carregar cursos!')
        return of([])
      })
    )
  }

  onAdd() {
    this.router.navigate(['new'], { relativeTo: this.route })
  }

  onError(errorMessage: string) {
    this.dialog.open(ErrorDialogComponent, {
      data: errorMessage,
    });
  }

  getIcon(value: string): string {
    switch (value) {
      case 'Frontend':
        return 'code';
      case 'Backend':
        return 'computer'
    }
    return 'code';
  }
}
