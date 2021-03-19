// s17.154 \\
const socket = io()

// s17.155 \\
// socket.on('countUpdated', (count) => {
//     console.log('The count has been updated.', count)
// })

// document.querySelector('#increment').addEventListener('click', () => {
//     console.log('Clicked!')
//     socket.emit('increment')
// })

// s17.156 \\
// challenge
socket.on('message', (message) => {
    console.log(message)
})

document.querySelector('#message-form').addEventListener('submit', (e) => {
    e.preventDefault()

    //const message = document.querySelector('#message').value
    const message = e.target.elements.message.value

    socket.emit('sendMessage', message)
})