import * as mongoose from 'mongoose' ;

export const ProductSchema = new mongoose.Schema({
    name: {type: String, required: true} ,
    price: {type: Number, required: true},
    quantity: {type: Number, required: true},
    image: {type: String, required: true}
}) ;

export interface Product extends mongoose.Document {
    _id: string ;
    name: string ;
    price: number ;
    quantity: number ;
    image: string ;
}
