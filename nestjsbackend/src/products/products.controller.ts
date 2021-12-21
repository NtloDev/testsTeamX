import {Controller, Post, Body, Get, Param, Patch, Delete, UseInterceptors, UploadedFile } from "@nestjs/common" ;
import { FileInterceptor } from "@nestjs/platform-express";
import { ProductsService } from './products.service';

@Controller()
export class ProductsController {
    constructor(
        private readonly productsService: ProductsService,
    ) {
    }

    // enregistre un produit sur la base de données
    @Post('product')
    @UseInterceptors(FileInterceptor('image'))
    async addProduct(
        @Body('name') prodName: string,
        @Body('price') prodPrice: number,
        @Body('quantity') prodquantity: number,
        @UploadedFile() image: Express.Multer.File
    ) {
         const img = image.buffer.toString('base64') ;
      const generatedId = await this.productsService.insertProduct(prodName, prodPrice, prodquantity, img) ;
        return { id: generatedId };
    }

    // récupère l’ensemble des produits enregistrés
    @Get('products')
    async getAllProducts() {
        const products = await this.productsService.getProducts().then() ;
        return products ;
    }

    // récupère un produit par son id(identifiant)
    @Get('product/:id')
    getProduct(@Param('id') prodId: string) {
        return  this.productsService.getSingleProduct(prodId) ;
    }

    // modifie un produit par son id
    @Patch('product/:id')
    @UseInterceptors(FileInterceptor('image'))
    async updateProduct(@Param('id') prodId: string,
                  @Body('name') prodName: string,
                  @Body('price') prodPrice: number,
                  @Body('quantity') prodquantity: number,
                  @Body('image') prodImage: string,
                  @UploadedFile() image: Express.Multer.File
    ) {

      if(image) {
        const img = image.buffer.toString('base64') ;
        await this.productsService.updateProduct(prodId, prodName, prodPrice, prodquantity , img) ;
        return {_id: prodId} ;
      }
      else {
        await this.productsService.updateProduct(prodId, prodName, prodPrice, prodquantity , prodImage ) ;
        return {_id: prodId} ;
      }

    }
    // supprime un produit
    @Delete('product/:id')
    async removeProduct(@Param('id') prodId: string,) {
        await this.productsService.deleteProduct(prodId) ;
    }
}
