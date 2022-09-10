import { Profile } from "../model/Profile"

export const ProfileController = {
    async index(req, res) {
      return res.render("profile", { profile: await Profile.get() })
    },

    async update(req, res) {
      const data = req.body
      const weeksPerYear = 52
      const weeksPerMonth = (weeksPerYear - data["vacation_per_year"] ) / 12      
      const weekTotalHours  = data["hours_per_day"] * data["days_per_week"]
      const monthlyTotalHours = weekTotalHours * weeksPerMonth

      const valueHour = data["monthly_budget"] / monthlyTotalHours

      const profile = await Profile.get()

      await Profile.update({
        ... profile,
        ...req.body,
        "value_hour": valueHour
      })

      return res.redirect('/profile')
    }
  }