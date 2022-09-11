import { ProfileEntity } from "../entities/ProfileEntity";

export interface IProfileRepository {
    get(): Promise<ProfileEntity>
    update(profile: ProfileEntity): Promise<void>
}