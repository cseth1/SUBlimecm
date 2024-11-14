/* eslint-disable */
import { type RouterFactory, type ProcBuilder, type BaseConfig, db } from ".";
import * as _Schema from '@zenstackhq/runtime/zod/input';
const $Schema: typeof _Schema = (_Schema as any).default ?? _Schema;
import { checkRead, checkMutate } from '../helper';
import type { Prisma } from '@prisma/client';
import type { UseTRPCMutationOptions, UseTRPCMutationResult, UseTRPCQueryOptions, UseTRPCQueryResult, UseTRPCInfiniteQueryOptions, UseTRPCInfiniteQueryResult } from '@trpc/react-query/shared';
import type { TRPCClientErrorLike } from '@trpc/client';
import type { AnyRouter } from '@trpc/server';

export default function createRouter<Config extends BaseConfig>(router: RouterFactory<Config>, procedure: ProcBuilder<Config>) {
    return router({

        createMany: procedure.input($Schema.NewsletterInputSchema.createMany.optional()).mutation(async ({ ctx, input }) => checkMutate(db(ctx).newsletter.createMany(input as any))),

        create: procedure.input($Schema.NewsletterInputSchema.create).mutation(async ({ ctx, input }) => checkMutate(db(ctx).newsletter.create(input as any))),

        deleteMany: procedure.input($Schema.NewsletterInputSchema.deleteMany.optional()).mutation(async ({ ctx, input }) => checkMutate(db(ctx).newsletter.deleteMany(input as any))),

        delete: procedure.input($Schema.NewsletterInputSchema.delete).mutation(async ({ ctx, input }) => checkMutate(db(ctx).newsletter.delete(input as any))),

        findFirst: procedure.input($Schema.NewsletterInputSchema.findFirst.optional()).query(({ ctx, input }) => checkRead(db(ctx).newsletter.findFirst(input as any))),

        findMany: procedure.input($Schema.NewsletterInputSchema.findMany.optional()).query(({ ctx, input }) => checkRead(db(ctx).newsletter.findMany(input as any))),

        findUnique: procedure.input($Schema.NewsletterInputSchema.findUnique).query(({ ctx, input }) => checkRead(db(ctx).newsletter.findUnique(input as any))),

        updateMany: procedure.input($Schema.NewsletterInputSchema.updateMany).mutation(async ({ ctx, input }) => checkMutate(db(ctx).newsletter.updateMany(input as any))),

        update: procedure.input($Schema.NewsletterInputSchema.update).mutation(async ({ ctx, input }) => checkMutate(db(ctx).newsletter.update(input as any))),

        count: procedure.input($Schema.NewsletterInputSchema.count.optional()).query(({ ctx, input }) => checkRead(db(ctx).newsletter.count(input as any))),

    }
    );
}

