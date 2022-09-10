export class ProfileEntity {
    public value_hour: number

    constructor(
        public name: string,
        public avatar: string,
        public monthly_budget: number,
        public days_per_week: number,
        public hours_per_day: number,
        public vacation_per_year: number,
        public id?: number
    ) { 
        this.name = name;
        this.avatar = avatar;
        this.monthly_budget = monthly_budget;
        this.days_per_week = days_per_week;
        this.hours_per_day = hours_per_day;
        this.vacation_per_year = vacation_per_year;
        this.id = id;
    }

    public updateValueHour(): void {
        const weeksPerYear = 52
        const weeksPerMonth: number = (weeksPerYear - this.vacation_per_year) / 12
        const weekTotalHours: number = this.hours_per_day * this.days_per_week
        const monthlyTotalHours: number = weekTotalHours * weeksPerMonth

        this.value_hour = this.monthly_budget / monthlyTotalHours
    }
}

