import { Injectable } from '@nestjs/common';

@Injectable()
export class UsersService {

   findAll(){
        return [];
   }
   findById(id:number){
      return [id];
   }

}
