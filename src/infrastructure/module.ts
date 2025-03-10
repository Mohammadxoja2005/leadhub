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
    UserSchema,
} from "./repositories";
import { MongooseModule } from "@nestjs/mongoose";
import { Collections } from "./schema";
import { PassportModule } from "@nestjs/passport";
import { AuthGoogleStrategy } from "app/infrastructure/auth/strategies/google";

@Module({
    imports: [
        PassportModule.register({ defaultStrategy: "google" }),
        MongooseModule.forRoot("mongodb://localhost:27017/leadhub"),
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
            {
                name: Collections.User,
                schema: UserSchema,
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
        {
            provide: Infrastructure.Auth.Google,
            useClass: AuthGoogleStrategy,
        },
    ],
    exports: [
        Infrastructure.Repository.Deal,
        Infrastructure.Repository.Lead,
        Infrastructure.Repository.User,
        Infrastructure.Repository.Contact,
        Infrastructure.Auth.Google,
    ],
})
export class InfrastructureModule {}
