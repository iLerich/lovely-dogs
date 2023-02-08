import { AppService } from './app.service';
declare class AddToFavQueryDto {
    image: string;
}
declare class GetImagesQueryDto {
    favorites: boolean;
}
export declare class AppController {
    private readonly appService;
    constructor(appService: AppService);
    getImages(query: GetImagesQueryDto): Promise<{
        url: string;
        addedToFav: boolean;
    }[]>;
    addImageToFav(body: AddToFavQueryDto): string[];
}
export {};
