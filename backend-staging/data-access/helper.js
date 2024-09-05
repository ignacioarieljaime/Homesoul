const mongoose = require("mongoose")
/**
 * 
 * @param {any} doc 
 * @param {any} update 
 * @param {any} trackingFields 
 * @returns {any} doc
 */
function applyUpdate(doc, update, trackingFields) {

    let changes = []
    Object.keys(update).forEach((field) => {
        if (trackingFields && trackingFields.includes(field)) {
            const oldValue = doc[field]
            const newValue = update[field]
            const newChanges = calcValueChange(field, newValue, oldValue)
            if (newChanges) changes = changes.concat(newChanges)
        }
        doc[field] = update[field]
    })
    return { doc, changes }
}

/**
 * Calculates value changes
 *
 * @param {string} field - field name
 * @param {any} newValue - new value
 * @param {any} oldValue - old value
 * @returns {ding.schemas.IChange[] | null}
 */
function calcValueChange(field, newValue, oldValue) {
    newValue = normalizeValue(newValue)
    oldValue = normalizeValue(oldValue)

    if (newValue !== oldValue) {
        return [{ field, newValue, oldValue }]
    } else {
        return null
    }
}

/**
 * Normalizes value.
 *
 * @param {any} value - changed value
 * @returns {string} normalized changed value
 */
function normalizeValue(value) {
    if (value instanceof mongoose.Types.ObjectId) {
        return value.toString()
    }

    switch (typeof value) {
        case 'string':
            return value
        case 'number':
            return value.toString()
        default:
            return JSON.stringify(value)
    }
}
module.exports = {
    applyUpdate: applyUpdate,
    calcValueChange: calcValueChange,
}