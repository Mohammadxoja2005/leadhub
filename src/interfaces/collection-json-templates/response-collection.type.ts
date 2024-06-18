export type ResponseCollection<T> = {
    collection: {
        version: "1.0";
        href: string;
        items: Array<{
            href: string;
            data: T;
            links: Array<{
                href?: string;
                rel?: string;
                render?: string;
            }>;
        }>;
    };
};
