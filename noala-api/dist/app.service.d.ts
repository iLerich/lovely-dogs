import { HttpService } from '@nestjs/axios/dist';
export type DogImageResponse = {
    status: string;
    message: string;
};
export declare class AppService {
    private httpService;
    private favoriteImages;
    constructor(httpService: HttpService);
    getRandomImages(): Promise<Array<DogImageResponse>>;
    addFavoriteImages(image: string): Array<string>;
    isFavoriteImage(image: string): boolean;
    getFavoriteImages(): Array<string>;
}
