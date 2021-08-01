import { MemeModel } from '@features/memes/models/meme.model';
import { MemeWithUrlModel } from '@features/memes/models/meme-with-url.model';

export function memeToMemeWithUrlDto(
  meme: MemeModel,
  imageHost: string,
): MemeWithUrlModel {
  return {
    ...meme,
    imageUrl: `${imageHost}/${meme.source.toLowerCase()}/${meme.sourceId}/${
      meme.imageId
    }`,
  };
}
