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

        createMany: procedure.input($Schema.DemoInputSchema.createMany.optional()).mutation(async ({ ctx, input }) => checkMutate(db(ctx).demo.createMany(input as any))),

        create: procedure.input($Schema.DemoInputSchema.create).mutation(async ({ ctx, input }) => checkMutate(db(ctx).demo.create(input as any))),

        deleteMany: procedure.input($Schema.DemoInputSchema.deleteMany.optional()).mutation(async ({ ctx, input }) => checkMutate(db(ctx).demo.deleteMany(input as any))),

        delete: procedure.input($Schema.DemoInputSchema.delete).mutation(async ({ ctx, input }) => checkMutate(db(ctx).demo.delete(input as any))),

        findFirst: procedure.input($Schema.DemoInputSchema.findFirst.optional()).query(({ ctx, input }) => checkRead(db(ctx).demo.findFirst(input as any))),

        findMany: procedure.input($Schema.DemoInputSchema.findMany.optional()).query(({ ctx, input }) => checkRead(db(ctx).demo.findMany(input as any))),

        findUnique: procedure.input($Schema.DemoInputSchema.findUnique).query(({ ctx, input }) => checkRead(db(ctx).demo.findUnique(input as any))),

        updateMany: procedure.input($Schema.DemoInputSchema.updateMany).mutation(async ({ ctx, input }) => checkMutate(db(ctx).demo.updateMany(input as any))),

        update: procedure.input($Schema.DemoInputSchema.update).mutation(async ({ ctx, input }) => checkMutate(db(ctx).demo.update(input as any))),

        count: procedure.input($Schema.DemoInputSchema.count.optional()).query(({ ctx, input }) => checkRead(db(ctx).demo.count(input as any))),

    }
    );
}

