// s17.163 \\
const generateMessage = (username, text) => {
    return {
        username,
        text, // es6
        createdAt: new Date().getTime()
    }
}

// s17.164 \\
// challenge
const generateLocationMessage = (username, url) => {
    return {
        username,
        url,
        createdAt: new Date().getTime()
    }
}

module.exports = {
    generateMessage,
    generateLocationMessage
}