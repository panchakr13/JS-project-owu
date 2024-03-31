
const userID = new URL(location.href).searchParams.get('id');
const baseURL = 'http://jsonplaceholder.typicode.com/users/' + userID;


fetchUserData(baseURL)
    .then(giveUserData)
    .catch(error => console.error('Error data:', error));

async function fetchUserData(url) {
    const response = await fetch(url);
    return response.json();
}

function createUserDiv() {
    const div = document.createElement('div');
    div.classList.add('user-div')
    document.body.appendChild(div);

    return div;
}

function createUserList(father) {
    const ul = document.createElement('ul');
    ul.classList.add('user-ul')
    father.appendChild(ul);

    return ul;
}

function addListItem(father, key, value) {
    const li = document.createElement('li');
    li.classList.add('user-li')

    if (typeof value !== 'object') {
        li.innerText = `${key} - ${value}`;

    } else {

        li.innerText = `${key}:`;

        const ul = document.createElement('ul');
        ul.classList.add('inserted-ul')

        for (const key in value) {
            if (value.hasOwnProperty(key)) {
                addListItem(ul, key, value[key])
            }
        }
        li.appendChild(ul);
    }
    father.appendChild(li);
}

function giveUserData(userData) {
    const userDiv = createUserDiv();
    const userList = createUserList(userDiv);

    for (const key in userData) {
        if (userData.hasOwnProperty(key)) {
            addListItem(userList, key, userData[key])
        }
    }
}

const userDetails = document.createElement('h2');
userDetails.innerText = 'user-details'
userDetails.classList.add('user-details');
document.body.appendChild(userDetails)

const postsUserText = document.createElement('span')
postsUserText.classList.add('posts-user-text-span');
postsUserText.innerText = 'Posts of current user: ';

postsUserText.style.display = 'none';

let clickedButtonFlag = true;

const button = document.createElement('button');
button.classList.add('posts-button')

button.innerText = 'Posts of this user';

button.addEventListener('click', async () => {
    if (clickedButtonFlag){
        clickedButtonFlag = false;

        const userPosts = await fetch(`https://jsonplaceholder.typicode.com/users/${userID}/posts`);
        const postsData = await userPosts.json();


        // const postsTitlesArr = postsData.map(post => post.title);

        const divForPostTitle = document.createElement('div')
        divForPostTitle.classList.add('div-for-post-title')

        const ulPostTitle = document.createElement('ul');
        ulPostTitle.classList.add('ul-for-post-title')

        for (const post of postsData) {
            const liPostTitle = document.createElement('li');
            liPostTitle.classList.add('li-post-title');


            const link = document.createElement('a');
            link.href = 'post-details.html?postId=' + post.id;
            link.innerText = post.title;

            liPostTitle.appendChild(link)
            ulPostTitle.appendChild(liPostTitle)

        }
        divForPostTitle.appendChild(ulPostTitle)
        document.body.appendChild(divForPostTitle)

        button.style.display = 'none';
        postsUserText.style.display = 'inline'

    }


});

function showButton(){
    document.body.appendChild(button)
    document.body.appendChild(postsUserText)
}
setTimeout(showButton, 300)