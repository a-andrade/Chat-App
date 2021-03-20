const generateMessage = (text) => {
    return {
        text, // es6
        createdAt: new Date().getTime()
    }
}

module.exports = {
    generateMessage
}