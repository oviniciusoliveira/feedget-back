import { Router } from "express";
import { SubmitFeedbackUseCase } from "./application/useCases/SubmitFeedbackUseCase";
import { NodemailerMailAdapter } from "./infra/adapters/nodemailer/NodemailerMailAdapter";
import { PrismaFeedbacksRepository } from "./infra/repositories/prisma/PrismaFeedbacksRepository";

export const feedBackRoutes = Router();

feedBackRoutes.post("/feedbacks", async (req, res) => {
  const { type, comment, screenshot } = req.body;

  const feedbacksRepository = new PrismaFeedbacksRepository();
  const mailAdapter = new NodemailerMailAdapter();
  const submitFeedbackUseCase = new SubmitFeedbackUseCase(
    feedbacksRepository,
    mailAdapter
  );

  await submitFeedbackUseCase.perform({
    type,
    comment,
    screenshot,
  });

  return res.status(201).send();
});
