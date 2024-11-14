/* eslint-disable */
import type { unsetMarker, AnyRouter, AnyRootConfig, CreateRouterInner, Procedure, ProcedureBuilder, ProcedureParams, ProcedureRouterRecord, ProcedureType } from "@trpc/server";
import type { PrismaClient } from "@prisma/client";
import createUserRouter from "./User.router";
import createProjectRouter from "./Project.router";
import createEmployeeRouter from "./Employee.router";
import createTimeEntryRouter from "./TimeEntry.router";
import createDocumentRouter from "./Document.router";
import createBidRouter from "./Bid.router";
import createScheduleRouter from "./Schedule.router";
import createCertificationRouter from "./Certification.router";
import createDemoRouter from "./Demo.router";
import createNewsletterRouter from "./Newsletter.router";
import { ClientType as UserClientType } from "./User.router";
import { ClientType as ProjectClientType } from "./Project.router";
import { ClientType as EmployeeClientType } from "./Employee.router";
import { ClientType as TimeEntryClientType } from "./TimeEntry.router";
import { ClientType as DocumentClientType } from "./Document.router";
import { ClientType as BidClientType } from "./Bid.router";
import { ClientType as ScheduleClientType } from "./Schedule.router";
import { ClientType as CertificationClientType } from "./Certification.router";
import { ClientType as DemoClientType } from "./Demo.router";
import { ClientType as NewsletterClientType } from "./Newsletter.router";

export type BaseConfig = AnyRootConfig;

export type RouterFactory<Config extends BaseConfig> = <
    ProcRouterRecord extends ProcedureRouterRecord
>(
    procedures: ProcRouterRecord
) => CreateRouterInner<Config, ProcRouterRecord>;

export type UnsetMarker = typeof unsetMarker;

export type ProcBuilder<Config extends BaseConfig> = ProcedureBuilder<
    ProcedureParams<Config, any, any, any, UnsetMarker, UnsetMarker, any>
>;

export function db(ctx: any) {
    if (!ctx.prisma) {
        throw new Error('Missing "prisma" field in trpc context');
    }
    return ctx.prisma as PrismaClient;
}

export function createRouter<Config extends BaseConfig>(router: RouterFactory<Config>, procedure: ProcBuilder<Config>) {
    return router({
        user: createUserRouter(router, procedure),
        project: createProjectRouter(router, procedure),
        employee: createEmployeeRouter(router, procedure),
        timeEntry: createTimeEntryRouter(router, procedure),
        document: createDocumentRouter(router, procedure),
        bid: createBidRouter(router, procedure),
        schedule: createScheduleRouter(router, procedure),
        certification: createCertificationRouter(router, procedure),
        demo: createDemoRouter(router, procedure),
        newsletter: createNewsletterRouter(router, procedure),
    }
    );
}

export interface ClientType<AppRouter extends AnyRouter> {
    user: UserClientType<AppRouter>;
    project: ProjectClientType<AppRouter>;
    employee: EmployeeClientType<AppRouter>;
    timeEntry: TimeEntryClientType<AppRouter>;
    document: DocumentClientType<AppRouter>;
    bid: BidClientType<AppRouter>;
    schedule: ScheduleClientType<AppRouter>;
    certification: CertificationClientType<AppRouter>;
    demo: DemoClientType<AppRouter>;
    newsletter: NewsletterClientType<AppRouter>;
}
