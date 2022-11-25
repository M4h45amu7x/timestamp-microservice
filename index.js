const express = require('express')
const app = express()

app.use(express.static('public'))

const cors = require('cors')
app.use(
	cors({
		optionsSuccessStatus: 200,
	}),
)

app.get('/api/:date?', (req, res) => {
	try {
		const date = req.params.date
			? new Date(isNaN(Number(req.params.date)) ? req.params.date : Number(req.params.date))
			: new Date()

		if (date && !isNaN(date.getTime())) {
			return res.send({
				unix: date.getTime(),
				utc: date.toUTCString(),
			})
		}
	} catch (error) {}

	res.send({
		error: 'Invalid Date',
	})
})

app.listen(3000)

module.exports = app
