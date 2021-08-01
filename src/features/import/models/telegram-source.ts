export interface TelegramMessage {
  id: string;
  type: 'message' | 'forward';
  photo?: string;
  text?: string;
}

export interface TelegramExportData {
  type: string;
  id: string;
  messages: TelegramMessage[];
}
