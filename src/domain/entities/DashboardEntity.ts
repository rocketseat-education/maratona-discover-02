import { JobEntity } from "./JobEntity";
import { ProfileEntity } from "./ProfileEntity";

export class DashboardEntity {
    public jobsTotalHoursPerDay: number
    public freeHours: number
    public statusCount: {
        progress: number
        done: number
        total: number
    }

    constructor(
        public profile: ProfileEntity,
        public jobs: JobEntity[]
    ) {
        this.profile = profile;
        this.jobs = jobs;
        this.jobsTotalHoursPerDay = 0
        this.statusCount = {
            progress: 0,
            done: 0,
            total: jobs.length
        }
    }

    public updateJobs(): void {
        this.jobs = this.jobs.map((job: JobEntity): JobEntity => {
            job.updateStatus()
            job.calculateBudget(this.profile.value_hour)
            this.statusCount[job.status] += 1;
            this.jobsTotalHoursPerDay = job.status === 'progress'
                ? this.jobsTotalHoursPerDay + Number(job.daily_hours)
                : this.jobsTotalHoursPerDay

            return job
        })
    }

    public updateFreeHours(): void {
        this.freeHours = this.profile.hours_per_day - this.jobsTotalHoursPerDay
    }
}