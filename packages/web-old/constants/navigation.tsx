import type { IconType } from 'react-icons'
import { TbHome, TbPencil, TbSearch, TbUser } from 'react-icons/tb'

type NavigationItem = {
  name: string
  path: string
  icon: IconType
}

export const NAVIGATION = [
  {
    name: 'ホーム',
    path: '/',
    icon: TbHome,
  },
  {
    name: '検索',
    path: '/events',
    icon: TbSearch,
  },
  {
    name: '投稿',
    path: '/events/create',
    icon: TbPencil,
  },
  {
    name: 'プロフィール',
    path: '/profile',
    icon: TbUser,
  },
] as const satisfies readonly NavigationItem[]
