export type EventProps = {
  id: number;
  title: string;
  audioUrl?: string;
  transcriptUrl?: string;
  transcript?: string;
  createdAt: DateTime;
  updatedAt: DateTime;
}
