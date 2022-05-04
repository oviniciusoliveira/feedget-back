import { SubmitFeedbackUseCase } from "./SubmitFeedbackUseCase";

const createFeedbackMock = jest.fn();
const sendMailMock = jest.fn();

const submitFeedback = new SubmitFeedbackUseCase(
  { create: createFeedbackMock },
  { sendMail: sendMailMock }
);

describe("#Submit Feedback", () => {
  it("should be able to submit a feedback", async () => {
    await expect(
      submitFeedback.perform({
        type: "any_type",
        comment: "any_comment",
        screenshot: "data:image/png;base64,any_string",
      })
    ).resolves.not.toThrow();

    expect(createFeedbackMock).toHaveBeenCalled();
    expect(createFeedbackMock).toHaveBeenCalledTimes(1);

    expect(sendMailMock).toHaveBeenCalled();
    expect(sendMailMock).toHaveBeenCalledTimes(1);
  });

  it("should not be able to submit a feedback without type", async () => {
    await expect(
      submitFeedback.perform({
        type: "",
        comment: "any_comment",
        screenshot: "data:image/png;base64,any_string",
      })
    ).rejects.toThrow();
  });

  it("should not be able to submit a feedback without comment", async () => {
    await expect(
      submitFeedback.perform({
        type: "any_type",
        comment: "",
        screenshot: "data:image/png;base64,any_string",
      })
    ).rejects.toThrow();
  });

  it("should not be able to submit a feedback with an invalid screenshot", async () => {
    await expect(
      submitFeedback.perform({
        type: "any_type",
        comment: "any_comment",
        screenshot: "invalid_screenshot",
      })
    ).rejects.toThrow();
  });
});
