const usermodel = require("./usermodel")
const exercisemodel = require("./exercisemodel")
const moment = require("moment")

function postuser(req, res) {
    const newUser = new usermodel({
        username: req.body.username,
    });
    newUser.save()
        .then(function (data) {
            res.json({
                _id: data.id,
                username: data.username
            })
        })
        .catch(function (err) {
            return res.status(500).json({
                msg: err.message
            })
        })
}

function getusers(req, res) {
    usermodel.find({})
        .sort({
            _id: -1
        })
        .exec(function (err, users) {
            if (err) {
                return res.status(500).json({
                    msg: err.message
                })
            }
            res.json(users)
        })
}

function postexercise(req, res) {
    let { userId, description, duration, date } = req.body;
    usermodel.findOne({ _id: userId }).then(user => {
        if (!user) throw new Error('Unknown user with _id');
        date = date || Date.now();
        return exercisemodel.create({
            description, duration, date, userId
        })
            .then(ex => res.status(200).send({
                username: user.username,
                description, duration,
                _id: user._id,
                date: moment(ex.date).format('ddd MMMM DD YYYY')
            }))
    })
        .catch(err => {
            console.log(err);
            res.status(500).send(err.message);
        })
    // try {
    //     const {
    //         duration,
    //         description
    //     } = req.body
    //     var date = req.body.date || moment(new Date()).format('ddd MMMM D YYYY');
    //     usermodel.findById(req.body._id).exec(function (err, user) {
    //         if (err) {
    //             return res.status(500).json({
    //                 msg: err.message
    //             })
    //         }
    //         if (user) {
    //             const newexercise = new exercisemodel({
    //                 date,
    //                 duration,
    //                 description,
    //                 user_id: req.body._id,
    //                 username: user.username,
    //             });
    //             newexercise.save()
    //             res.json({
    //                 _id: req.body._id,
    //                 username: user.username,
    //                 date: moment(new Date(date)).format('ddd MMMM D YYYY'),
    //                 duration: duration,
    //                 description: description
    //             })

    //         } else {
    //             res.json(
    //                 "not found",
    //             );
    //         }
    //     })
    // } catch (err) {
    //     return res.status(500).json({
    //         msg: err.message
    //     })
    // }
}

function logs(req, res) {
    let { userId, from, to, limit } = req.query;
    from = moment(from, 'YYYY-MM-DD').isValid() ? moment(from, 'YYYY-MM-DD') : 0;
    to = moment(to, 'YYYY-MM-DD').isValid() ? moment(to, 'YYYY-MM-DD') : moment().add(1000000000000);
    usermodel.findById(userId).then(user => {
        if (!user) throw new Error('Unknown user with _id');
        exercisemodel.find({ userId })
            .where('date').gte(from).lte(to)
            .limit(+limit).exec()
            .then(log => res.status(200).send({
                _id: userId,
                username: user.username,
                count: log.length,
                log: log.map(o => ({
                    description: o.description,
                    duration: o.duration,
                    date: moment(o).format('ddd MMMM DD YYYY')
                }))
            }))
    })
        .catch(err => {
            console.log(err);
            res.status(500).send(err.message);
        })

    // const {
    //     from,
    //     to,
    //     limit
    // } = req.query;
    // const fromDate = (moment(new Date(from), 'YYYY-MM-DD', true).isValid()) ? moment(new Date(from), 'YYYY-MM-DD') : 0;
    // const toDate = (moment(new Date(to), 'YYYY-MM-DD', true).isValid()) ? moment(new Date(to), 'YYYY-MM-DD') : moment().add(1000000000000);

    // exercisemodel
    //     .find({
    //         user_id: req.params._id,
    //         date: {
    //             $gte: fromDate,
    //             $lte: toDate
    //         }
    //     }).limit(+limit).exec(function (err, user) {
    //         if (err) {
    //             return res.status(500).json({
    //                 msg: err.message
    //             })
    //         }
    //         if (!user) return res.json('Unknown user with _id');
    //         res.json({
    //             _id: req.params._id,
    //             username: user[0].username,
    //             count: user.length,
    //             log: (user.map(function (item) {
    //                 return ({
    //                     description: item.description,
    //                     duration: parseInt(item.duration),
    //                     date: moment(new Date(item.date)).format('ddd MMMM D YYYY'),
    //                 })
    //             }))

    //         });

    //     });
}



module.exports = {
    postuser,
    getusers,
    postexercise,
    logs,
};