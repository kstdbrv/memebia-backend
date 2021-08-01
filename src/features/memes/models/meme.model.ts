export interface MemeModel {
  id: string;
  imageId: string;
  source: 'TELEGRAM' | 'UPLOADED';
  text?: string;
  sourceId: string;
}
