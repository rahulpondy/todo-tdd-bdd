const { test } = require('tap')
const { addItem, deleteItem } = require('../../index')
test('addItem() should successfully add an item', assert => {
    const actual = addItem('sleep')
    assert.strictSame(actual, true)
    assert.end()
})

test('addItem() should not add an item', assert => {
    const actual = addItem('sleep')
    assert.strictSame(actual, false)
    assert.end()
})

test('deleteItem() should successfully delete an item', assert => {
    const actual = deleteItem('sleep')
    assert.strictSame(actual, true)
    assert.end()
})

test('deleteItem() should not delete an item', assert => {
    const actual = deleteItem('XYZ')
    assert.strictSame(actual, false)
    assert.end()
})