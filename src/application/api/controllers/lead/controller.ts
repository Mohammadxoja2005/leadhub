import {
    Body,
    Controller,
    Get,
    HttpStatus,
    Inject,
    Post,
    Req,
    Res,
    UseGuards,
} from "@nestjs/common";
import { LeadService } from "../../../services";
import { Application } from "../../../../common/tokens";
import { AuthGuard } from "../../guard";
import { Request, Response } from "express";
import { decode, JwtPayload } from "jsonwebtoken";
import { Input } from "./create";
import { Lead } from "../../../../domain";

@Controller("lead")
@UseGuards(AuthGuard)
export class LeadController {
    constructor(@Inject(Application.Service.Lead) private readonly leadService: LeadService) {}

    @Get()
    async findAll(@Req() request: Request, @Res() response: Response): Promise<void> {
        const { user_id, project_id } = decode(request.header("Token") as string) as JwtPayload;

        const leads = await this.leadService.findAllLeads(user_id, project_id);

        response.status(HttpStatus.OK).json(leads);
    }

    @Get("/:id")
    async findOne(@Req() request: Request, @Res() response: Response): Promise<void> {
        const { id } = request.params;

        const lead = await this.leadService.findOneLead(id);

        response.status(HttpStatus.OK).json(lead);
    }

    @Post("/create")
    async create(
        @Body() body: Input,
        @Req() request: Request,
        @Res() response: Response,
    ): Promise<void> {
        const { user_id, project_id } = decode(request.header("Token") as string) as JwtPayload;

        const leadWithMetadata: Lead = {
            user_id,
            project_id,
            ...body,
        };

        const lead = await this.leadService.createLead(leadWithMetadata);

        response.status(HttpStatus.CREATED).json(lead);
    }

    @Post("update/:id")
    async update(@Req() request: Request, @Res() response: Response): Promise<void> {
        const body = request.body;

        await this.leadService.updateLead(body);

        response.status(HttpStatus.OK).json("lead updated");
    }

    @Post("delete/:id")
    async delete(@Req() request: Request, @Res() response: Response): Promise<void> {
        const { id } = request.params;

        await this.leadService.deleteLead(id);

        response.status(HttpStatus.OK).json("lead deleted");
    }
}
