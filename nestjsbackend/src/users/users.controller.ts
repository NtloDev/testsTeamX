import {Controller, Post, Body, Get, Param, Patch, Delete, Res } from "@nestjs/common" ;
import { UsersService } from './users.service'

@Controller()
export class UsersController {
    constructor(private readonly usersService: UsersService) {
    }

    // enregistre un utilisateur sur la base de données
    @Post('user')
    async addUser(
        @Body('firstname') userFirstName: string,
        @Body('lastname') userLastName: string,
        @Body('address') address: string ,
    ) {
      const generatedId = await this.usersService.insertUser(userFirstName, userLastName, address ) ;
        return { _id: generatedId };
    }

    // récupère l’ensemble des utilisateurs enregistrés
    @Get('users')
    async getAllUsers() {
        const users = await this.usersService.getUsers() ;
        return users ;
    }

    // récupère un utilisateur par son id(identifiant)
    @Get('user/:id')
    getUser(@Param('id') userId: string) {
        return  this.usersService.getSingleUser(userId) ;
    }

    // modifie un utilisateur par son id
    @Patch('user/:id')
    async updateUser(@Param('id') userId: string,
                  @Body('firstname') firstName: string,
                  @Body('lastname') lastName: string,
                  @Body('address') address: string) {
       await this.usersService.updateUser(userId, firstName, lastName, address) ;
        return {_id : userId} ;

    }

    // supprime un utilisateur par son id
    @Delete('user/:id')
    async removeUser(@Param('id') userId: string,) {
        await this.usersService.deleteUser(userId) ;
    }
}
