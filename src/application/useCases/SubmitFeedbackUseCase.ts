import { MailAdapter } from "../../infra/adapters/contracts/MailAdapter";
import { FeedbacksRepository } from "../contracts/FeedbacksRepository";

type SubmitFeedbackData = {
  type: string;
  comment: string;
  screenshot?: string;
};

export class SubmitFeedbackUseCase {
  constructor(
    private readonly feedbacksRepository: FeedbacksRepository,
    private mailAdapter: MailAdapter
  ) {}

  async perform({ type, comment, screenshot }: SubmitFeedbackData) {
    if (!type) {
      throw new Error("Type is required");
    }

    if (!comment) {
      throw new Error("Comment is required");
    }

    if (screenshot && !screenshot.startsWith("data:image/png;base64")) {
      throw new Error("Invalid screenshot format");
    }
    await this.feedbacksRepository.create({
      type,
      comment,
      screenshot,
    });

    await this.mailAdapter.sendMail({
      subject: "Novo feedback reportado",
      body: [
        '<div style="font-family: sans-serif; font-size: 16px; color: #111;">',
        `<h1>Novo feedback reportado</h1>`,
        `<p>Tipo: ${type}</p>`,
        `<p>Comentário: ${comment}</p>`,
        screenshot ? `<p>Screenshot: <img src="${screenshot}" /></p>` : "",
        `</div>`,
      ].join("\n"),
    });
  }
}
