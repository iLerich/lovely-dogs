import { Component, HostBinding, OnDestroy } from '@angular/core';
import {
  trigger,
  state,
  style,
  animate,
  transition,
} from '@angular/animations';

import { ImageData, ImageServiceService } from '../image-service.service';


@Component({
  selector: 'app-image-gallery',
  templateUrl: './image-gallery.component.html',
  styleUrls: ['./image-gallery.component.scss'],
  animations: [
    trigger('zoomInOut', [
      transition(':leave', [
        animate(200, style({ transform: 'scale(0)' }))
      ]),
      transition(':enter', [
        style({ transform: 'scale(0)' }),
        animate(300, style({ transform: 'scale(1)' }))
      ])
    ])
  ]
})
export class ImageGalleryComponent implements OnDestroy {
  images: Array<ImageData> = [];
  loading: boolean = true;

  constructor(private imageService: ImageServiceService) {
    this.loadImages();
  }

  loadImages(): void {
    this.loading = true;
    this.imageService.getImages().subscribe((data) => {
      this.images = data;
    })
  }

  addToFav(index: number): void {
    this.imageService.addImageToFavourite(this.images[index].url).subscribe(() => {
      this.images[index].addedToFav = true;
    });
  }

  ngOnDestroy(): void {

  }
}
