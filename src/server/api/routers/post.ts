import { z } from "zod";

import { createTRPCRouter, publicProcedure } from "~/server/api/trpc";

let note = {
  id: 1,
  title: "Hello World",
  body: "Hello world",
};

export const noteRouter = createTRPCRouter({
  hello: publicProcedure
    .input(z.object({ text: z.string() }))
    .query(({ input }) => {
      return {
        greeting: `Hello ${input.text}`,
      };
    }),

  create: publicProcedure
    .input(z.object({ title: z.string().min(1), body: z.string() }))
    .mutation(async ({ input }) => {
      // simulate a slow db call
      await new Promise((resolve) => setTimeout(resolve, 1000));

      note = { id: note.id + 1, title: input.title, body: input.body };
      return note;
    }),

  getLatest: publicProcedure.query(() => {
    return note;
  }),
});
