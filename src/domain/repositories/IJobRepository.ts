import { JobEntity } from "../entities/JobEntity";

export interface IJobRepository {
    create(newJob: JobEntity): Promise<void>
    get(): Promise<JobEntity[]>
    show(jobId: number): Promise<JobEntity>
    update(updatedJob: JobEntity, jobId: number): Promise<void>
    delete(jobId: number): Promise<void>
}