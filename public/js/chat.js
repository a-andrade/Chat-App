// s17.154 \\
const socket = io()

// server (emit) --> client (recieve) --acknowledgement--> server
// client (emit) --> server (recieve) --acknowledgement--> client

// s17.155 \\
// socket.on('countUpdated', (count) => {
//     console.log('The count has been updated.', count)
// })

// document.querySelector('#increment').addEventListener('click', () => {
//     console.log('Clicked!')
//     socket.emit('increment')
// })

// s17.160 \\
// elements
const $messageForm = document.querySelector('#message-form')
const $messageFormInput = $messageForm.querySelector('input')
const $messageFormButton = $messageForm.querySelector('button')

// challenge
const $sendLocationButton = document.querySelector('#send-location')

// s17.161 \\
const $messages = document.querySelector('#messages')

// templates
const messageTemplate = document.querySelector('#message-template').innerHTML
const locationMessageTemplate = document.querySelector('#location-message-template').innerHTML

// s17.167 \\
// options
const { username, room } = Qs.parse(location.search, { ignoreQueryPrefix: true })

// s17.156 \\
// challenge
socket.on('message', (message) => {
    console.log(message)
    // s17.161 \\
    const html = Mustache.render(messageTemplate, {
        message: message.text,
        createdAt: moment(message.createdAt).format('h:mm a')
    })
    $messages.insertAdjacentHTML('beforeend', html)
})

// s17.162 \\
// challenge
socket.on('locationMessage', (message) => {
    console.log(message)

    const html = Mustache.render(locationMessageTemplate, {
        url: message.url,
        createdAt: moment(message.createdAt).format('h:mm a')
    })

    $messages.insertAdjacentHTML('beforeend', html)
})

$messageForm.addEventListener('submit', (e) => {
    e.preventDefault()

    // disable
    $messageFormButton.setAttribute('disabled', 'disabled')

    //const message = document.querySelector('#message').value
    const message = e.target.elements.message.value

    socket.emit('sendMessage', message, (error) => {
        // s17.160 \\
        // enable
        $messageFormButton.removeAttribute('disabled')
        $messageFormInput.value = ''
        $messageFormInput.focus()

        // s17.159 \\
        if (error) {
            return console.log(error)
        }

        console.log('Message delivered.')
    })
})

// s17.158 \\
$sendLocationButton.addEventListener('click', () => {
    if (!navigator.geolocation) {
        return alert('Geolocation is not supported by your browser.')
    }

    // challenge
    // disable
    $sendLocationButton.setAttribute('disabled', 'disabled')

    // challenge
    navigator.geolocation.getCurrentPosition((position) => {
        socket.emit('sendLocation', {
            latitude: position.coords.latitude,
            longitude: position.coords.longitude
            // s17.159 \\
        }, () => {
            // enable
            $sendLocationButton.removeAttribute('disabled')
            console.log('Location shared!')
        })
    })
})

// s17.167 \\
socket.emit('join', { username, room })