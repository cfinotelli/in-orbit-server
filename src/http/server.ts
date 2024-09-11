import fastifyCors from "@fastify/cors"
import fastify from "fastify"
import { type ZodTypeProvider, serializerCompiler, validatorCompiler } from 'fastify-type-provider-zod'
import { createGoalCompletionRoute } from "./routes/create-completions"
import { createGoalRoute } from "./routes/create-goal"
import { getPendingGoalsRoute } from "./routes/get-pending-goals"
import { getWeekSummaryRoute } from "./routes/get-week-summary"

const app = fastify().withTypeProvider<ZodTypeProvider>()

app.register(fastifyCors, {
  origin: "*"
})

app.setValidatorCompiler(validatorCompiler)
app.setSerializerCompiler(serializerCompiler)

app.register(createGoalRoute)
app.register(createGoalCompletionRoute)
app.register(getPendingGoalsRoute)
app.register(getWeekSummaryRoute)

app.listen({ port: 3333 }).then(() => {
  console.log("Server is running on port http://localhost:3333");
});
