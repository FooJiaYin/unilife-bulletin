import moment from 'moment'
// import localization from "moment/locale/zh-cn"
moment.locale('zh-tw', {
    longDateFormat: {
        LL: 'YYYY 年 M 月 D 日',
    },
    relativeTime: {
        future: '%s內',
        past: '%s前',
        s: '幾秒',
        m: '1 分鐘',
        mm: '%d 分鐘',
        h: '1 小時',
        hh: '%d 小時',
        d: '1 天',
        dd: '%d 天',
        M: '1 個月',
        MM: '%d 個月',
        y: '1 年',
        yy: '%d 年'
    },
})

class Time {
    constructor(t) {
        // if(t instanceof app.firestore.Timestamp) {
        //     t = t.toDate()
        // }
        this.now = moment(t)
        // console.log(this.now)
    }
    fromFirestore = (firestoreTime) => new Time(firestoreTime.toDate())
    // toFirestore = () => {
    //     return firebase.firestore.Timestamp.fromDate(this.now.toDate())
    // }
    calendar = (args) => this.now.calendar(args)
    format = (args) => this.now.locale('zh-tw').format(args)
    getNextDayofWeek = (dayofWeek, hours) => {
        // if we haven't yet passed the day of the week that I need:
        if (this.now.day() <= dayofWeek) { 
            // then just give me this week's instance of that day
            return new Time(new Time().now.day(dayofWeek))
        } else {
            // otherwise, give me *next week's* instance of that same day
            return new Time(new Time().now.add(1, 'weeks').day(dayofWeek).hour(hours).minutes(0).seconds(59))
        }
    }
    replace = (string, duration) => {
        return string.replace('%d', duration.days > 0? duration.days.toString() + ' 天' : '')
                     .replace('%H', duration.hours % 24 > 0? duration.hours.toString() % 24 + ' 小時' : '')
                     .replace('%M', duration.minutes.toString() % 60 + ' 分鐘')
                     .replace('%h', duration.hours > 0? duration.hours.toString() + ' 小時' : '')
                     .replace('%m', duration.minutes.toString() + ' 分鐘')
    }
    from = (date, string = '') => {
        if(string == '') return this.now.from(date.now)
        if(string == 'en') return this.now.from(date.now).replace(' 秒前', 's').replace(' 分鐘前', 'm').replace(' 小時前', 'h').replace(' 天前', 'd').replace(' 週前', 'w').replace(' 個月前', 'mo').replace(' 年前', 'y')
        let duration = {
            days: this.now.diff(date.now, 'days'),
            hours: this.now.diff(date.now, 'hours'),
            minutes: this.now.diff(date.now, 'minutes'),
        }
        return this.replace(string, duration)
    }
    to = (date, string = '') => {
        if(string == '') return this.now.to(date.now)
        let duration = {
            days: date.now.diff(this.now, 'days'),
            hours: date.now.diff(this.now, 'hours') % 24,
            minutes: date.now.diff(this.now, 'minutes') % 60,
        }
        return this.replace(string, duration)
    }
    fromNow = (args) => this.from(new Time(), args)
    toNow = (args) => this.to(new Time(), args)
} 

export default function time(args) {
    return new Time(args)
}

// export { default as moment } from 'moment'