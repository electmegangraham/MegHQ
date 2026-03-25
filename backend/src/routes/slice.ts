import { FastifyInstance } from "fastify";
import {
  createSignal,
  createInitiative,
  createTask,
  createApproval,
  createDeskItem,
} from "../lib/vertical-slice/service.js";

export async function registerSliceRoutes(app: FastifyInstance) {
  app.post("/slice/run", async (req: any) => {
    const db = app.pg;
    const signal = await createSignal(db, req.body);
    const initiative = await createInitiative(db, signal.id);
    const task = await createTask(db, initiative.id);
    const approval = await createApproval(db, task.id);
    const desk = await createDeskItem(db, approval.id);

    return { signal, initiative, task, approval, desk };
  });
}
