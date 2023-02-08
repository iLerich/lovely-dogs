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
var __param = (this && this.__param) || function (paramIndex, decorator) {
    return function (target, key) { decorator(target, key, paramIndex); }
};
Object.defineProperty(exports, "__esModule", { value: true });
exports.AppController = void 0;
const common_1 = require("@nestjs/common");
const dist_1 = require("@nestjs/swagger/dist");
const app_service_1 = require("./app.service");
class AddToFavQueryDto {
}
__decorate([
    (0, dist_1.ApiProperty)({
        description: 'Add image to favorites',
    }),
    __metadata("design:type", String)
], AddToFavQueryDto.prototype, "image", void 0);
class GetImagesQueryDto {
}
__decorate([
    (0, dist_1.ApiProperty)({
        description: 'Get images. when favorites query is true, it will return saved favorite images',
    }),
    __metadata("design:type", Boolean)
], GetImagesQueryDto.prototype, "favorites", void 0);
let AppController = class AppController {
    constructor(appService) {
        this.appService = appService;
    }
    async getImages(query) {
        if (String(query.favorites) === 'true') {
            const images = this.appService.getFavoriteImages();
            return images.map((image) => ({
                url: image,
                addedToFav: true,
            }));
        }
        else {
            const images = await this.appService.getRandomImages();
            return images.map((image) => ({
                url: image.message,
                addedToFav: this.appService.isFavoriteImage(image.message),
            }));
        }
    }
    addImageToFav(body) {
        return this.appService.addFavoriteImages(body.image);
    }
};
__decorate([
    (0, common_1.Get)(),
    __param(0, (0, common_1.Query)()),
    __metadata("design:type", Function),
    __metadata("design:paramtypes", [GetImagesQueryDto]),
    __metadata("design:returntype", Promise)
], AppController.prototype, "getImages", null);
__decorate([
    (0, common_1.Post)(),
    __param(0, (0, common_1.Body)()),
    __metadata("design:type", Function),
    __metadata("design:paramtypes", [AddToFavQueryDto]),
    __metadata("design:returntype", void 0)
], AppController.prototype, "addImageToFav", null);
AppController = __decorate([
    (0, common_1.Controller)(),
    __metadata("design:paramtypes", [app_service_1.AppService])
], AppController);
exports.AppController = AppController;
//# sourceMappingURL=app.controller.js.map