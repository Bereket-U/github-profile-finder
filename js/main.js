const form = document.getElementById("form");

form.addEventListener("submit", function (e) {
  e.preventDefault();

  const search = document.getElementById("search").value;

  if (search === "") {
    console.log("Please enter username");
  } else {
    // fetch user data from github REST API
    fetch(`https://api.github.com/users/${search}`)
      .then((result) => result.json())
      .then((user) => {
        console.log(user);
        if (!user.login) {
          console.log("User Not Found");
        } else {
          fetch(user.repos_url)
            .then((result) => result.json())
            .then((repos) => {
              console.log(repos);
              renderData(user, repos);
            });
        }
      });
  }
});

renderData = (user, repos) => {
  //render user information - from fetched data
  document.getElementById("logo").src = user.avatar_url;
  document.getElementById("full_name").innerText = user.name;
  document.getElementById("username").innerText = user.login;
  document.getElementById("bio").innerText = user.bio;

  console.log(repos);
};
