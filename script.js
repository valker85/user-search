const list = document.querySelector('.list')
const filter = document.querySelector('.filter')
let USERS = []

filter.addEventListener('input', (event)=>{
    const value = event.target.value.toLowerCase()
    const filteredUsers = USERS.filter((user)=>
        user.name.toLowerCase().includes(value)
    )

    render(filteredUsers)
})

async function start() {
    list.innerHTML = '<p class="loading">Loading...</p>'
    try {
        const response = await fetch('https://jsonplaceholder.typicode.com/users', {
            method: 'GET'
        })
        const data = await response.json()

        setTimeout(() => {
            USERS = data
            render(data)
        }, 1000)

    } catch (error) {
        list.innerHTML = `<p style="color: red" class="loading">${error.message}</p>`
    }
}

function render(users = []) {
    if (users.length === 0) {
        list.innerHTML = '<p>No matched users!</p>'
    } else{
        const html = users
            .map(user => `<li>${user.name}</li>`)
            .join('')
            
        list.innerHTML = html        
    }
}

start()