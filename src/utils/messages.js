// s17.163 \\
const generateMessage = (text) => {
    return {
        text, // es6
        createdAt: new Date().getTime()
    }
}

// s17.164 \\
// challenge
const generateLocationMessage = (url) => {
    return {
        url,
        createdAt: new Date().getTime()
    }
}

module.exports = {
    generateMessage,
    generateLocationMessage
}