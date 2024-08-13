export interface UserDTO {
    id?: string
    name: string,
    email: string,
    password: string,
    createdAt: Date,
    friends?: UserDTO[],
    avatarSeed: string,
}