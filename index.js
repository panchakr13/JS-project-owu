const URL = 'https://jsonplaceholder.typicode.com/users';

fetch(URL)
    .then(res => res.json())
    .then(users => {

        let usersDiv = document.createElement('div')
        usersDiv.classList.add('users-div')
        document.body.appendChild(usersDiv)


        for (const user of users) {
            let userGlobalBlock = document.createElement('div')
            userGlobalBlock.classList.add('user-global-block')


            let userBlock = document.createElement('div')
            userBlock.classList.add('user-block')
            userBlock.innerHTML = `<span>${user.id}. </span>
                                   <span>${user.name}</span>`

            userGlobalBlock.appendChild(userBlock)


            let button = document.createElement('button')
            button.innerText = `click me`

            button.addEventListener('click', () => {
                location.href = 'user-details.html?id=' + user.id;

            })

            userGlobalBlock.appendChild(button)

            usersDiv.appendChild(userGlobalBlock)
        }

    })