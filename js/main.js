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
  //render user repositories - from fetched data
  repos.forEach((repo) => {
    userRepos = document.getElementById("user_repos");

    repoName = document.createElement("a");
    repoName.innerText = repo.name;
    repoName.href = repo.html_url;
    userRepos.append(repoName);

    description = document.createElement("p");
    description.innerText = repo.description;
    userRepos.append(description);

    repoDetails = document.createElement("div");
    repoDetails.classList.add("repo_details");
    userRepos.append(repoDetails);

    language = document.createElement("li");
    language.innerText = repo.language;
    repoDetails.append(language);

    stars = document.createElement("li");
    stars.innerText = repo.stargazers_count;
    repoDetails.append(stars);

    forks = document.createElement("li");
    forks.innerText = repo.forks;
    repoDetails.append(forks);

    updatedAt = document.createElement("li");
    updatedAt.innerText = repo.updated_at;
    repoDetails.append(updatedAt);
  });
};
