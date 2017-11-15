const msPerMinute = 1000 * 60
const msPerHour = msPerMinute * 60
const msPerDay = msPerHour * 24

function formatTime (timeCreated) {
    const now = Date.now()
    const time = now - timeCreated
    if (time < 1 * msPerHour) {
        const minutes = Math.ceil(time / msPerMinute)
        if (minutes <= 1) {
        return `1 minute ago`
        }
        return `${minutes} minutes ago`
    }
    if (time < 24 * msPerHour) {
        const hours = Math.ceil(time / msPerHour)
        if (hours <= 1) {
        return `1 hour ago`
        }
        return `${hours} hours ago`
    }
    const days = Math.ceil(time / msPerDay)
    if (days <= 1) {
        return `1 day ago`
    }
    return `${days} days ago`
}

function getHotness (totalVotes, timeCreated) {
    var now = Date.now()
    var timePollHasExisted = now - parseFloat(timeCreated)
    var hotness = totalVotes * 100000000 / timePollHasExisted
    return hotness
}

module.exports = {
    formatTime: formatTime,
    getHotness: getHotness
}