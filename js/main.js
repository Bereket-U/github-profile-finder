const form = document.getElementById("form");
const userInfo = document.getElementById("user_info");
const userRepos = document.getElementById("user_repos");
const numberOfRepos = document.getElementById("result_found");

form.addEventListener("submit", function (e) {
  e.preventDefault();

  clearData();

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

  const fullName = document.createElement("p");
  fullName.textContent = user.name;
  fullName.classList.add("full_name");
  userInfo.append(fullName);

  const username = document.createElement("p");
  username.textContent = user.login;
  username.classList.add("username");
  userInfo.append(username);

  const bio = document.createElement("p");
  bio.classList.add("bio");
  bio.textContent = user.bio;
  userInfo.append(bio);

  const resultFound = document.createElement("p");
  resultFound.classList.add("result_found");
  resultFound.textContent = `${repos.length} results for public repositories`;
  numberOfRepos.append(resultFound);

  console.log(repos);
  //render user repositories - from fetched data
  repos.forEach((repo) => {
    //Generate randome color for language
    const randomColor = Math.floor(Math.random() * 16777215).toString(16);
    // Create div tag to wrap a single repository
    const singleRepo = document.createElement("div");
    singleRepo.classList.add("single_repo");
    userRepos.appendChild(singleRepo);

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

    //Create circle for language color
    const languageColor = document.createElement("div");
    languageColor.classList.add("language_color");
    languageColor.style.backgroundColor = "#" + randomColor;
    repoDetails.append(languageColor);

    // Create repository-details
    const language = document.createElement("li");
    language.innerText = repo.language;
    repoDetails.append(language);

    // Create Star Icon
    const starIcon = document.createElement("div");
    starIcon.classList.add("star_icon");
    starIcon.innerHTML = `
    <svg aria-label="star" role="img" height="16" viewBox="0 0 16 16" version="1.1" width="16" data-view-component="true" class="octicon octicon-star">
         <path fill-rule="evenodd" d="M8 .25a.75.75 0 01.673.418l1.882 3.815 4.21.612a.75.75 0 01.416 1.279l-3.046 2.97.719 4.192a.75.75 0 01-1.088.791L8 12.347l-3.766 1.98a.75.75 0 01-1.088-.79l.72-4.194L.818 6.374a.75.75 0 01.416-1.28l4.21-.611L7.327.668A.75.75 0 018 .25zm0 2.445L6.615 5.5a.75.75 0 01-.564.41l-3.097.45 2.24 2.184a.75.75 0 01.216.664l-.528 3.084 2.769-1.456a.75.75 0 01.698 0l2.77 1.456-.53-3.084a.75.75 0 01.216-.664l2.24-2.183-3.096-.45a.75.75 0 01-.564-.41L8 2.694v.001z"></path>
    </svg>
    `;
    repoDetails.append(starIcon);

    const stars = document.createElement("li");
    stars.innerText = repo.stargazers_count;
    repoDetails.append(stars);

    // Create Fork Icon
    const forkIcon = document.createElement("div");
    forkIcon.classList.add("fork_icon");
    forkIcon.innerHTML = `
         <svg aria-label="fork" role="img" height="16" viewBox="0 0 16 16" version="1.1" width="16" data-view-component="true" class="octicon octicon-repo-forked">
            <path fill-rule="evenodd" d="M5 3.25a.75.75 0 11-1.5 0 .75.75 0 011.5 0zm0 2.122a2.25 2.25 0 10-1.5 0v.878A2.25 2.25 0 005.75 8.5h1.5v2.128a2.251 2.251 0 101.5 0V8.5h1.5a2.25 2.25 0 002.25-2.25v-.878a2.25 2.25 0 10-1.5 0v.878a.75.75 0 01-.75.75h-4.5A.75.75 0 015 6.25v-.878zm3.75 7.378a.75.75 0 11-1.5 0 .75.75 0 011.5 0zm3-8.75a.75.75 0 100-1.5.75.75 0 000 1.5z"></path>
         </svg>
    `;
    repoDetails.append(forkIcon);

    const forks = document.createElement("li");
    forks.innerText = repo.forks;
    repoDetails.append(forks);

    const updatedAt = document.createElement("li");
    updatedAt.innerText = repo.updated_at;
    repoDetails.append(updatedAt);
  });
};

clearData = () => {
  userInfo.innerHTML = "";
  userRepos.innerHTML = "";
  numberOfRepos.innerHTML = "";
};
