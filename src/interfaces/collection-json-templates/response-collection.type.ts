export type ResponseCollection<T> = {
    collection: {
        version: string;
        href: string;
        items: Array<{
            href: string;
            data: T;
            links: {
                href?: string;
                rel?: string;
                render?: string;
            };
        }>;
    };
};
