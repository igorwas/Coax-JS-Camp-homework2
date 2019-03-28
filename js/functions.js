const API_USERS = "https://jsonplaceholder.typicode.com/users/";
const API_POSTS_BY_AUTHOR_BASE = 'https://jsonplaceholder.typicode.com/posts?userId=';
const API_COMMENTS_BASE = 'https://jsonplaceholder.typicode.com/comments?postId=';

//tast #1 and #2
let loadJson = function(url) {
  return fetch(url)
    .then(response => response.json())
    .then(json => {
        console.log(json); 
        return json; 
    })
    .catch(error => console.log(error));
}
let user = function(userId){
    return loadJson(API_USERS + userId);
}

let postsByUser = function(userId){
    return loadJson(API_POSTS_BY_AUTHOR_BASE + userId);
}

let comments = function(postId){
    return loadJson(API_COMMENTS_BASE + postId);
}

user(1)
    .then(user => {
        postsByUser(user.id)
            .then(posts => {
                posts.forEach((post) => {
                    comments(post.id)
                })
            })
    });

setTimeout( () => {
    console.log("result from Promise.all")
    Promise.all([
        user(1), 
        postsByUser(1)
        .then(posts => 
            posts.forEach((post) => {
                comments(post.id)
                })
            )
        ])
}, 2000)

//task #3
let userForAwait = function(userId){
    return fetch(API_USERS + userId);
}

let postsByUserForAwait = function(userId){
    return fetch(API_POSTS_BY_AUTHOR_BASE + userId);
}

let commentsForAwait = function(postId){
    return fetch(API_COMMENTS_BASE + postId);
}
   
async function getPostsAndCommentsByUser(userId){
    let userResponse = await userForAwait(userId);
    let user = await userResponse.json();
    console.log("user with using async/await =")
    console.log(user);
    let postsResponse = await postsByUserForAwait(userId);
    let posts = await postsResponse.json();
    console.log("posts with using async/await =")
    console.log(posts);
    console.log("comments with using async/await =")
    for(let key in posts) {
        let commentsResponse = await commentsForAwait(posts[key].id);
        let comments = await commentsResponse.json();
        console.log(comments);
    }
}

setTimeout( () => getPostsAndCommentsByUser(1), 4000);