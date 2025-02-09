import { Body, Controller, Get, HttpStatus, Post, Req, Res, UseGuards } from "@nestjs/common";
import { AuthGuard } from "app/application/api/guard";
import { Request, Response } from "express";
import { decode, JwtPayload } from "jsonwebtoken";
import { Input as CreateInput } from "./create";
import { Input as UpdateInput } from "./update";
import {
    CreateLeadUseCase,
    DeleteLeadUsecase,
    GetAllLeadsUseCase,
    GetLeadUsecase,
    UpdateLeadUseCase,
} from "app/application/usecases";

@Controller("lead")
@UseGuards(AuthGuard)
export class LeadController {
    constructor(
        private readonly getAllLeadsUseCase: GetAllLeadsUseCase,
        private readonly createLeadUseCase: CreateLeadUseCase,
        private readonly getLeadUsecase: GetLeadUsecase,
        private readonly updateLeadUseCase: UpdateLeadUseCase,
        private readonly deleteLeadUsecase: DeleteLeadUsecase,
    ) {}

    @Get()
    async getAll(@Req() request: Request, @Res() response: Response): Promise<void> {
        try {
            const { user_id: userId, project_id: projectId } = decode(
                request.header("Token") as string,
            ) as JwtPayload;
            const page = request.query.page as string;

            const leads = await this.getAllLeadsUseCase.execute({
                userId,
                projectId,
                meta: { page: page },
            });

            response.status(HttpStatus.OK).json(leads);
        } catch (error) {
            console.error("Error GetAllLeadsUseCase", error);

            throw error;
        }
    }

    @Get("/:id")
    async get(@Req() request: Request, @Res() response: Response): Promise<void> {
        try {
            const { id } = request.params;

            const lead = await this.getLeadUsecase.execute(id);

            response.status(HttpStatus.OK).json(lead);
        } catch (error) {
            console.error("Error GetLeadUseCase", error);

            throw error;
        }
    }

    @Post("/create")
    async create(
        @Body() body: CreateInput,
        @Req() request: Request,
        @Res() response: Response,
    ): Promise<void> {
        try {
            const { user_id, project_id } = decode(request.header("Token") as string) as JwtPayload;

            const leadWithMetadata = {
                ...body,
                userId: user_id,
                projectId: project_id,
            };

            await this.createLeadUseCase.execute(leadWithMetadata);

            response.status(HttpStatus.CREATED);
        } catch (error) {
            console.error("Error CreateLeadUseCase", error);

            throw error;
        }
    }

    @Post("update/:id")
    async update(@Body() body: UpdateInput, @Res() response: Response): Promise<void> {
        try {
            await this.updateLeadUseCase.execute(body);

            response.status(HttpStatus.OK);
        } catch (error) {
            console.error("Error UpdateLeadUseCase", error);

            throw error;
        }
    }

    @Post("delete/:id")
    async delete(@Req() request: Request, @Res() response: Response): Promise<void> {
        try {
            const { id } = request.params;

            await this.deleteLeadUsecase.execute(id);

            response.status(HttpStatus.OK);
        } catch (error) {
            console.error("Error DeleteLeadUseCase", error);

            throw error;
        }
    }
}
