import { JobUtils } from "src/shared/utils/JobUtils";
import { Job } from "../model/Job";
import { Profile } from "../model/Profile";

export const DashboardController = {
  async index(req, res) {
    const jobs = await Job.get();
    const profile = await Profile.get();

    let statusCount = {
      progress: 0,
      done: 0,
      total: jobs.length
    }

    let jobTotalHours = 0

    const updatedJobs = jobs.map((job) => {
      const remaining = JobUtils.remainingDays(job);
      const status = remaining <= 0 ? "done" : "progress";

      statusCount[status] += 1;
      jobTotalHours = status == 'progress'
        ? jobTotalHours + Number(job['daily_hours'])
        : jobTotalHours

      return {
        ...job,
        remaining,
        status,
        budget: JobUtils.calculateBudget(job, profile["value_hour"]),
      };
    });

    const freeHours = profile["hours_per_day"] - jobTotalHours;

    return res.render("index", {
       jobs: updatedJobs, 
       profile: profile,
        statusCount: statusCount, 
        freeHours: freeHours 
      });
  },
};
