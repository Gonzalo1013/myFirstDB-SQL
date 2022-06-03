//web socket
const socket = io()

socket.on('products', (data) => {
    console.log(data)
    render(data)
})

socket.on('message', (data) => {
    console.log(data)
    renderMs(data)
})

const render = (data) => {
    let html = data.map((x) => {
        return `
        <tr>
        <th scope="row">${x.id}</th>
        <td>${x.title}</td>
        <td>$${x.price}</td>
        <td><img src=${x.thumbnail} width="40"
            height="40" alt="img"></td>
        </tr>
        `
    })
    .join(' ')
    document.querySelector('#caja').innerHTML = html
}

const addInfo = () => {
    let dataObj = { title: document.querySelector('#title').value, 
                    price: document.querySelector('#price').value, 
                    thumbnail: document.querySelector('#img').value
                };
    socket.emit('dataProd', dataObj)
    return false
}

document.addEventListener('submit', (e)=>{
    e.preventDefault()
})

const addMessage = () => {
    let msnObj = {   
            user: document.querySelector('#email').value, 
            message: document.querySelector('#text').value,
            };
    document.querySelector('#text').value=''
    socket.emit('msn', msnObj)
    return false
}

const renderMs = (data) => {
    let html = data.map((x) => {
            return `
            <div>
                <p style="color: brown;">
                    <strong class="text-primary">${x.user}</strong> 
                    [${x.time}] 
                    <i class="text-success">${x.message}</i>
                </p>
            </div>
            `
        })
    .join(' ')
    document.querySelector('#c-messages').innerHTML = html
}
