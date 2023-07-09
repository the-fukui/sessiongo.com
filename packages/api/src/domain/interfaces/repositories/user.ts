import type { User } from '@api/src/domain/entities/user'

export interface IUserRepository {
	create(user: User): Promise<string>
	findById(id: string): Promise<User | null>
	update(user: User): Promise<void>
	remove(id: string): Promise<void>
}
