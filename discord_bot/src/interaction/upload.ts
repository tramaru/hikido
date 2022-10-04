import type { VoiceConnection } from "@discordjs/voice"
import type { Client, CommandInteraction, Snowflake } from "discord.js"
import { createEvent, EventElement } from "../model/event"
import { uploadRecordedOggFile } from "../utils/s3Controller"
import { transcribeRecoredOggFile } from "../utils/transcribe"

export const upload = async (
  interaction: CommandInteraction,
  recordable: Set<Snowflake>,
  client: Client,
  connection?: VoiceConnection
) => {
  const now = Date.now()
  const fileName = now.toString()
  const eventTitle = interaction.options.get('event-title')!.value as string

  const uploadedURL = await uploadRecordedOggFile(eventTitle, fileName)
  const transcribedURL = await transcribeRecoredOggFile(fileName, uploadedURL)
  const event: EventElement = { title: eventTitle, audioUrl: uploadedURL, transcriptUrl: transcribedURL, transcript: '' }

  await createEvent(event)
  await interaction.reply({ ephemeral: true, content: '録音ファイルをアップロードしました！' })
}
