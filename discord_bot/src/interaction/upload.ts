import type { VoiceConnection } from "@discordjs/voice"
import type { Client, CommandInteraction, Snowflake } from "discord.js"
import { uploadRecordedOggFile } from "../utils/s3Controller"

export const upload = async (
  interaction: CommandInteraction,
  recordable: Set<Snowflake>,
  client: Client,
  connection?: VoiceConnection
) => {
  const eventTitle = interaction.options.get('event-title')!.value as string
  await uploadRecordedOggFile(eventTitle)
  await interaction.reply({ ephemeral: true, content: '録音ファイルをアップロードしました！' })
}
