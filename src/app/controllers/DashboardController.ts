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

    // total de horas por dia de cada Job em progresso
    let jobTotalHours = 0

    const updatedJobs = jobs.map((job) => {
      // ajustes no job
      const remaining = JobUtils.remainingDays(job);
      const status = remaining <= 0 ? "done" : "progress";
      
      // Somando a quantidade de status
      statusCount[status] += 1;
    
      // total de horas por dia de cada Job em progresso
      jobTotalHours = status == 'progress' ? jobTotalHours + Number(job['daily_hours']) : jobTotalHours

      return {
        ...job,
        remaining,
        status,
        budget: JobUtils.calculateBudget(job, profile["value_hour"]),
      };
    });

    // qtd de horas que quero trabalhar dia (PROFILE)
    // MENOS 
    // quatidade de horas/dia de cada job em progress
    const freeHours = profile["hours_per_day"] - jobTotalHours;

    return res.render("index", { jobs: updatedJobs, profile: profile, statusCount: statusCount, freeHours: freeHours });
  },
};
