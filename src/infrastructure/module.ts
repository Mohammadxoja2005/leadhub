import { Module } from "@nestjs/common";
import { Infrastructure } from "app/common";
import {
    ContactRepositoryImpl,
    DealRepositoryImpl,
    DealSchema,
    LeadRepositoryImpl,
    UserRepositoryImpl,
    LeadSchema,
    ContactSchema,
} from "./repositories";
import { MongooseModule } from "@nestjs/mongoose";
import { Collections } from "./schema";

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
            {
                name: Collections.Deal,
                schema: DealSchema,
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
