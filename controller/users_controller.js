// sign up function for routes
module.exports.signUp = (req, res) => {
    return res.render('sign_up', {
        title: 'Register'
    })
}
// sign in function for routes
module.exports.signIn = (req, res) => {
    return res.render('sign_in', {
        title: 'Login'
    })
}

module.exports.dashboard = (req,res) => {
    return res.render('dashboard', {
     title: 'Dashboard'
    })
 }
 
// sign out function for routes
module.exports.signOut = (req, res) => {
    return res.render('sign_out', {
        title: 'Logout'
    })
}

// ragister function 
module.exports.register = (req, res) => {
   const { name, email, password, confirm_password } = req.body;
    let errors = [];

    // check required fields
    if(!name || !email || !password || !confirm_password){
        errors.push({msg : `Please fill in all fields`});
    }

    // check passwords match
    if(password !== confirm_password){
        errors.push({msg : 'Passwords do not match'});
    }

    // check pass length
    if(password.length < 6){
        errors.push({msg : 'Passwords should be at least 6 characters '});
    }

    if(errors.length > 0) {
        res.render('sign_up', {
            title:'Ragister',
            errors,
            name,
            email,
            password,
            confirm_password
        });
    } else{
        res.send('pass');
    }
} 
