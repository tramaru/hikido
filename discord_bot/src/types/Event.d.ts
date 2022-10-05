export type Event = {
  id: number;
  title: string;
  audioUrl: string;
  transcriptUrl: string;
  transcript: string | undefined;
  createdAt: DateTime;
  updatedAt: DateTime;
}
