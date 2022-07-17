let timezoneArray = [Intl.DateTimeFormat().resolvedOptions().timeZone, "Europe/London", "America/New_York", "Europe/Paris", "Asia/Tokyo", "Europe/Moscow"]

class Clock {
    constructor(currentTimeText) {
        this.currentTimeText = currentTimeText
        this.getTime()
    }

    getTime() {
        this.current = new Date()
        this.currentTime = this.current.toLocaleTimeString('en-US')
        this.time = ''
        this.timezone = ''
        this.timezones = timezoneArray
    }

    localeTimeString(input, timezone) {
        this.currentTime = this.current.toLocaleTimeString(`${input}`, { timeZone: timezone })
    }

    toggle24hrTime(checked) {
        switch (checked) {
            case true: this.time = 'en-GB'
                break
            case false: this.time = 'en-US'
        }
       this.localeTimeString(this.time, this.timezone)
    }

    changeTimezone(timezone) {
        this.timezone = timezone 
        this.timezones.forEach(i => {
            if (this.timezone == i) {
                this.localeTimeString(this.time, this.timezone)
            }
        })
    }

    showTime() {
        if (this.time === '') this.time = 'en-US'
        if (this.timezone === '') this.timezone = Intl.DateTimeFormat().resolvedOptions().timeZone;
        this.currentTimeText.textContent = this.currentTime
    }
}

const currentTimeText = document.querySelector('.clock__time')
const timezone = document.querySelector('#timezones')
const timezones = document.querySelectorAll('#timezones')
const clock = new Clock(currentTimeText)
const slider = document.querySelector("input[name=slider]");
const opt = document.createElement('option');

clock.showTime()

slider.addEventListener('change', function () {
    clock.toggle24hrTime(this.checked)
    clock.showTime()
})

timezoneArray.forEach((el, index, inputArray) => {
    if (inputArray.indexOf(el) == index) {
    timezone.add(new Option(el))
    }
})

timezones.forEach(e => {
    e.addEventListener('change', () => {
        clock.changeTimezone(e.value)
        clock.showTime()
    })

})


