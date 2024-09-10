import dayjs from "dayjs";
import { client, db } from ".";
import { goalCompletions, goals } from "./schema";

async function seed() {
  await db.delete(goalCompletions)
  await db.delete(goals)

  const goalsResult = await db.insert(goals).values([
    { title: 'Fazer Café', desiredWeeklyFrequency: 7 },
    { title: 'Ir para academia', desiredWeeklyFrequency: 5 },
    { title: 'Tomar banho', desiredWeeklyFrequency: 7 },
    { title: 'Estudar', desiredWeeklyFrequency: 5 },
  ]).returning()

  const startOfWeek = dayjs().startOf('week')

  await db.insert(goalCompletions).values([
    { goalId: goalsResult[0].id, createdAt: startOfWeek.toDate() },
    { goalId: goalsResult[1].id, createdAt: startOfWeek.add(1, 'day').toDate() },
    { goalId: goalsResult[2].id, createdAt: startOfWeek.add(2, 'day').toDate() },
    { goalId: goalsResult[3].id, createdAt: startOfWeek.add(2, 'day').toDate() },
  ])
}

seed().finally(() => client.end())