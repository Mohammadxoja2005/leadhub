import { Module } from "@nestjs/common";
import { UserController } from "./controllers";
import {
    ContactRepositoryImpl,
    DealRepositoryImpl,
    UserRepositoryImpl,
    LeadRepositoryImpl,
} from "./repository";
import { repositoryTokens } from "./common/tokens/repository.tokens";
import { LeadServiceImpl, UserServiceImpl, DealServiceImpl, ContactServiceImpl } from "./service";
import { serviceTokens } from "./common/tokens/service.tokens";

@Module({
    controllers: [UserController],
    providers: [
        {
            provide: repositoryTokens.deal,
            useClass: DealRepositoryImpl,
        },
        {
            provide: repositoryTokens.lead,
            useClass: LeadRepositoryImpl,
        },
        {
            provide: repositoryTokens.user,
            useClass: UserRepositoryImpl,
        },
        {
            provide: repositoryTokens.contact,
            useClass: ContactRepositoryImpl,
        },
        {
            provide: serviceTokens.user,
            useClass: UserServiceImpl,
        },
        {
            provide: serviceTokens.lead,
            useClass: LeadServiceImpl,
        },
        {
            provide: serviceTokens.deal,
            useClass: DealServiceImpl,
        },
        {
            provide: serviceTokens.contact,
            useClass: ContactServiceImpl,
        },
    ],
})
export class AppModule {}
