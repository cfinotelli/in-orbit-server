import type { FastifyPluginAsyncZod } from "fastify-type-provider-zod";
import z from "zod";
import { createGoalCompletion } from "../../features/create-goal-completion";

export const createGoalCompletionRoute: FastifyPluginAsyncZod = async app => {
  app.post('/completions', {
    schema: {
      body: z.object({
        goalId: z.string(),
      })
    }
  }, async (request, _reply) => {

    const { goalId } = request.body

    await createGoalCompletion({
      goalId
    })
  })
}