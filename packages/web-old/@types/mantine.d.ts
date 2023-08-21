import type { DefaultMantineColor, Tuple } from '@mantine/core'

// _app.tsxで指定したカラーの型サジェストをきかせる
type ExtendedCustomColors = 'shikkuri-white' | DefaultMantineColor

declare module '@mantine/core' {
  export interface MantineThemeColorsOverride {
    colors: Record<ExtendedCustomColors, Tuple<string, 10>>
  }
}
