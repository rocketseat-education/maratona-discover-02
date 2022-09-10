import { Profile } from "../model/Profile"

export const ProfileController = {
    async index(req, res) {
      return res.render("profile", { profile: await Profile.get() })
    },

    async update(req, res) {
      // req.body para pegar os dados
      const data = req.body

      // definir quantas semanas tem num ano: 52
      const weeksPerYear = 52

      // remover as semanas de férias do ano, para pegar quantas semanas tem em 1 mês
      const weeksPerMonth = (weeksPerYear - data["vacation_per_year"] ) / 12
      
      // total de horas trabalhadas na semana
      const weekTotalHours  = data["hours_per_day"] * data["days_per_week"]

      // horas trabalhadas no mês
      const monthlyTotalHours = weekTotalHours * weeksPerMonth

      // qual será o valor da minha hora?
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