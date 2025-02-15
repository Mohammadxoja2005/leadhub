import { Body, Controller, Get, HttpStatus, Post, Req, Res, UseGuards } from "@nestjs/common";
import { Request, Response } from "express";
import { decode, JwtPayload } from "jsonwebtoken";
import { Input as CreateInput } from "./create";
import { Input as UpdateInput } from "./update";
import {
    CreateDealUseCase,
    DeleteDealUseCase,
    GetAllDealsUseCase,
    GetDealUseCase,
    UpdateDealUseCase,
} from "app/application/usecases";
import { AuthGuard } from "app/application/api/guard";

@Controller("deal")
@UseGuards(AuthGuard)
export class DealController {
    constructor(
        private readonly createDealUseCase: CreateDealUseCase,
        private readonly getAllDealsUseCase: GetAllDealsUseCase,
        private readonly getDealUseCase: GetDealUseCase,
        private readonly updateDealUseCase: UpdateDealUseCase,
        private readonly deleteDealUseCase: DeleteDealUseCase,
    ) {}

    @Post("/create")
    async create(@Body() body: CreateInput, @Req() request: Request, @Res() response: Response) {
        try {
            const { user_id, project_id } = decode(request.header("Token") as string) as JwtPayload;

            const dealWithMetadata = {
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
    async getAll(@Req() request: Request, @Res() response: Response): Promise<void> {
        try {
            const { user_id: userId, project_id: projectId } = decode(
                request.header("Token") as string,
            ) as JwtPayload;
            const page = request.query.page as string;

            const deals = await this.getAllDealsUseCase.execute({
                userId,
                projectId,
                meta: { page },
            });

            response.status(HttpStatus.OK).json(deals);
        } catch (error) {
            console.error("Error GetAllDealsUseCase", error);

            throw error;
        }
    }

    @Get("/:id")
    async get(@Req() request: Request, @Res() response: Response): Promise<void> {
        try {
            const { id } = request.params;

            const deal = await this.getDealUseCase.execute(id);

            response.status(HttpStatus.OK).json(deal);
        } catch (error) {
            console.error("Error GetDealUseCase", error);

            throw error;
        }
    }

    @Post("update/id")
    async update(@Body() body: UpdateInput, @Res() response: Response) {
        // TODO need to add check if it is userId and projectId of user belongs to the deal then update it. Should add in db,
        try {
            await this.updateDealUseCase.execute(body);

            response.status(HttpStatus.OK);
        } catch (error) {
            console.error("Error UpdateDealUseCase", error);

            throw error;
        }
    }

    @Post("delete/:id")
    async delete(@Req() request: Request, @Res() response: Response): Promise<void> {
        // TODO need to add check if it is userId and projectId of user belongs to the deal then delete it. Should add in db
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
