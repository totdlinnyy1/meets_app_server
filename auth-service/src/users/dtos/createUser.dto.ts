export interface CreateUserDto {
    name: string
    lastName: string
    email: string
    password: string
    avatar?: string
    birthday: Date
}
