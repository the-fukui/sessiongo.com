export const EVENT_FEATURE = {
  BEGINNERS_ARE_WELCOME: '初心者歓迎👋',
  ADVANCED_NOTIFICATION_REQUIRED: '参加者は事前連絡が必要🙋',
  SPECIAL_OFFERS_AVAILABLE: '参加者に特別メニュー割引あり🤩',
  NO_SMOKING: '店内・開催場所が禁煙🚭',
  CLOSED: 'クローズドセッション🔒',
  SESSION_LIVE: 'セッションライブ🎤',
  DONATION: '投げ銭お願いします🙏',
} as const

export const EVENT_STATUS = {
  PUBLIC: '公開',
  DRAFT: '下書き',
  // PRIVATE: '非公開',
} as const

export const EVENT_TYPE = {
  SESSION: 'セッション',
  LIVE: 'ライブ',
  OTHER: 'その他',
} as const
