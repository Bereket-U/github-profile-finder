const form = document.getElementById("form");

form.addEventListener("submit", function (e) {
  e.preventDefault();

  const search = document.getElementById("search").value;

  if (search === "") {
    console.log("Please enter username");
  } else {
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
            });
        }
      });
  }
});
