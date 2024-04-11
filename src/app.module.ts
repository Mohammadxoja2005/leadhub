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
        UserServiceImpl,
        LeadServiceImpl,
        DealServiceImpl,
        ContactServiceImpl,
    ],
})
export class AppModule {}
