import { Injectable, NotFoundException } from "@nestjs/common";
import { User } from "./user.model" ;
import { InjectModel } from "@nestjs/mongoose" ;
import  { Model } from "mongoose"

@Injectable()
export class UsersService {
   private users: User[] = [] ;

    constructor(@InjectModel('User') private readonly userModel: Model<User> ) {

    }

    async insertUser( firstname: string , lastname: string , address: string) {
        const newUser = new this.userModel({
            firstname,
            lastname: lastname,
            address
        }) ;
        const result = await newUser.save() ;
        return result._id as string ;
    }

    async getUsers() {
        const users = await this.userModel.find().exec() ;

        return users.map((user) => ({
            _id: user._id,
            firstname: user.firstname,
            lastname: user.lastname,
            address: user.address
        }));
    }

    async getSingleUser(userId: string) {
        const user = await this.findUser(userId);
        return {
            _id: user._id,
            firstname: user.firstname,
            lastname: user.lastname,
            address: user.address
        } ;
    }

    async updateUser(userId:string, firstname: string , lastname: string , address: string) {
        const updateUser = await this.findUser(userId) ;

        if(firstname) {
            updateUser.firstname = firstname ;
        }
        if(lastname) {
            updateUser.lastname = lastname ;
        }
        if(address) {
            updateUser.address = address ;
        }
        updateUser.save() ;
    }

    async deleteUser(userId: string) {
        const result = await this.userModel.deleteOne({_id: userId}).exec() ;
        // @ts-ignore
        if (result.n === 0 ) {
            throw new NotFoundException('Could not found this product') ;
        }
    }

    private async findUser(id: string): Promise<User> {
        let user ;
        try {
            user = await this.userModel.findById(id).exec() ;
        }catch (error) {
            throw new NotFoundException('Could not found this product') ;
        }
        if(!user) {

        }
        return user ;
    }
}
