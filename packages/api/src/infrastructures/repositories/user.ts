import type { User } from '@api/src/domain/entities/user'
import type { IDBClient } from '@api/src/domain/interfaces/database'
import type { IUserRepository } from '@api/src/domain/interfaces/repositories/user'
import type { UserDBInsertModel, UserDBSelectModel } from '@api/src/schema'
import { users } from '@api/src/schema'
import { eq } from 'drizzle-orm'

const convertUserToDB = (user: User): UserDBInsertModel => {
	return {
		...user,
		createdAt: user.createdAt ? user.createdAt.toISOString() : undefined,
		updatedAt: user.updatedAt ? user.updatedAt.toISOString() : undefined,
	}
}

const convertDBToUser = (user: UserDBSelectModel): User => {
	return {
		...user,
		createdAt: new Date(user.createdAt),
		updatedAt: new Date(user.updatedAt),
		name: user.name || undefined,
	}
}

export const userRepository = (db: IDBClient): IUserRepository => {
	const create = (user: User) => {
		return db
			.insert(users)
			.values(convertUserToDB(user))
			.run()
			.then(() => {
				return user.id
			})
	}

	const findById = async (id: string) => {
		return db.query.users
			.findFirst({
				where: eq(users.id, id),
			})
			.then((result) => (result ? convertDBToUser(result) : null))
	}

	const update = async (user: User) => {
		// createdAtは更新しない
		delete user.createdAt
		// updatedAtは自動更新
		user.updatedAt = undefined

		return db
			.update(users)
			.set(convertUserToDB(user))
			.where(eq(users.id, user.id))
			.run()
			.then(() => {
				return
			})
	}

	/**
	 * @TODO 削除対象が存在しない場合の挙動
	 */
	const remove = async (id: string) => {
		return db
			.delete(users)
			.where(eq(users.id, id))
			.run()
			.then(() => {
				return
			})
	}

	return {
		create,
		findById,
		update,
		remove,
	}
}
