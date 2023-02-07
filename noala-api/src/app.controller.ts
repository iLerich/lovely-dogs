import { Controller, Get, Post, Body, Query } from '@nestjs/common';
import { ApiProperty } from '@nestjs/swagger/dist';
import { AppService, DogImageResponse } from './app.service';

class AddToFavQueryDto {
  @ApiProperty({
    description: 'Add image to favorites',
  })
  image: string;
}
class GetImagesQueryDto {
  @ApiProperty({
    description:
      'Get images. when favorites query is true, it will return saved favorite images',
  })
  favorites: boolean;
}

@Controller()
export class AppController {
  constructor(private readonly appService: AppService) {}

  @Get()
  async getImages(@Query() query: GetImagesQueryDto) {
    if (String(query.favorites) === 'true') {
      const images = this.appService.getFavoriteImages();

      return images.map((image: string) => ({
        url: image,
        addedToFav: true,
      }));
    } else {
      const images = await this.appService.getRandomImages();

      return images.map((image: DogImageResponse) => ({
        url: image.message,
        addedToFav: this.appService.isFavoriteImage(image.message),
      }));
    }
  }

  @Post()
  addImageToFav(@Body() body: AddToFavQueryDto) {
    return this.appService.addFavoriteImages(body.image);
  }
}
