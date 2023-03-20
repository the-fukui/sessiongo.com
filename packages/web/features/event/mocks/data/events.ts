import type { Event } from '@web/infrastructures/firestore/types/schema'

import { Timestamp } from 'firebase/firestore'

const events: Event[] = [
  {
    ID: '1',
    createdAt: new Timestamp(1677649200, 0),
    updatedAt: new Timestamp(1677649200, 0),
    title: 'アイリッシュ音楽セッション🎻',
    description:
      'アイリッシュ音楽のセッションに参加しましょう！初心者も大歓迎です。',
    host: 'John Doe',
    status: 'PUBLIC',
    type: 'SESSION',
    startAt: new Timestamp(1677652800, 0),
    duration: 7200, // 2 hours
    rrule: 'FREQ=WEEKLY;BYDAY=FR',
    rruleStartAt: new Timestamp(1677652800, 0),
    rruleEndAt: new Timestamp(1680258400, 0),
    placeID: 'ChIJN1t_tDeuEmsRUsoyG83frY4',
    feature: ['BEGINNERS_ARE_WELCOME', 'NO_SMOKING'],
    images: ['https://images.unsplash.com/photo-1558981001-792f6c0d5068'],
  },
  {
    ID: '2',
    createdAt: new Timestamp(1677649300, 0),
    updatedAt: new Timestamp(1677649300, 0),
    title: 'アイリッシュ音楽ライブ🎤',
    description: '素晴らしいアイリッシュ音楽ライブをお楽しみください。',
    host: 'Jane Smith',
    status: 'PUBLIC',
    type: 'LIVE',
    startAt: new Timestamp(1677656400, 0),
    duration: 10800, // 3 hours
    rrule: null,
    rruleStartAt: null,
    rruleEndAt: null,
    placeID: 'ChIJKYPfMzauEmsR9pSfG83frY4',
    feature: ['SPECIAL_OFFERS_AVAILABLE', 'SESSION_LIVE'],
    images: ['https://images.unsplash.com/photo-1524601868979-155e242657d6'],
  },
  {
    ID: '3',
    createdAt: new Timestamp(1677649400, 0),
    updatedAt: new Timestamp(1677649400, 0),
    title: 'アイリッシュ音楽ワークショップ🎼',
    description:
      'アイリッシュ音楽のワークショップに参加して、楽器の演奏を学びましょう。',
    host: 'Alice Brown',
    status: 'PUBLIC',
    type: 'OTHER',
    startAt: new Timestamp(1677660000, 0),
    duration: 5400, // 1.5 hours
    rrule: 'FREQ=WEEKLY;BYDAY=SA',
    rruleStartAt: new Timestamp(1677660000, 0),
    rruleEndAt: new Timestamp(1680265600, 0),
    placeID: 'ChIJMYPfMzauEmsR9pSfG83frY4',
    feature: ['ADVANCED_NOTIFICATION_REQUIRED', 'DONATION'],
    images: ['https://images.unsplash.com/photo-1526040786856-7f6d41284a56'],
  },
  {
    ID: '4',
    createdAt: new Timestamp(1677649500, 0),
    updatedAt: new Timestamp(1677649500, 0),
    title: 'アイリッシュ音楽とダンス🕺',
    description:
      'アイリッシュ音楽に合わせて踊りましょう！初心者から上級者まで、どなたでもお楽しみいただけます。',
    host: 'Bob Green',
    status: 'PUBLIC',
    type: 'SESSION',
    startAt: new Timestamp(1677663600, 0),
    duration: 7200, // 2 hours
    rrule: null,
    rruleStartAt: null,
    rruleEndAt: null,
    placeID: 'ChIJLYPfMzauEmsR9pSfG83frY4',
    feature: [
      'BEGINNERS_ARE_WELCOME',
      'SPECIAL_OFFERS_AVAILABLE',
      'NO_SMOKING',
    ],
    images: ['https://images.unsplash.com/photo-1516802273409-68526ee1bdd6'],
  },
  {
    ID: '5',
    createdAt: new Timestamp(1677649600, 0),
    updatedAt: new Timestamp(1677649600, 0),
    title: 'アイリッシュ音楽ジャムセッション🎶',
    description:
      'アイリッシュ音楽のジャムセッションに参加し、自由な雰囲気で演奏しましょう。',
    host: 'Carol White',
    status: 'DRAFT',
    type: 'SESSION',
    startAt: new Timestamp(1677667200, 0),
    duration: 10800, // 3 hours
    rrule: 'FREQ=WEEKLY;BYDAY=SU',
    rruleStartAt: new Timestamp(1677667200, 0),
    rruleEndAt: new Timestamp(1680272800, 0),
    placeID: 'ChIJPYPfMzauEmsR9pSfG83frY4',
    feature: ['SESSION_LIVE', 'DONATION'],
    images: ['https://images.unsplash.com/photo-1551309981-7b2ff0e04dfb'],
  },
]

export default events
