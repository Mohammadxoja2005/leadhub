import { Module } from "@nestjs/common";
import { UserController, LeadController } from "./application/api/controllers";
import {
    ContactRepositoryImpl,
    DealRepositoryImpl,
    UserRepositoryImpl,
    LeadRepositoryImpl,
} from "./infrastructure/repositories";
import {
    LeadServiceImpl,
    UserServiceImpl,
    DealServiceImpl,
    ContactServiceImpl,
} from "./application/services";
import { Infrastructure, Application } from "./common/tokens";

@Module({
    controllers: [UserController, LeadController],
    providers: [
        {
            provide: Infrastructure.Repository.Deal,
            useClass: DealRepositoryImpl,
        },
        {
            provide: Infrastructure.Repository.Lead,
            useClass: LeadRepositoryImpl,
        },
        {
            provide: Infrastructure.Repository.User,
            useClass: UserRepositoryImpl,
        },
        {
            provide: Infrastructure.Repository.Contact,
            useClass: ContactRepositoryImpl,
        },
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
    ],
})
export class AppModule {}
