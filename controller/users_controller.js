// sign up function for routes
module.exports.signUp = (req, res) => {
    return res.render('sign_up', {
        title: 'ragister'
    })
}
// sign in function for routes
module.exports.signIn = (req, res) => {
    return res.render('sign_in', {
        title: 'login'
    })
}

module.exports.dashbaord = (req,res) => {
    return res.render('dashbaord', {
     title: 'Dashbaord'
    })
 }
 
// sign out function for routes
module.exports.signOut = (req, res) => {
    return res.render('sign_out', {
        title: 'logout'
    })
}
