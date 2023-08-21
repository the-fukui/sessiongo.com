import type { Options } from 'browser-image-compression'
import imageCompression from 'browser-image-compression'

const options: Options = {
  maxSizeMB: 0.01,
  fileType: 'image/jpeg',
}

export const compressImage = async (file: File) => {
  return imageCompression(file, options)
}
