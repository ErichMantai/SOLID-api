import { AppError } from './../../../../errors/AppError';
import { inject, injectable } from "tsyringe"
import { IUsersRepository } from "../../repositories/IUsersRepository"
import { ICreateUserDTO } from "../../dtos/ICreateUserDTO"
import { hash } from "bcryptjs";

@injectable()
class CreateUserCase{

    constructor(
        @inject("UsersRepository")  
        private usersRepository: IUsersRepository
    ){}


    async execute({name,email,password,driver_license}: ICreateUserDTO): Promise<void> {

        const userAlreadExists = await this.usersRepository.findByEmail(email);

        if(userAlreadExists) {
            throw new AppError("User already exists",401)
        };

        const passwordHash = await hash(password,8);

        await this.usersRepository.create({
            name,
            email,
            password : passwordHash,
            driver_license
        })
    }
}

export {CreateUserCase}