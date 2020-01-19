const handleAddToList = (req,res,database) =>{
	const {id,title, author, isbn,description,category,image,publishedDate,publisher, pageCount,country} = req.body;

	database(`user${id}`).insert({title: title, author:author.toString(),isbn:isbn,
		description:description,category:category,image:image,publishedDate:publishedDate,
		publisher:publisher,pageCount:pageCount,country:country}).then(data => res.json(data[0]))
		.catch(err => res.json('Error adding to list'))	

}

module.exports ={
	handleAddToList: handleAddToList
}