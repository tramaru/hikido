-- CreateIndex
CREATE FULLTEXT INDEX `events_transcript_idx` ON `events`(`transcript`) WITH PARSER ngram;
