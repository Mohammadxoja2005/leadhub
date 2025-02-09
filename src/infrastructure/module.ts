import { Module } from "@nestjs/common";
import { Infrastructure } from "app/common";
import {
    ContactRepositoryImpl,
    DealRepositoryImpl,
    LeadRepositoryImpl,
    UserRepositoryImpl,
} from "./repositories";
import { MongooseModule } from "@nestjs/mongoose";
import { LeadSchema } from "./repositories";
import { Collections } from "./schema";
import { ContactSchema } from "app/infrastructure/repositories/contact/schema";

@Module({
    imports: [
        MongooseModule.forFeature([
            {
                name: Collections.Lead,
                schema: LeadSchema,
            },
            {
                name: Collections.Contact,
                schema: ContactSchema,
            },
        ]),
    ],
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
