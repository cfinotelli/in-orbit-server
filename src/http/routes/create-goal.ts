import z from "zod";
import type { FastifyPluginAsyncZod } from "fastify-type-provider-zod";
import { createGoal } from "../../features/create-goal";

export const createGoalRoute: FastifyPluginAsyncZod = async app => {
  app.post('/goals', {
    schema: {
      body: z.object({
        title: z.string(),
        desiredWeeklyFrequency: z.number()
      })
    }
  }, async (request, reply) => {

    const { title, desiredWeeklyFrequency } = request.body

    const result = await createGoal({
      title,
      desiredWeeklyFrequency
    })

    return reply.status(201).send(result)
  })
}