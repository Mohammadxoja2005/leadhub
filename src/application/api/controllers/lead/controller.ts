import { Body, Controller, Get, HttpStatus, Post, Req, Res, UseGuards } from "@nestjs/common";
import { AuthGuard } from "app/application/api/guard";
import { Request, Response } from "express";
import { decode, JwtPayload } from "jsonwebtoken";
import { Input } from "./create";
import { Lead } from "app/domain";
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
        private readonly findAllLeadsUseCase: GetAllLeadsUseCase,
        private readonly createLeadUseCase: CreateLeadUseCase,
        private readonly findLeadUsecase: GetLeadUsecase,
        private readonly updateLeadUseCase: UpdateLeadUseCase,
        private readonly deleteLeadUsecase: DeleteLeadUsecase,
    ) {}

    @Get()
    async findAll(@Req() request: Request, @Res() response: Response): Promise<void> {
        try {
            const { user_id: userId, project_id: projectId } = decode(
                request.header("Token") as string,
            ) as JwtPayload;

            const leads = await this.findAllLeadsUseCase.execute(userId, projectId);

            response.status(HttpStatus.OK).json(leads);
        } catch (error) {
            console.error("Error FindAllLeadsUseCase", error);

            throw error;
        }
    }

    @Get("/:id")
    async findOne(@Req() request: Request, @Res() response: Response): Promise<void> {
        try {
            const { id } = request.params;

            const lead = await this.findLeadUsecase.execute(id);

            response.status(HttpStatus.OK).json(lead);
        } catch (error) {
            console.error("Error FindLeadUsecase", error);

            throw error;
        }
    }

    @Post("/create")
    async create(
        @Body() body: Input,
        @Req() request: Request,
        @Res() response: Response,
    ): Promise<void> {
        try {
            const { user_id, project_id } = decode(request.header("Token") as string) as JwtPayload;

            const leadWithMetadata: Lead = {
                userId: user_id,
                projectId: project_id,
                ...body,
            };

            await this.createLeadUseCase.execute(leadWithMetadata);

            response.status(HttpStatus.CREATED);
        } catch (error) {
            console.error("Error CreateLeadUseCase", error);

            throw error;
        }
    }

    @Post("update/:id")
    async update(@Req() request: Request, @Res() response: Response): Promise<void> {
        try {
            const body = request.body;

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
            console.error("Error DeleteLeadUsecase", error);

            throw error;
        }
    }
}
