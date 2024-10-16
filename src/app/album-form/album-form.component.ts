import { CommonModule } from '@angular/common';
import { Component } from '@angular/core';
import {
  FormBuilder,
  FormGroup,
  ReactiveFormsModule,
  Validators,
} from '@angular/forms';
import { Router } from '@angular/router';
import { AlbumService } from '../album.service';

@Component({
  selector: 'app-album-form',
  standalone: true,
  imports: [CommonModule, ReactiveFormsModule],
  templateUrl: './album-form.component.html',
  styleUrls: ['./album-form.component.css'],
})
export class AlbumFormComponent {
  albumForm: FormGroup;

  constructor(
    private fb: FormBuilder,
    private albumService: AlbumService,
    router: Router
  ) {
    this.albumForm = this.fb.group({
      title: ['', Validators.required],
      artist: ['', Validators.required],
      price: [
        '',
        [Validators.required, Validators.pattern(/^\d+(\.\d{1,2})?$/)],
      ], // Ensure price is a valid number
    });
  }

  onSubmit(): void {
    console.log('Form submitted', this.albumForm.valid);
    const formValue = this.albumForm.value;
    const album = {
      ...formValue,
      price: parseFloat(formValue.price),
    };
    this.albumService.addAlbum(album).subscribe({
      next: () => console.log('Album added'),
      error: (error) => console.error('Failed to add album', error),
    });
  }
}
