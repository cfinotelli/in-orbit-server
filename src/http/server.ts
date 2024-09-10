import fastify from "fastify"
import { createGoal } from "../features/create-goal";
import { serializerCompiler, validatorCompiler, type ZodTypeProvider } from 'fastify-type-provider-zod'
import z from "zod";
import { getWeekPendingGoals } from "../features/get-week-pending-goals";

const app = fastify().withTypeProvider<ZodTypeProvider>()

app.setValidatorCompiler(validatorCompiler)
app.setSerializerCompiler(serializerCompiler)

app.get('/pending-goals', async () => {
  const result = await getWeekPendingGoals()

  return result
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

    return reply.status(201).send(result.goal)
  } catch (error) {
    return reply.status(
      400
    ).send({ "Erro": error })
  }
})

app.listen({ port: 3333 }).then(() => {
  console.log("Server is running on port http://localhost:3333");
});
