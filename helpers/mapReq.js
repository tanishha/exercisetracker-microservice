module.exports = function (obj1, obj2) {

    if (obj2.username)
        obj1.username = obj2.username
    if (obj2.count)
        obj1.count = obj2.count
    if (!obj1.logs) {
        obj1.logs = {}
    }
    if (obj2.date)
        obj1.logs.date = obj2.date.split(',')
    if (obj2.duration)
        obj1.logs.duration = obj2.duration.split(',')
    if (obj2.description)
        obj1.logs.description = obj2.description.split(',')
    return obj1
}