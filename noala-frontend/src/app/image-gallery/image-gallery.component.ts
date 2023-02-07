import { Component } from '@angular/core';
import {
  trigger,
  style,
  animate,
  transition,
} from '@angular/animations';

import { ImageData, ImageServiceService } from '../image-service.service';
import { ActivatedRoute } from '@angular/router';


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

export class ImageGalleryComponent {
  images: Array<ImageData> = [];
  loading: boolean = true;
  isLoadingFavorites: boolean = false;

  constructor(private imageService: ImageServiceService, private router: ActivatedRoute) {
    router.queryParams.subscribe((params: Record<string, any>) => {
      this.loadImages(params['favorite']);
      this.isLoadingFavorites = params['favorite'];
    });
  }

  ngOnInit() {
    this.loadImages();
  }

  loadImages(isLoadingFavorites = false): void {
    this.loading = true;
    this.imageService.getImages(isLoadingFavorites).subscribe((data) => {
      this.images = data;
    })
  }

  addToFav(index: number): void {
    this.imageService.addImageToFavourite(this.images[index].url).subscribe(() => {
      this.images[index].addedToFav = true;
    });
  }
}