export interface ClientType<AppRouter extends AnyRouter, Context = AppRouter['_def']['_config']['$types']['ctx']> {
    createMany: {

        useMutation: <T extends Prisma.DemoCreateManyArgs>(opts?: UseTRPCMutationOptions<
            Prisma.DemoCreateManyArgs,
            TRPCClientErrorLike<AppRouter>,
            Prisma.BatchPayload,
            Context
        >,) =>
            Omit<UseTRPCMutationResult<Prisma.BatchPayload, TRPCClientErrorLike<AppRouter>, Prisma.SelectSubset<T, Prisma.DemoCreateManyArgs>, Context>, 'mutateAsync'> & {
                mutateAsync:
                <T extends Prisma.DemoCreateManyArgs>(variables: T, opts?: UseTRPCMutationOptions<T, TRPCClientErrorLike<AppRouter>, Prisma.BatchPayload, Context>) => Promise<Prisma.BatchPayload>
            };

    };
    create: {

        useMutation: <T extends Prisma.DemoCreateArgs>(opts?: UseTRPCMutationOptions<
            Prisma.DemoCreateArgs,
            TRPCClientErrorLike<AppRouter>,
            Prisma.DemoGetPayload<T>,
            Context
        >,) =>
            Omit<UseTRPCMutationResult<Prisma.DemoGetPayload<T>, TRPCClientErrorLike<AppRouter>, Prisma.SelectSubset<T, Prisma.DemoCreateArgs>, Context>, 'mutateAsync'> & {
                mutateAsync:
                <T extends Prisma.DemoCreateArgs>(variables: T, opts?: UseTRPCMutationOptions<T, TRPCClientErrorLike<AppRouter>, Prisma.DemoGetPayload<T>, Context>) => Promise<Prisma.DemoGetPayload<T>>
            };

    };
    deleteMany: {

        useMutation: <T extends Prisma.DemoDeleteManyArgs>(opts?: UseTRPCMutationOptions<
            Prisma.DemoDeleteManyArgs,
            TRPCClientErrorLike<AppRouter>,
            Prisma.BatchPayload,
            Context
        >,) =>
            Omit<UseTRPCMutationResult<Prisma.BatchPayload, TRPCClientErrorLike<AppRouter>, Prisma.SelectSubset<T, Prisma.DemoDeleteManyArgs>, Context>, 'mutateAsync'> & {
                mutateAsync:
                <T extends Prisma.DemoDeleteManyArgs>(variables: T, opts?: UseTRPCMutationOptions<T, TRPCClientErrorLike<AppRouter>, Prisma.BatchPayload, Context>) => Promise<Prisma.BatchPayload>
            };

    };
    delete: {

        useMutation: <T extends Prisma.DemoDeleteArgs>(opts?: UseTRPCMutationOptions<
            Prisma.DemoDeleteArgs,
            TRPCClientErrorLike<AppRouter>,
            Prisma.DemoGetPayload<T>,
            Context
        >,) =>
            Omit<UseTRPCMutationResult<Prisma.DemoGetPayload<T>, TRPCClientErrorLike<AppRouter>, Prisma.SelectSubset<T, Prisma.DemoDeleteArgs>, Context>, 'mutateAsync'> & {
                mutateAsync:
                <T extends Prisma.DemoDeleteArgs>(variables: T, opts?: UseTRPCMutationOptions<T, TRPCClientErrorLike<AppRouter>, Prisma.DemoGetPayload<T>, Context>) => Promise<Prisma.DemoGetPayload<T>>
            };

    };
    findFirst: {

        useQuery: <T extends Prisma.DemoFindFirstArgs, TData = Prisma.DemoGetPayload<T>>(
            input?: Prisma.SelectSubset<T, Prisma.DemoFindFirstArgs>,
            opts?: UseTRPCQueryOptions<string, T, Prisma.DemoGetPayload<T>, TData, Error>
        ) => UseTRPCQueryResult<
            TData,
            TRPCClientErrorLike<AppRouter>
        >;
        useInfiniteQuery: <T extends Prisma.DemoFindFirstArgs>(
            input?: Omit<Prisma.SelectSubset<T, Prisma.DemoFindFirstArgs>, 'cursor'>,
            opts?: UseTRPCInfiniteQueryOptions<string, T, Prisma.DemoGetPayload<T>, Error>
        ) => UseTRPCInfiniteQueryResult<
            Prisma.DemoGetPayload<T>,
            TRPCClientErrorLike<AppRouter>
        >;

    };
    findMany: {

        useQuery: <T extends Prisma.DemoFindManyArgs, TData = Array<Prisma.DemoGetPayload<T>>>(
            input?: Prisma.SelectSubset<T, Prisma.DemoFindManyArgs>,
            opts?: UseTRPCQueryOptions<string, T, Array<Prisma.DemoGetPayload<T>>, TData, Error>
        ) => UseTRPCQueryResult<
            TData,
            TRPCClientErrorLike<AppRouter>
        >;
        useInfiniteQuery: <T extends Prisma.DemoFindManyArgs>(
            input?: Omit<Prisma.SelectSubset<T, Prisma.DemoFindManyArgs>, 'cursor'>,
            opts?: UseTRPCInfiniteQueryOptions<string, T, Array<Prisma.DemoGetPayload<T>>, Error>
        ) => UseTRPCInfiniteQueryResult<
            Array<Prisma.DemoGetPayload<T>>,
            TRPCClientErrorLike<AppRouter>
        >;

    };
    findUnique: {

        useQuery: <T extends Prisma.DemoFindUniqueArgs, TData = Prisma.DemoGetPayload<T>>(
            input: Prisma.SelectSubset<T, Prisma.DemoFindUniqueArgs>,
            opts?: UseTRPCQueryOptions<string, T, Prisma.DemoGetPayload<T>, TData, Error>
        ) => UseTRPCQueryResult<
            TData,
            TRPCClientErrorLike<AppRouter>
        >;
        useInfiniteQuery: <T extends Prisma.DemoFindUniqueArgs>(
            input: Omit<Prisma.SelectSubset<T, Prisma.DemoFindUniqueArgs>, 'cursor'>,
            opts?: UseTRPCInfiniteQueryOptions<string, T, Prisma.DemoGetPayload<T>, Error>
        ) => UseTRPCInfiniteQueryResult<
            Prisma.DemoGetPayload<T>,
            TRPCClientErrorLike<AppRouter>
        >;

    };
    updateMany: {

        useMutation: <T extends Prisma.DemoUpdateManyArgs>(opts?: UseTRPCMutationOptions<
            Prisma.DemoUpdateManyArgs,
            TRPCClientErrorLike<AppRouter>,
            Prisma.BatchPayload,
            Context
        >,) =>
            Omit<UseTRPCMutationResult<Prisma.BatchPayload, TRPCClientErrorLike<AppRouter>, Prisma.SelectSubset<T, Prisma.DemoUpdateManyArgs>, Context>, 'mutateAsync'> & {
                mutateAsync:
                <T extends Prisma.DemoUpdateManyArgs>(variables: T, opts?: UseTRPCMutationOptions<T, TRPCClientErrorLike<AppRouter>, Prisma.BatchPayload, Context>) => Promise<Prisma.BatchPayload>
            };

    };
    update: {

        useMutation: <T extends Prisma.DemoUpdateArgs>(opts?: UseTRPCMutationOptions<
            Prisma.DemoUpdateArgs,
            TRPCClientErrorLike<AppRouter>,
            Prisma.DemoGetPayload<T>,
            Context
        >,) =>
            Omit<UseTRPCMutationResult<Prisma.DemoGetPayload<T>, TRPCClientErrorLike<AppRouter>, Prisma.SelectSubset<T, Prisma.DemoUpdateArgs>, Context>, 'mutateAsync'> & {
                mutateAsync:
                <T extends Prisma.DemoUpdateArgs>(variables: T, opts?: UseTRPCMutationOptions<T, TRPCClientErrorLike<AppRouter>, Prisma.DemoGetPayload<T>, Context>) => Promise<Prisma.DemoGetPayload<T>>
            };

    };
    count: {

        useQuery: <T extends Prisma.DemoCountArgs, TData = 'select' extends keyof T
            ? T['select'] extends true
            ? number
            : Prisma.GetScalarType<T['select'], Prisma.DemoCountAggregateOutputType>
            : number>(
                input?: Prisma.Subset<T, Prisma.DemoCountArgs>,
                opts?: UseTRPCQueryOptions<string, T, 'select' extends keyof T
                    ? T['select'] extends true
                    ? number
                    : Prisma.GetScalarType<T['select'], Prisma.DemoCountAggregateOutputType>
                    : number, TData, Error>
            ) => UseTRPCQueryResult<
                TData,
                TRPCClientErrorLike<AppRouter>
            >;
        useInfiniteQuery: <T extends Prisma.DemoCountArgs>(
            input?: Omit<Prisma.Subset<T, Prisma.DemoCountArgs>, 'cursor'>,
            opts?: UseTRPCInfiniteQueryOptions<string, T, 'select' extends keyof T
                ? T['select'] extends true
                ? number
                : Prisma.GetScalarType<T['select'], Prisma.DemoCountAggregateOutputType>
                : number, Error>
        ) => UseTRPCInfiniteQueryResult<
            'select' extends keyof T
            ? T['select'] extends true
            ? number
            : Prisma.GetScalarType<T['select'], Prisma.DemoCountAggregateOutputType>
            : number,
            TRPCClientErrorLike<AppRouter>
        >;

    };
}
