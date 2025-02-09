import { Module } from "@nestjs/common";
import { Application } from "app/common";
import { ContactServiceImpl, DealServiceImpl, LeadServiceImpl, UserServiceImpl } from "./services";
import { ContactController, LeadController, UserController } from "./api/controllers";
import { InfrastructureModule } from "../infrastructure/module";
import {
    CreateContactUseCase,
    DeleteContactUseCase,
    FindAllContactsUseCase,
    GetAllLeadsUseCase,
    FindContactUseCase,
    UpdateContactUsecase,
    CreateLeadUseCase,
    GetLeadUsecase,
    UpdateLeadUseCase,
    DeleteLeadUsecase,
    RegisterUserUseCase,
    LoginUserUseCase,
    CreateDealUseCase,
    FindAllDealsUseCase,
    FindDealUseCase,
    UpdateDealUseCase,
    DeleteDealUseCase,
} from "./usecases";

@Module({
    imports: [InfrastructureModule],
    controllers: [UserController, LeadController, ContactController],
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
        GetAllLeadsUseCase,
        CreateLeadUseCase,
        GetLeadUsecase,
        UpdateLeadUseCase,
        DeleteLeadUsecase,
        RegisterUserUseCase,
        LoginUserUseCase,
        CreateDealUseCase,
        FindAllDealsUseCase,
        FindDealUseCase,
        UpdateDealUseCase,
        DeleteDealUseCase,
    ],
    exports: [
        Application.Service.User,
        Application.Service.Lead,
        Application.Service.Deal,
        Application.Service.Contact,
    ],
})
export class ApplicationModule {}
