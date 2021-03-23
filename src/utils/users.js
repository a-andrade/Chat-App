// s17.168 \\
const users = []

// addUser, removeUser, getUser, getUsersInRoom

const addUser = ({ id, username, room }) => {
    // clean the data
    username = username.trim().toLowerCase()
    room = room.trim().toLowerCase()

    // validate the data
    if (!username || !room) {
        return {
            error: 'Username and room are required.'
        }
    }

    // check for existing user
    const existingUser = users.find((user) => {
        return (user.room === room) && (user.username === username)
    })

    // validate username
    if (existingUser) {
        return {
            error: 'Username is already taken.'
        }
    }

    // store user
    const user = { id, username, room}
    users.push(user)
    return { user }
}

const removeUser = (id) => {
    // find index of user
    const index = users.findIndex((user) => user.id === id)

    // remove the user
    if (index !== -1) {
        return users.splice(index, 1)[0]
    }
}

// challenge
const getUser = (id) => {
    // find the user
    return users.find((user) => user.id === id)
}

// challenge
const getUsersInRoom = (room) => {
    // find the users
    return users.filter((user) => user.room === room)
}

module.exports = {
    addUser,
    removeUser,
    getUser,
    getUsersInRoom
}