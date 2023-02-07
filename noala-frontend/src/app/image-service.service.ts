import { Injectable } from '@angular/core';
import { HttpClient } from '@angular/common/http';
import { Observable } from 'rxjs';

import { environment } from '../environments/environment';

export type ImageData = {
  url: string;
  addedToFav?: boolean;
};

@Injectable({
  providedIn: 'root',
})
export class ImageServiceService {
  constructor(private http: HttpClient) {}

  getImages(isLoadingFavorites = false): Observable<Array<ImageData>> {
    return this.http.get<Array<ImageData>>(
      environment.apiURL,
      {
        params: {
          favorites: isLoadingFavorites
        },
      }
    );
  }

  addImageToFavourite(url: string) {
    return this.http.post(environment.apiURL, {
      image: url,
    });
  }
}
