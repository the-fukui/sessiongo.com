import { userUseCase } from '@api/src/appplication/useCases/user'
import type { User } from '@api/src/domain/entities/user'
import type { IDBClient } from '@api/src/domain/interfaces/database'
import type { IUserRepository } from '@api/src/domain/interfaces/repositories/user'

export const userController = (db: IDBClient) => {
	const repository = userRepository(db) as IUserRepository
	const useCase = userUseCase(repository)
	const createUser = async (user: User) => {
		return useCase.createUser(user)
	}
	const getUser = async (id: string) => {
		return useCase.getUser(id)
	}
	const updateUser = async (user: User) => {
		return useCase.updateUser(user)
	}
	const removeUser = async (id: string) => {
		return useCase.removeUser(id)
	}
	return {
		createUser,
		getUser,
		updateUser,
		removeUser,
	}
}
