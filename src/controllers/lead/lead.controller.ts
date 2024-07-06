import { Controller, Get, HttpStatus, Inject, Req, Res, UseGuards } from "@nestjs/common";
import { LeadService } from "../../interfaces";
import { serviceTokens } from "../../common/tokens/service.tokens";
import { AuthGuard } from "../../guard";
import { Request, Response } from "express";
import { decode, JwtPayload } from "jsonwebtoken";

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
}
