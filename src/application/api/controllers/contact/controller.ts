import { Body, Controller, Get, HttpStatus, Post, Req, Res, UseGuards } from "@nestjs/common";
import { Input as CreateInput } from "./create";
import { Input as UpdateInput } from "./update";
import { AuthGuard } from "app/application/api/guard";
import { decode, JwtPayload } from "jsonwebtoken";
import { Request, Response } from "express";
import {
    CreateContactUseCase,
    DeleteContactUseCase,
    GetAllContactsUseCase,
    GetContactUseCase,
    UpdateContactUseCase,
} from "app/application/usecases";

@Controller("contact")
@UseGuards(AuthGuard)
export class ContactController {
    constructor(
        private readonly createContactUseCase: CreateContactUseCase,
        private readonly getAllContactsUseCase: GetAllContactsUseCase,
        private readonly getContactUseCase: GetContactUseCase,
        private readonly updateContactUseCase: UpdateContactUseCase,
        private readonly deleteContactUseCase: DeleteContactUseCase,
    ) {}

    @Post("/create")
    async create(
        @Body() body: CreateInput,
        @Req() request: Request,
        @Res() response: Response,
    ): Promise<void> {
        try {
            const { userId, projectId } = decode(request.header("Token") as string) as JwtPayload;

            const contactWithMetadata = {
                userId: userId,
                projectId: projectId,
                ...body,
            };

            await this.createContactUseCase.execute(contactWithMetadata);

            response.json(HttpStatus.CREATED);
        } catch (error) {
            console.error("Error in CreateContactUseCase", error);

            throw error;
        }
    }

    @Get("/get/all")
    async getAll(@Req() request: Request, @Res() response: Response): Promise<void> {
        try {
            const { userId, projectId } = decode(request.header("Token") as string) as JwtPayload;
            const page = request.query.page as string;

            const contacts = await this.getAllContactsUseCase.execute({
                userId,
                projectId,
                meta: { page },
            });

            response.status(HttpStatus.OK).json(contacts);
        } catch (error) {
            console.error("Error in GetAllContactsUseCase", error);

            throw error;
        }
    }

    @Get("get/:id")
    async get(@Req() request: Request, @Res() response: Response): Promise<void> {
        try {
            const { id: contactId } = request.params;

            const contact = await this.getContactUseCase.execute(contactId);

            response.status(HttpStatus.OK).json(contact);
        } catch (error) {
            console.error("Error in GetContactUseCase", error);

            throw error;
        }
    }

    @Post("update/:id")
    async update(
        @Body() body: UpdateInput,
        @Req() request: Request,
        @Res() response: Response,
    ): Promise<void> {
        // TODO need to add check if it is userId and projectId of user belonga to the contact then update it. Should add in db,
        try {
            const { id } = request.params;
            const contactWithId = {
                ...body,
                id,
            };

            await this.updateContactUseCase.execute(contactWithId);

            response.json(HttpStatus.OK);
        } catch (error) {
            console.error("Error in UpdateContactUseCase", error);

            throw error;
        }
    }

    @Post("delete/:id")
    async delete(@Req() request: Request, @Res() response: Response): Promise<void> {
        // TODO need to add check if it is userId and projectId of user belonga to the contact then delete it. Should add in db
        try {
            const { id: contactId } = request.params;

            await this.deleteContactUseCase.execute(contactId);

            response.json(HttpStatus.OK);
        } catch (error) {
            console.error("Error in DeleteContactUseCase", error);

            throw error;
        }
    }
}
