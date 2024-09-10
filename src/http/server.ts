import fastify from "fastify"
import { createGoal } from "../features/create-goal";
import { serializerCompiler, validatorCompiler, type ZodTypeProvider } from 'fastify-type-provider-zod'
import z from "zod";
import { getWeekPendingGoals } from "../features/get-week-pending-goals";
import { createGoalCompletion } from "../features/create-goal-completion";

const app = fastify().withTypeProvider<ZodTypeProvider>()

app.setValidatorCompiler(validatorCompiler)
app.setSerializerCompiler(serializerCompiler)

app.post('/completions', {
  schema: {
    body: z.object({
      goalId: z.string(),
    })
  }
}, async (request, reply) => {

  const { goalId } = request.body

  await createGoalCompletion({
    goalId
  })
})

app.get('/pending-goals', async () => {
  const { pendingGoals } = await getWeekPendingGoals()

  return { pendingGoals }
})

app.post('/goals', {
  schema: {
    body: z.object({
      title: z.string(),
      desiredWeeklyFrequency: z.number()
    })
  }
}, async (request, reply) => {

  const { title, desiredWeeklyFrequency } = request.body

  try {
    const result = await createGoal({
      title,
      desiredWeeklyFrequency
    })

    return reply.status(201).send(result)
  } catch (error) {
    return reply.status(
      400
    ).send({ "Erro": error })
  }
})

app.listen({ port: 3333 }).then(() => {
  console.log("Server is running on port http://localhost:3333");
});
