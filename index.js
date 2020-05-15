const express = require('express')
const app = express()
const bodyParser = require('body-parser')
const port = 8080
let itemList = []
module.exports = {
    addItem,
    deleteItem
}

app.use(bodyParser.json())

app.delete('/item/:name', async (req, res) => {
    const result = deleteItem(req.params.name)
    const message = result ? 'Deleted' : "Item does not exist"
    const statusCode = result ? 200 : 400
    const body = {
        msg: message,
        items: itemList
    }
    res.status(statusCode)
    res.send(body)
})

app.post('/item/:name', async (req, res) => {
    const result = addItem(req.params.name)
    const message = result ? 'Added' : "Item already exists"
    const statusCode = result ? 200 : 400
    const body = {
        msg: message,
        items: itemList
    }
    res.status(statusCode)
    res.send(body)
})

function addItem(item) {
    if (itemList.indexOf(item) > -1) {
        return false
    }
    itemList.push(item)
    return true
}

function deleteItem(item) {
    if (itemList.indexOf(item) < 0) {
        return false
    }
    itemList.pop(item)
    return true
}

app.listen(port)
console.log('Server started at http://localhost:8080')