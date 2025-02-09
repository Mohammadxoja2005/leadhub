import { Body, Controller, Get, HttpStatus, Post, Req, Res, UseGuards } from "@nestjs/common";
import { Request, Response } from "express";
import { Deal } from "app/domain";
import { decode, JwtPayload } from "jsonwebtoken";
import { Input } from "./create";
import {
    CreateDealUseCase,
    DeleteDealUseCase,
    FindAllDealsUseCase,
    FindDealUseCase,
    UpdateDealUseCase,
} from "app/application/usecases";
import { AuthGuard } from "app/application/api/guard";

@Controller("deal")
@UseGuards(AuthGuard)
export class DealController {
    constructor(
        private readonly createDealUseCase: CreateDealUseCase,
        private readonly findAllDealsUseCase: FindAllDealsUseCase,
        private readonly findDealUseCase: FindDealUseCase,
        private readonly updateDealUseCase: UpdateDealUseCase,
        private readonly deleteDealUseCase: DeleteDealUseCase,
    ) {}

    @Post("/create")
    async create(@Body() body: Input, @Req() request: Request, @Res() response: Response) {
        try {
            const { user_id, project_id } = decode(request.header("Token") as string) as JwtPayload;

            const dealWithMetadata: Deal = {
                userId: user_id,
                projectId: project_id,
                ...body,
            };

            await this.createDealUseCase.execute(dealWithMetadata);

            response.status(HttpStatus.CREATED);
        } catch (error) {
            console.error("Error in CreateDealUseCase", error);

            throw error;
        }
    }

    @Get()
    async findAll(@Req() request: Request, @Res() response: Response): Promise<void> {
        try {
            const { user_id: userId, project_id: projectId } = decode(
                request.header("Token") as string,
            ) as JwtPayload;

            const deals = await this.findAllDealsUseCase.execute();

            response.status(HttpStatus.OK).json(deals);
        } catch (error) {
            console.error("Error FindAllDealsUseCase", error);

            throw error;
        }
    }

    @Get("/:id")
    async findOne(@Req() request: Request, @Res() response: Response): Promise<void> {
        try {
            const { id } = request.params;

            const lead = await this.findDealUseCase.execute(id);

            response.status(HttpStatus.OK).json(lead);
        } catch (error) {
            console.error("Error FindDealUseCase", error);

            throw error;
        }
    }

    @Post("update/id")
    async update(@Req() request: Request, @Res() response: Response) {
        try {
            const body = request.body;

            await this.updateDealUseCase.execute(body);

            response.status(HttpStatus.OK);
        } catch (error) {
            console.error("Error UpdateDealUseCase", error);

            throw error;
        }
    }

    @Post("delete/:id")
    async delete(@Req() request: Request, @Res() response: Response): Promise<void> {
        try {
            const { id } = request.params;

            await this.deleteDealUseCase.execute(id);

            response.status(HttpStatus.OK);
        } catch (error) {
            console.error("Error DeleteDealUseCase", error);

            throw error;
        }
    }
}
