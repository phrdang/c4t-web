import { GraphQLClient } from "graphql-request";

const ACCESS_TOKEN = process.env.CONTENTFUL_PREVIEW_ACCESS_TOKEN || process.env.CONTENTFUL_ACCESS_TOKEN;

export const graphQLClient = new GraphQLClient(`https://graphql.contentful.com/content/v1/spaces/${process.env.CONTENTFUL_SPACE_ID}`, { 
    headers: { 
        'Authorization': `Bearer ${ACCESS_TOKEN}`
    }
});

export enum ContentModelID {
    COURSE = "course",
    PROMOTIONAL_LABEL = "promotionalLabel",
    IMAGE = "image",
    FAQ = "faq",
    NOTIFICATION_FLAG = "notificationFlag",
    VOLUNTEER_OPPORTUNITY = "volunteerOpportunity",
    TESTIMONIAL = "testimonial",
    JOB = "job"
}

export interface IBaseContentModel {
    sys?: {
        id?: string; 
    }
}

export interface IPagination<T> {
    items?: T[];
    skip?: number; 
    total?: number;
    limit?: number; 
}
