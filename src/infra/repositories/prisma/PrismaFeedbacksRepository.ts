import { prisma } from "../../../prisma";
import {
  FeedbacksRepository,
  FeedbacksRepositoryCreateDTO,
} from "../../../application/contracts/FeedbacksRepository";

export class PrismaFeedbacksRepository implements FeedbacksRepository {
  async create({ type, comment, screenshot }: FeedbacksRepositoryCreateDTO) {
    await prisma.feedback.create({
      data: {
        comment,
        type,
        image: screenshot,
      },
    });
  }
}
