const handleDeleteBook = (req,res,database) =>{
		const {isbn, id} = req.body;
	database(`user${id}`).where('isbn','=',isbn).del().then(data =>{
		if(data>0){
			database.select('*').from(`user${id}`).then(data => res.json(data))
		}
	})
}

module.exports ={
	handleDeleteBook: handleDeleteBook
}