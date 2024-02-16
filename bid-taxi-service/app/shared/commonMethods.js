function isEmpty(obj) {
    // Check if the object itself is empty
    if (Object.keys(obj).length === 0 && obj.constructor === Object) {
        return true;
    }

    // Check if all values are empty
    for (const value of Object.values(obj)) {
        if (value) {
            return false;
        }
    }
    return true;
}
module.exports.isEmpty = isEmpty