export interface ClientType<AppRouter extends AnyRouter, Context = AppRouter['_def']['_config']['$types']['ctx']> {
    createMany: {

        useMutation: <T extends Prisma.NewsletterCreateManyArgs>(opts?: UseTRPCMutationOptions<
            Prisma.NewsletterCreateManyArgs,
            TRPCClientErrorLike<AppRouter>,
            Prisma.BatchPayload,
            Context
        >,) =>
            Omit<UseTRPCMutationResult<Prisma.BatchPayload, TRPCClientErrorLike<AppRouter>, Prisma.SelectSubset<T, Prisma.NewsletterCreateManyArgs>, Context>, 'mutateAsync'> & {
                mutateAsync:
                <T extends Prisma.NewsletterCreateManyArgs>(variables: T, opts?: UseTRPCMutationOptions<T, TRPCClientErrorLike<AppRouter>, Prisma.BatchPayload, Context>) => Promise<Prisma.BatchPayload>
            };

    };
    create: {

        useMutation: <T extends Prisma.NewsletterCreateArgs>(opts?: UseTRPCMutationOptions<
            Prisma.NewsletterCreateArgs,
            TRPCClientErrorLike<AppRouter>,
            Prisma.NewsletterGetPayload<T>,
            Context
        >,) =>
            Omit<UseTRPCMutationResult<Prisma.NewsletterGetPayload<T>, TRPCClientErrorLike<AppRouter>, Prisma.SelectSubset<T, Prisma.NewsletterCreateArgs>, Context>, 'mutateAsync'> & {
                mutateAsync:
                <T extends Prisma.NewsletterCreateArgs>(variables: T, opts?: UseTRPCMutationOptions<T, TRPCClientErrorLike<AppRouter>, Prisma.NewsletterGetPayload<T>, Context>) => Promise<Prisma.NewsletterGetPayload<T>>
            };

    };
    deleteMany: {

        useMutation: <T extends Prisma.NewsletterDeleteManyArgs>(opts?: UseTRPCMutationOptions<
            Prisma.NewsletterDeleteManyArgs,
            TRPCClientErrorLike<AppRouter>,
            Prisma.BatchPayload,
            Context
        >,) =>
            Omit<UseTRPCMutationResult<Prisma.BatchPayload, TRPCClientErrorLike<AppRouter>, Prisma.SelectSubset<T, Prisma.NewsletterDeleteManyArgs>, Context>, 'mutateAsync'> & {
                mutateAsync:
                <T extends Prisma.NewsletterDeleteManyArgs>(variables: T, opts?: UseTRPCMutationOptions<T, TRPCClientErrorLike<AppRouter>, Prisma.BatchPayload, Context>) => Promise<Prisma.BatchPayload>
            };

    };
    delete: {

        useMutation: <T extends Prisma.NewsletterDeleteArgs>(opts?: UseTRPCMutationOptions<
            Prisma.NewsletterDeleteArgs,
            TRPCClientErrorLike<AppRouter>,
            Prisma.NewsletterGetPayload<T>,
            Context
        >,) =>
            Omit<UseTRPCMutationResult<Prisma.NewsletterGetPayload<T>, TRPCClientErrorLike<AppRouter>, Prisma.SelectSubset<T, Prisma.NewsletterDeleteArgs>, Context>, 'mutateAsync'> & {
                mutateAsync:
                <T extends Prisma.NewsletterDeleteArgs>(variables: T, opts?: UseTRPCMutationOptions<T, TRPCClientErrorLike<AppRouter>, Prisma.NewsletterGetPayload<T>, Context>) => Promise<Prisma.NewsletterGetPayload<T>>
            };

    };
    findFirst: {

        useQuery: <T extends Prisma.NewsletterFindFirstArgs, TData = Prisma.NewsletterGetPayload<T>>(
            input?: Prisma.SelectSubset<T, Prisma.NewsletterFindFirstArgs>,
            opts?: UseTRPCQueryOptions<string, T, Prisma.NewsletterGetPayload<T>, TData, Error>
        ) => UseTRPCQueryResult<
            TData,
            TRPCClientErrorLike<AppRouter>
        >;
        useInfiniteQuery: <T extends Prisma.NewsletterFindFirstArgs>(
            input?: Omit<Prisma.SelectSubset<T, Prisma.NewsletterFindFirstArgs>, 'cursor'>,
            opts?: UseTRPCInfiniteQueryOptions<string, T, Prisma.NewsletterGetPayload<T>, Error>
        ) => UseTRPCInfiniteQueryResult<
            Prisma.NewsletterGetPayload<T>,
            TRPCClientErrorLike<AppRouter>
        >;

    };
    findMany: {

        useQuery: <T extends Prisma.NewsletterFindManyArgs, TData = Array<Prisma.NewsletterGetPayload<T>>>(
            input?: Prisma.SelectSubset<T, Prisma.NewsletterFindManyArgs>,
            opts?: UseTRPCQueryOptions<string, T, Array<Prisma.NewsletterGetPayload<T>>, TData, Error>
        ) => UseTRPCQueryResult<
            TData,
            TRPCClientErrorLike<AppRouter>
        >;
        useInfiniteQuery: <T extends Prisma.NewsletterFindManyArgs>(
            input?: Omit<Prisma.SelectSubset<T, Prisma.NewsletterFindManyArgs>, 'cursor'>,
            opts?: UseTRPCInfiniteQueryOptions<string, T, Array<Prisma.NewsletterGetPayload<T>>, Error>
        ) => UseTRPCInfiniteQueryResult<
            Array<Prisma.NewsletterGetPayload<T>>,
            TRPCClientErrorLike<AppRouter>
        >;

    };
    findUnique: {

        useQuery: <T extends Prisma.NewsletterFindUniqueArgs, TData = Prisma.NewsletterGetPayload<T>>(
            input: Prisma.SelectSubset<T, Prisma.NewsletterFindUniqueArgs>,
            opts?: UseTRPCQueryOptions<string, T, Prisma.NewsletterGetPayload<T>, TData, Error>
        ) => UseTRPCQueryResult<
            TData,
            TRPCClientErrorLike<AppRouter>
        >;
        useInfiniteQuery: <T extends Prisma.NewsletterFindUniqueArgs>(
            input: Omit<Prisma.SelectSubset<T, Prisma.NewsletterFindUniqueArgs>, 'cursor'>,
            opts?: UseTRPCInfiniteQueryOptions<string, T, Prisma.NewsletterGetPayload<T>, Error>
        ) => UseTRPCInfiniteQueryResult<
            Prisma.NewsletterGetPayload<T>,
            TRPCClientErrorLike<AppRouter>
        >;

    };
    updateMany: {

        useMutation: <T extends Prisma.NewsletterUpdateManyArgs>(opts?: UseTRPCMutationOptions<
            Prisma.NewsletterUpdateManyArgs,
            TRPCClientErrorLike<AppRouter>,
            Prisma.BatchPayload,
            Context
        >,) =>
            Omit<UseTRPCMutationResult<Prisma.BatchPayload, TRPCClientErrorLike<AppRouter>, Prisma.SelectSubset<T, Prisma.NewsletterUpdateManyArgs>, Context>, 'mutateAsync'> & {
                mutateAsync:
                <T extends Prisma.NewsletterUpdateManyArgs>(variables: T, opts?: UseTRPCMutationOptions<T, TRPCClientErrorLike<AppRouter>, Prisma.BatchPayload, Context>) => Promise<Prisma.BatchPayload>
            };

    };
    update: {

        useMutation: <T extends Prisma.NewsletterUpdateArgs>(opts?: UseTRPCMutationOptions<
            Prisma.NewsletterUpdateArgs,
            TRPCClientErrorLike<AppRouter>,
            Prisma.NewsletterGetPayload<T>,
            Context
        >,) =>
            Omit<UseTRPCMutationResult<Prisma.NewsletterGetPayload<T>, TRPCClientErrorLike<AppRouter>, Prisma.SelectSubset<T, Prisma.NewsletterUpdateArgs>, Context>, 'mutateAsync'> & {
                mutateAsync:
                <T extends Prisma.NewsletterUpdateArgs>(variables: T, opts?: UseTRPCMutationOptions<T, TRPCClientErrorLike<AppRouter>, Prisma.NewsletterGetPayload<T>, Context>) => Promise<Prisma.NewsletterGetPayload<T>>
            };

    };
    count: {

        useQuery: <T extends Prisma.NewsletterCountArgs, TData = 'select' extends keyof T
            ? T['select'] extends true
            ? number
            : Prisma.GetScalarType<T['select'], Prisma.NewsletterCountAggregateOutputType>
            : number>(
                input?: Prisma.Subset<T, Prisma.NewsletterCountArgs>,
                opts?: UseTRPCQueryOptions<string, T, 'select' extends keyof T
                    ? T['select'] extends true
                    ? number
                    : Prisma.GetScalarType<T['select'], Prisma.NewsletterCountAggregateOutputType>
                    : number, TData, Error>
            ) => UseTRPCQueryResult<
                TData,
                TRPCClientErrorLike<AppRouter>
            >;
        useInfiniteQuery: <T extends Prisma.NewsletterCountArgs>(
            input?: Omit<Prisma.Subset<T, Prisma.NewsletterCountArgs>, 'cursor'>,
            opts?: UseTRPCInfiniteQueryOptions<string, T, 'select' extends keyof T
                ? T['select'] extends true
                ? number
                : Prisma.GetScalarType<T['select'], Prisma.NewsletterCountAggregateOutputType>
                : number, Error>
        ) => UseTRPCInfiniteQueryResult<
            'select' extends keyof T
            ? T['select'] extends true
            ? number
            : Prisma.GetScalarType<T['select'], Prisma.NewsletterCountAggregateOutputType>
            : number,
            TRPCClientErrorLike<AppRouter>
        >;

    };
}
