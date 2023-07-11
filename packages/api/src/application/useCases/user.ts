import type { User } from '@api/src/domain/entities/user'
import type { IUserRepository } from '@api/src/domain/interfaces/repositories/user'

export const userUseCase = (userRepository: IUserRepository) => {
	const createUser = async (user: User) => {
		return userRepository.create(user)
	}

	const getUser = async (id: string) => {
		return userRepository.findById(id)
	}

	const updateUser = async (user: User) => {
		return userRepository.update(user)
	}

	const removeUser = async (id: string) => {
		return userRepository.remove(id)
	}

	return {
		createUser,
		getUser,
		updateUser,
		removeUser,
	}
}
