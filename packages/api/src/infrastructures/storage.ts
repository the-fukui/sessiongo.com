import { R2_PUBLIC_BUCKET_URL } from '@api/src/constants'
import type { IStorageClient } from '@api/src/domain/interfaces/storage'
import { createUUID } from '@api/src/utils/uuid'

export const imageStorage = (storage: IStorageClient) => {
	const upload = async (image: ReadableStream) => {
		const key = createUUID() // ファイル名
		/**
		 * @todo ディレクトリ構造を考える
		 */
		const url = storage.put(key, image).then((result) => {
			const bucket = new URL(R2_PUBLIC_BUCKET_URL)
			bucket.pathname = result.key
			return bucket.toString()
		})

		return url
	}

	return {
		upload,
	}
}
