import { Module } from "@nestjs/common";
import { Infrastructure } from "../common/tokens";
import {
    ContactRepositoryImpl,
    DealRepositoryImpl,
    LeadRepositoryImpl,
    UserRepositoryImpl,
} from "./repositories";
import { MongooseModule } from "@nestjs/mongoose";
import { LeadSchema } from "./repositories";
import { Collections } from "./schema";

@Module({
    imports: [MongooseModule.forFeature([{ name: Collections.Lead, schema: LeadSchema }])],
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
    ],
    exports: [
        Infrastructure.Repository.Deal,
        Infrastructure.Repository.Lead,
        Infrastructure.Repository.User,
        Infrastructure.Repository.Contact,
    ],
})
export class InfrastructureModule {}
