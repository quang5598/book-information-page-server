const handleReadingList = (req,res,database) => {
		const {id} = req.body;

	database.select('*').from(`user${id}`).then(data => res.json(data))

}

module.exports ={
	handleReadingList: handleReadingList
}