"use strict";
var __decorate = (this && this.__decorate) || function (decorators, target, key, desc) {
    var c = arguments.length, r = c < 3 ? target : desc === null ? desc = Object.getOwnPropertyDescriptor(target, key) : desc, d;
    if (typeof Reflect === "object" && typeof Reflect.decorate === "function") r = Reflect.decorate(decorators, target, key, desc);
    else for (var i = decorators.length - 1; i >= 0; i--) if (d = decorators[i]) r = (c < 3 ? d(r) : c > 3 ? d(target, key, r) : d(target, key)) || r;
    return c > 3 && r && Object.defineProperty(target, key, r), r;
};
var __metadata = (this && this.__metadata) || function (k, v) {
    if (typeof Reflect === "object" && typeof Reflect.metadata === "function") return Reflect.metadata(k, v);
};
Object.defineProperty(exports, "__esModule", { value: true });
exports.AppService = void 0;
const common_1 = require("@nestjs/common");
const dist_1 = require("@nestjs/axios/dist");
let AppService = class AppService {
    constructor(httpService) {
        this.httpService = httpService;
        this.favoriteImages = [];
    }
    async getRandomImages() {
        const fetchImages = [];
        for (let i = 0; i < 5; i++) {
            fetchImages.push(this.httpService.axiosRef
                .get('https://dog.ceo/api/breeds/image/random')
                .then(({ data }) => data));
        }
        return Promise.all(fetchImages);
    }
    addFavoriteImages(image) {
        if (!this.favoriteImages.includes(image)) {
            this.favoriteImages.push(image);
        }
        return this.favoriteImages;
    }
    isFavoriteImage(image) {
        return this.favoriteImages.includes(image);
    }
    getFavoriteImages() {
        return this.favoriteImages;
    }
};
AppService = __decorate([
    (0, common_1.Injectable)(),
    __metadata("design:paramtypes", [dist_1.HttpService])
], AppService);
exports.AppService = AppService;
//# sourceMappingURL=app.service.js.map