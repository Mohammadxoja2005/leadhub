import { Body, Controller, Get, HttpStatus, Post, Req, Res, UseGuards } from "@nestjs/common";
import { Contact } from "app/domain";
import { Input } from "./create";
import { AuthGuard } from "app/application/api/guard";
import { decode, JwtPayload } from "jsonwebtoken";
import { Request, Response } from "express";
import {
    CreateContactUseCase,
    DeleteContactUseCase,
    FindAllContactsUseCase,
    FindContactUseCase,
    UpdateContactUsecase,
} from "app/application/usecases";

@Controller("contact")
@UseGuards(AuthGuard)
export class ContactController {
    constructor(
        private readonly createContactUseCase: CreateContactUseCase,
        private readonly findAllContactsUseCase: FindAllContactsUseCase,
        private readonly findContactUseCase: FindContactUseCase,
        private readonly updateContactUseCase: UpdateContactUsecase,
        private readonly deleteContactUseCase: DeleteContactUseCase,
    ) {}

    @Post("/create")
    async create(
        @Body() body: Input,
        @Req() request: Request,
        @Res() response: Response,
    ): Promise<void> {
        try {
            const { user_id, project_id } = decode(request.header("Token") as string) as JwtPayload;

            const contactWithMetadata: Contact = {
                userId: user_id,
                projectId: project_id,
                ...body,
            };

            await this.createContactUseCase.execute(contactWithMetadata);

            response.status(HttpStatus.CREATED);
        } catch (error) {
            console.error("Error in CreateContactUseCase", error);

            throw error;
        }
    }

    @Get()
    async findAll(@Req() request: Request, @Res() response: Response): Promise<void> {
        try {
            const { user_id: userId, project_id: projectId } = decode(
                request.header("Token") as string,
            ) as JwtPayload;

            const contacts = await this.findAllContactsUseCase.execute(userId, projectId);

            response.status(HttpStatus.OK).json(contacts);
        } catch (error) {
            console.error("Error in FindAllContactsUseCase", error);

            throw error;
        }
    }

    @Get("/:id")
    async findOne(@Req() request: Request, @Res() response: Response): Promise<void> {
        try {
            const { contact_id: contactId } = request.params;

            const contact = await this.findContactUseCase.execute(contactId);

            response.status(HttpStatus.OK).json(contact);
        } catch (error) {
            console.error("Error in findContactUseCase", error);

            throw error;
        }
    }

    @Post("update/:id")
    async update(@Req() request: Request, @Res() response: Response): Promise<void> {
        try {
            const body = request.body;

            await this.updateContactUseCase.execute(body);

            response.status(HttpStatus.OK);
        } catch (error) {
            console.error("Error in UpdateContactUseCase", error);

            throw error;
        }
    }

    @Post("delete/:id")
    async delete(@Req() request: Request, @Res() response: Response): Promise<void> {
        try {
            const { contact_id: contactId } = request.params;

            await this.deleteContactUseCase.execute(contactId);

            response.status(HttpStatus.OK);
        } catch (error) {
            console.error("Error in DeleteContactUseCase", error);

            throw error;
        }
    }
}
