import { ICategriesRepository } from "../../repositories/ICategoriesRepository";

interface IRequest {
    name: string;
    description: string;
}

class CreateCategoryUseCase {
    constructor(private categoriesRepository: ICategriesRepository) { };

    execute({ description, name }: IRequest): void {
        const categoryAlreadExists = this.categoriesRepository.findByName(name);

        if (categoryAlreadExists) {
            throw new Error("Category already exists!");
        }

        this.categoriesRepository.create({ name, description });
    }
}

export { CreateCategoryUseCase }