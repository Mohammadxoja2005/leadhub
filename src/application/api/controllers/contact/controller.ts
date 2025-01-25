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
import { Application } from "../../../../common/tokens";
import { ContactService } from "../../../services";
import { Contact } from "../../../../domain";
import { Input } from "./create";
import { AuthGuard } from "../../guard";
import { decode, JwtPayload } from "jsonwebtoken";
import { Request, Response } from "express";

@Controller("contact")
@UseGuards(AuthGuard)
export class ContactController {
    constructor(
        @Inject(Application.Service.Contact) private readonly contactService: ContactService,
    ) {}

    @Post("/create")
    async create(
        @Body() body: Input,
        @Req() request: Request,
        @Res() response: Response,
    ): Promise<void> {
        const { user_id, project_id } = decode(request.header("Token") as string) as JwtPayload;

        const contactWithMetadata: Contact = {
            user_id,
            project_id,
            ...body,
        };

        const contact = await this.contactService.createContact(contactWithMetadata);

        response.status(HttpStatus.CREATED).json(contact);
    }

    @Get()
    async findAll(@Req() request: Request, @Res() response: Response): Promise<void> {
        const { user_id, project_id } = decode(request.header("Token") as string) as JwtPayload;

        const contacts = await this.contactService.findAllContacts(user_id, project_id);

        response.status(HttpStatus.OK).json(contacts);
    }

    @Get("/:id")
    async findOne(@Req() request: Request, @Res() response: Response): Promise<void> {
        const { id } = request.params;

        const contact = await this.contactService.findOneContact(id);

        response.status(HttpStatus.OK).json(contact);
    }

    @Post("update/:id")
    async update(@Req() request: Request, @Res() response: Response): Promise<void> {
        const body = request.body;

        await this.contactService.updateContact(body);

        response.status(HttpStatus.OK).json("Contact updated");
    }

    @Post("delete/:id")
    async delete(@Req() request: Request, @Res() response: Response): Promise<void> {
        const { id } = request.params;

        await this.contactService.deleteContact(id);

        response.status(HttpStatus.OK).json("Contact deleted");
    }
}
