export type FeedbacksRepositoryCreateDTO = {
  type: string;
  comment: string;
  screenshot?: string;
};

export interface FeedbacksRepository {
  create: (data: FeedbacksRepositoryCreateDTO) => Promise<void>;
}
