const handleRegister=(req,res,database) =>{
	const {name, email, password} = req.body;
	if(!email || !name || !password ){
		return res.status(400).json('incorrect form submission')
	}
	let newId;
	let existingEmail;
	database.select('email').from('users').where('email','=',email).then(user => {
		if(user){
			existingEmail = true;
		} else {
			existingEmail =false;
		}
	})

		if(!existingEmail){
		database.transaction(trx => {
			trx.insert({name: name, email:email, password: password}).into('users')
			.returning('*').then(user => {
				res.json(user[0])
				return (
				 trx.schema.createTable(`user${user[0].id}`, table => {
				 	table.string('title',10000)
				 	table.string('author',10000)
				 	table.string('isbn')
				 	table.string('description',10000)
				 	table.string('category',1000)
				 	table.string('image',10000)
				 	table.string('publishedDate',100000)
				 	table.string('publisher',10000)
				 	table.string('pageCount',1000)
				 	table.string('country',10000)
				 	table.unique('isbn')
				 }).then(trx.commit).catch(trx.rollback) // end trx.schema
				 ); // end return
			})
		}).catch(err => res.json('Error registering'))
	} else {
		res.json('exist')
	}
}

module.exports ={
	handleRegister: handleRegister
}