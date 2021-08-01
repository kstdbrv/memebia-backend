import { TelegramMessage } from '@features/import/models/telegram-source';
import { MemeModel } from '@features/memes/models/meme.model';

export function telegramToNewMeme(
  channelId: string,
  inout: TelegramMessage,
): Omit<MemeModel, 'id'> {
  if (typeof inout.text === 'string' && inout.photo) {
    return {
      source: 'TELEGRAM',
      sourceId: `channels/${channelId}`,
      text: inout.text,
      imageId: inout.photo?.split('photos/')[1],
    };
  }
  return null;
}
