const postID = new URL(location.href).searchParams.get('postId');
const postURL = `https://jsonplaceholder.typicode.com/posts/${postID}`;
const commentsURL = `https://jsonplaceholder.typicode.com/posts/${postID}/comments`;

async function fetchInfo(url) {
    const response = await fetch(url);
    return await response.json();
}


async function showPostDetails() {
    const postData = await fetchInfo(postURL);
    givePostDetails(postData);

    const commentsData = await fetchInfo(commentsURL);
    giveComments(commentsData);
}

function givePostDetails(postData) {
    const postDiv = document.createElement('div');
    postDiv.classList.add('post-details-div')
    document.body.appendChild(postDiv);

    for (const key in postData) {
        if (postData.hasOwnProperty(key)) {
            const p = document.createElement('p');
            p.textContent = `${key}: ${postData[key]}`;
            postDiv.appendChild(p);
        }
    }
}

function giveComments(comments) {
    const commentsDiv = document.createElement('div');
    commentsDiv.classList.add('comments-div');
    document.body.appendChild(commentsDiv);


    for (const comment of comments) {
        const pComments = document.createElement('p');

        const commentEmail = comment.email;
        const commentBody = comment.body;

        pComments.innerHTML = `Comment from <b>${commentEmail}:</b> <br><br> ${commentBody}`;
        commentsDiv.appendChild(pComments);
    }
}


window.onload = function () {
    showPostDetails();
};