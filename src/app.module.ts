import { Module } from "@nestjs/common";
import { InfrastructureModule } from "./infrastructure/module";
import { ApplicationModule } from "./application/module";

@Module({
    imports: [InfrastructureModule, ApplicationModule],
})
export class AppModule {}
