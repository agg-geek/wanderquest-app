// module.exports = func => {
//     return (req, res, next) => {
//         func(req, res, next).catch(next);
//     }
// }

module.exports = function (fn) {
    return function(req, res, next) {
        try {
            fn(req, res, next);
        } catch(err) {
            next(err);
        }
    }
}