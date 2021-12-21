import { Injectable, NotFoundException } from "@nestjs/common";
import { Product } from "./product.model" ;
import  { InjectModel } from "@nestjs/mongoose";
import  { Model } from "mongoose"

@Injectable()
export class ProductsService {
   private products: Product[] = [] ;

   constructor(@InjectModel('Product') private readonly productModel: Model<Product> ) {

   }

    async insertProduct( name: string , price: number , quantity: number, image: string ) {
        const newProduct = new this.productModel({
            name ,
            price: price ,
            quantity,
            image: image
        }) ;
        const result = await newProduct.save() ;
        //console.log(result) ;
        return result._id as string ;
    }


    async getProducts() {
       const products = await this.productModel.find().exec() ;

        return products ;
    }

    async getSingleProduct(productId: string) {
        const product = await this.findProduct(productId);
        return product;
    }

    async updateProduct(productId:string, name: string , price: number , quantity: number , image: string) {
        const updateProduct = await this.findProduct(productId) ;

        if(name) {
            updateProduct.name = name ;
        }
        if(price) {
            updateProduct.price = price ;
        }
        if(quantity) {
            updateProduct.quantity = quantity ;
        }
        if(image) {
            updateProduct.image = image ;
        }
        updateProduct.save() ;
    }

    async deleteProduct(prodId: string) {
       const result = await this.productModel.deleteOne({_id: prodId}).exec() ;
       // @ts-ignore
        if (result.n === 0 ) {
           throw new NotFoundException('Could not found this product') ;
       }

    }

    private async findProduct(_id: string): Promise<Product> {
        let product ;
        try {
             product = await this.productModel.findById(_id).exec() ;
        }catch (error) {
            throw new NotFoundException('Could not found this product') ;
        }
        return product ;
    }
}
