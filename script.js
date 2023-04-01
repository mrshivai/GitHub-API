let prev = document.getElementById("prev"); // The previous button element
let next = document.getElementById("next"); // The next button element
let avatar_url = document.getElementById("avatar_url");
let username = document.getElementById("username");
let followers = document.getElementById("followers");
let following = document.getElementById("following");
let profile_link = document.getElementById("profile_link");
let index = 0;


function update_data() {

    fetch(`https://api.github.com/users?since=${index}`)
        .then(res => res.json())
        .then(data => {
            avatar_url.setAttribute("src", data[0].avatar_url);
            username.innerText = data[0].login;
            profile_link.setAttribute("href", data[0].html_url);

            fetch(`https://api.github.com/users/${data[0].login}`)
                .then(res => res.json())
                .then(user => {
                    followers.innerText = `Followers  : ${user.followers}`;
                    following.innerText = `Followings : ${user.following}`;
                })

        })
        .catch(error => console.log(error));

}

if (navigator.onLine) {
    update_data();
} else {
    document.body.innerHTML = `<div id="offline"><h1>Your are offline...! Please check Internet connection.</h1><h3>Note : Internet required for fetch data from Github api.</3></div> `;
}

prev.addEventListener("click", () => {
    if(index > 0){
        index--;
        update_data();
    }
})

next.addEventListener("click", () => {
    index++;
    update_data();
})