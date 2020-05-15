const { defineStep } = require('cucumber')
const request = require('request-promise-native')
const get = require('lodash.get')
const test = require('assert')
defineStep('request {string}', async function (reqProp, content) {
    content = content.rowsHash()
    this[reqProp] = reqProp === ('body' || 'params') ? parseObject(content) : content
})


defineStep('I make a {string} to {string}', async function (method, endpoint) {
    await Reflect.apply(makeRequest, this, [{ method, endpoint }])
})

defineStep('I receive a {int} with body', async function (expectedStatusCode, expectedBody) {
    const { statusCode, body } = this.response
    const actualStatus = statusCode
    const expectedStatus = Number(expectedStatusCode)
    test.deepStrictEqual(actualStatus, expectedStatus)

    const expectedBodyFormatted = expectedBody.rowsHash()
    const actualBodyKeys = Object.keys(body).sort()
    const expectedBodyKeys = Object.keys(expectedBodyFormatted).sort()

    test.deepStrictEqual(actualBodyKeys, expectedBodyKeys)
})

function composeRequestOptions(options) {
    let headers = this.headers
    const myopts = {
        method: options.method,
        uri: options.endpoint,
        headers,
        json: true,
        resolveWithFullResponse: true
    }
    return myopts
}

function handleErrorResponse(err) {
    return { body: err.response.body, statusCode: err.statusCode }
}

async function makeRequest(options) {
    let requestParams = Reflect.apply(composeRequestOptions, this, [options])
    this.response = await request(requestParams).catch(handleErrorResponse)
}