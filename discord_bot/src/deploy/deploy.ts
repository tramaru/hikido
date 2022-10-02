import type { Guild } from "discord.js"
import { ApplicationCommandOptionType } from "discord.js"

export const deploy = async (guild: Guild) => {
  await guild.commands.set([
    {
      name: 'join',
      description: 'ボットがあなたのチャンネルに参加します。'
    },
    {
      name: 'record',
      description: 'ボットが録音を行います。',
      options: [
        {
          name: 'speaker',
          type: ApplicationCommandOptionType.User,
          description: '録音するユーザーを指定',
          required: true
        }
      ]
    },
    {
      name: 'leave',
      description: 'ボットをボイスチャンネルから離脱させます！'
    },
    {
      name: 'upload',
      description: '録音したファイルを S3 にアップロードします。',
      options: [
        {
          name: 'eventTitle',
          type: ApplicationCommandOptionType.String,
          description: '録音したイベント名',
          required: true
        }
      ]
    }
  ])
}
