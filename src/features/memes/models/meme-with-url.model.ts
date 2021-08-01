import { MemeModel } from '@features/memes/models/meme.model';

export interface MemeWithUrlModel extends MemeModel {
  imageUrl: string;
}
