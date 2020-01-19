const handleSignIn =(req,res,database) => {
	const {email, password} = req.body;
	database.select('*').from('users').where('email','=',email)
	.then(data => {
		if(data[0].email === email && data[0].password === password){
			res.json(data[0])
		}else {
			res.json('Wrong username or password')
		}
	}).catch(err => res.status(400).json('Error when signing in'))
}


module.exports ={
	handleSignIn: handleSignIn
}