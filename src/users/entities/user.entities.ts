import {Column, Entity, PrimaryGeneratedColumn} from "typeorm"


@Entity("users")
export class Users{

    @PrimaryGeneratedColumn()
    id: number;

    @Column({unique:true,nullable:false})
    email: string

    @Column({length:25,nullable:true})
    firstname: string
    
    @Column({length:25,nullable:true})
    lastname: string

    @Column({nullable:false})
    password: string;

    @Column({nullable:true})
    age:number
}