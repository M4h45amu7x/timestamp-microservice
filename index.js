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
		const date = req.params.date ? new Date(req.params.date).getTime() : new Date().getTime()

		if (date) {
			return res.send({
				unix: date,
				utc: new Date(date).toUTCString(),
			})
		}
	} catch (error) {}

	res.send({
		error: 'Invalid Date',
	})
})

app.listen(3000)

module.exports = app
