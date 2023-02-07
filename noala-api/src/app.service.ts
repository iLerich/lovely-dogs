import { Injectable } from '@nestjs/common';
import { HttpService } from '@nestjs/axios/dist';

export type DogImageResponse = {
  status: string;
  message: string;
};

@Injectable()
export class AppService {
  private favoriteImages: Array<string>;
  constructor(private httpService: HttpService) {
    this.favoriteImages = [];
  }

  async getRandomImages(): Promise<Array<DogImageResponse>> {
    const fetchImages = [];
    for (let i = 0; i < 5; i++) {
      fetchImages.push(
        this.httpService.axiosRef
          .get('https://dog.ceo/api/breeds/image/random')
          .then(({ data }) => data),
      );
    }

    return Promise.all(fetchImages);
  }

  addFavoriteImages(image: string): Array<string> {
    if (!this.favoriteImages.includes(image)) {
      this.favoriteImages.push(image);
    }
    return this.favoriteImages;
  }

  isFavoriteImage(image: string): boolean {
    return this.favoriteImages.includes(image);
  }

  getFavoriteImages(): Array<string> {
    return this.favoriteImages;
  }
}
