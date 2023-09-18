const slider = document.getElementById("slider");
const plans = document.querySelectorAll(".plan");

const resultsContainer = document.getElementById("results-container");
const box = document.getElementById("results-container");

let scrollTimeout;
let scrollableContainer = document.getElementById("scrollable-container");
let loader = document.getElementById("loader");

slider.addEventListener("input", highlightPlan);

box.addEventListener("scroll", async (e) => {
  const scrollableHeight = box.scrollHeight - box.clientHeight;

  if (Math.ceil(box.scrollTop) >= scrollableHeight) {
    await fetchAndDisplayData();
    scrollableContainer.style.display = "none";
  } else {
    ("");
  }
});

box.addEventListener("scrollend", (event) => {
  page++;
  scrollableContainer.style.display = "visible";
  handleScrollStart();
  scrollTimeout = setTimeout(handleScrollEnd, 250);
});

function highlightPlan() {
  const sliderValue = slider.value;
  let highlightedPlan = "None";

  const containers = document.querySelectorAll(".priceContainer");
  console.log(sliderValue)

  if (sliderValue == 1 && sliderValue < 2) {
    highlightedPlan = "Free";

    containers.forEach((element) => {
      element.classList.remove("border-primary");
    });
    containers[0].classList.add("border-primary");

  } else if (sliderValue == 2 && sliderValue < 3) {
    highlightedPlan = "Pro";

    containers.forEach((element) => {
      element.classList.remove("border-primary");

    });

    containers[1].classList.add("border-primary");

  } else if (sliderValue ==3) {
    highlightedPlan = "Enterprise";
    containers.forEach((element) => {
      element.classList.remove("border-primary");
    });
    containers[2].classList.add("border-primary");
  }

  document.getElementById("selectedPlan").textContent = highlightedPlan;
}

loginForm.addEventListener("submit", async (e) => {
  e.preventDefault();

  let firstname = document.getElementById("firstname");
  let email = document.getElementById("email");
  let contact = document.getElementById("phonenumber1");

  if (firstname.value == "" || email.value == "" || contact.value == "") {
    alert("Ensure you input a value in all fields!");
  } else {
    fetch("https://forms.maakeetoo.com/formapi/424", {
      method: "POST",
      headers: { Authentication: "Bearer WD0WFD61P3MDUPQ0MNWKASJ61" },
    })
      .then((response) => response.json())
      .then((json) => console.log(json));

    let response = await fetch("https://jsonplaceholder.typicode.com/todos/1", {
      method: 'POST',
      headers: { Authentication: 'Bearer WD0WFD61P3MDUPQ0MNWKASJ61' }
    })
      .then((resp) => {
        let gg = resp.json();
        console.log("alsgdhj -==>", gg);
      })
      .then((json) => console.log("cfghfhfh", JSON.stringify(json)));
    alert("This form has been successfully submitted!");

    console.log(
      `This form has a username of ${firstname.value} and password of ${email.value} and ${contact.value}`
    );

    firstname.value = "";
    email.value = "";
    contact.value = "";
  }
});

let page = 1;
const perPage = 15;
let isLoading = false;

async function fetchAndDisplayData() {
  if (isLoading) {
    return;
  }
  try {
    const response = await fetch(
      `https://jsonplaceholder.typicode.com/albums?_page=${page}&_limit=${perPage}`
    );
    const data = await response.json();

    if (data.length > 0) {
      data.forEach((albums) => {
        const albumsElement = document.createElement("h4");
        albumsElement.classList.add("albums");
        albumsElement.textContent = `Title: ${albums.id}\nBody: ${albums.title}`;
        resultsContainer.appendChild(albumsElement);
      });

      page++;
    } 
  } catch (error) {
    console.error("Error fetching data:", error);
  } finally {
    isLoading = false;
  }
}

function handleScrollStart() {
  loader.style.display = "block";
}
