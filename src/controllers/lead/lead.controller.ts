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
import { LeadService } from "../../interfaces";
import { serviceTokens } from "../../common/tokens/service.tokens";
import { AuthGuard } from "../../guard";
import { Request, Response } from "express";
import { decode, JwtPayload } from "jsonwebtoken";
import { LeadCreateDto } from "../../common/dto/lead/lead-create.dto";
import { Lead } from "../../domain";

@Controller("lead")
@UseGuards(AuthGuard)
export class LeadController {
    constructor(@Inject(serviceTokens.lead) private readonly leadService: LeadService) {}

    @Get()
    async findAll(@Req() request: Request, @Res() response: Response): Promise<void> {
        const { user_id, project_id } = decode(request.header("Token") as string) as JwtPayload;

        const leads = await this.leadService.findAllLeads(user_id, project_id);

        response.status(HttpStatus.OK).json(leads);
    }

    @Post("/create")
    async create(
        @Body() body: LeadCreateDto,
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
}
