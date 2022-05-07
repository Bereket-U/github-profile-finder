const form = document.getElementById("form");
const userInfo = document.getElementById("user_info");
const userRepos = document.getElementById("user_repos");

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
              repos = repos.slice(0, 20);
              console.log(repos);
              renderData(user, repos);
            });
        }
      });
  }
});

renderData = (user, repos) => {
  //render user information - from fetched data
  const logo = document.createElement("img");
  logo.src = user.avatar_url;
  logo.classList.add("logo");
  userInfo.append(logo);

  const fullName = document.createElement("h1");
  fullName.textContent = user.name;
  userInfo.append(fullName);

  const username = document.createElement("p");
  username.textContent = user.login;
  userInfo.append(username);

  const bio = document.createElement("p");
  bio.textContent = user.bio;
  userInfo.append(bio);

  console.log(repos);
  //render user repositories - from fetched data
  repos.forEach((repo) => {
    // Create div tag to wrap a single repository
    const singleRepo = document.createElement("div");
    singleRepo.classList.add("single_repo");
    userRepos.append(singleRepo);

    // Create repository-name and append to singleRepo
    const repoName = document.createElement("a");
    repoName.innerText = repo.name;
    repoName.href = repo.html_url;
    singleRepo.append(repoName);

    const description = document.createElement("p");
    description.innerText = repo.description;
    singleRepo.append(description);

    //Create div tag to wrap repository details
    const repoDetails = document.createElement("div");
    repoDetails.classList.add("repo_details");
    singleRepo.append(repoDetails);

    // Create repository-details and append to repoDetails
    const language = document.createElement("li");
    language.innerText = repo.language;
    repoDetails.append(language);

    const stars = document.createElement("li");
    stars.innerText = repo.stargazers_count;
    repoDetails.append(stars);

    const forks = document.createElement("li");
    forks.innerText = repo.forks;
    repoDetails.append(forks);

    const updatedAt = document.createElement("li");
    updatedAt.innerText = repo.updated_at;
    repoDetails.append(updatedAt);
  });
};
