import { Module } from "@nestjs/common";
import { Application } from "../common/tokens";
import { ContactServiceImpl, DealServiceImpl, LeadServiceImpl, UserServiceImpl } from "./services";
import { LeadController, UserController } from "./api/controllers";
import { InfrastructureModule } from "../infrastructure/module";
import {
    CreateContactUseCase,
    DeleteContactUseCase,
    FindAllContactsUseCase,
    FindContactUseCase,
    UpdateContactUsecase,
} from "./usecases";

@Module({
    imports: [InfrastructureModule],
    controllers: [UserController, LeadController],
    providers: [
        {
            provide: Application.Service.User,
            useClass: UserServiceImpl,
        },
        {
            provide: Application.Service.Lead,
            useClass: LeadServiceImpl,
        },
        {
            provide: Application.Service.Deal,
            useClass: DealServiceImpl,
        },
        {
            provide: Application.Service.Contact,
            useClass: ContactServiceImpl,
        },
        CreateContactUseCase,
        FindAllContactsUseCase,
        FindContactUseCase,
        UpdateContactUsecase,
        DeleteContactUseCase,
    ],
    exports: [
        Application.Service.User,
        Application.Service.Lead,
        Application.Service.Deal,
        Application.Service.Contact,
    ],
})
export class ApplicationModule {}
