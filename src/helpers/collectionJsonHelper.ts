import { Injectable } from "@nestjs/common";
import { RequestCollection } from "../interfaces/collection-json-templates/request-collection.type";
import { ResponseCollection } from "../interfaces/collection-json-templates/response-collection.type";

export interface CollectionJsonHelper {
    parseRequestJsonCollection<T>(request: RequestCollection<T>): T;

    buildResponseJsonCollection<T>(response: T): ResponseCollection<T>;
}

@Injectable()
export class CollectionJsonHelperImpl implements CollectionJsonHelper {
    public parseRequestJsonCollection<T>(request: RequestCollection<T>): T {
        return request.template.data;
    }

    public buildResponseJsonCollection<T>(response: T): ResponseCollection<T> {
        const responseCollection: ResponseCollection<T> = {
            collection: {
                version: "1.0",
                href: "",
                items: [],
            },
        };

        if (typeof response === "object") {
            responseCollection.collection.items.push({
                href: "",
                data: response,
                links: {},
            });

            return responseCollection;
        }

        if (Array.isArray(response)) {
            for (const responseObj of response) {
                responseCollection.collection.items.push({
                    href: "",
                    data: responseObj,
                    links: {},
                });
            }

            return responseCollection;
        }

        throw "response is neither array nor object";
    }
}
