import {Module} from "@nestjs/common";
import {UserController} from "./controllers";
import {ContactRepository, DealRepository, UserRepository, LeadRepository} from "./repository";
import {UserService} from "./service";

@Module({
    controllers: [UserController],
    providers: [
        ContactRepository,
        DealRepository,
        UserRepository,
        LeadRepository,
        UserService
    ],
})
export class AppModule {

}
