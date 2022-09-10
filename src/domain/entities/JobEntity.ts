export class JobEntity {
    public budget: number
    public status: 'done' | 'progress'
    public remaining: number

    constructor(
        public name: string,
        public daily_hours: number,
        public total_hours: number,
        public created_at: Date,
        public id?: number
    ) {
        this.name = name;
        this.daily_hours = daily_hours;
        this.total_hours = total_hours;
        this.created_at = created_at;
        this.id = id;
    }

    public calculateBudget(valueHour: number): void {
        this.budget = valueHour * this.total_hours
    }

    public updateStatus() {
        this.remaining = this.getRemaningDays()
        this.status = this.remaining <= 0 ? 'done' : 'progress';
    }

    private getRemaningDays(): number {
        const remainingDays: string = (this.total_hours / this.daily_hours).toFixed()

        const createdDate: Date = new Date(this.created_at)
        const dueDay: number = createdDate.getDate() + Number(remainingDays)
        const dueDateInMs: number = createdDate.setDate(dueDay)

        const timeDiffInMs: number = dueDateInMs - Date.now()

        const dayInMs: number = 1000 * 60 * 60 * 24
        const dayDiff: number = Math.floor(timeDiffInMs / dayInMs)

        return dayDiff
    }
}

