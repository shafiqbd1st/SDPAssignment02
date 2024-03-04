const loadData = () => {
  // console.log("hello");
  fetch("https://openapi.programming-hero.com/api/videos/categories")
    .then((res) => res.json())
    .then((data) => displayData(data.data));
};

const displayByID = (value) => {
  fetch(`https://openapi.programming-hero.com/api/videos/category/${value}`)
    .then((res) => res.json())
    .then((data) => displayID(data.data));
};

const displayData = (data) => {
  const buttonContainer = document.getElementById("button-container");
  data.forEach((item) => {
    console.log(item);
    const btnCreate = document.createElement("div");
    btnCreate.classList.add("btn");
    btnCreate.innerHTML = `
    <button onclick="displayByID('${item.category_id}')" type="button" class="btn btn-danger">
      ${item.category}
    </button>
    `;
    buttonContainer.appendChild(btnCreate);
  });
};

const displayID = (data) => {
  // document.getElementById("total-meals").innerText = data.length;
  // console.log(data.length);
  if (data.length == 0) {
    const cardContainer = document.getElementById("card-container");
    cardContainer.innerHTML = `
    <div>
      <div>
      <img class= "d-img" src="./Icon.png" alt="">
      </div>
      <div><h4 class="text-opp">Opps !! There is no content here</h4> </div>
    </div>
    
    `;
    return;
  }
  const cardContainer = document.getElementById("card-container");
  cardContainer.innerHTML = "";

  data.forEach((item) => {
    console.log(item);
    const card = document.createElement("div");
    card.classList.add("boximg");
    card.innerHTML = `
 <img class="a-img" src="${item.thumbnail}" alt="">
    <div class="image-taite">
      <div class="image">
        <img class="c-img" src="${item.authors[0].profile_picture}" alt="">
      </div>
      <div class="details c">
         <h5>${item.title}</h5>
         <div class="profile">
          <div><p>${item.authors[0].profile_name}</p></div>
          <div><p>${item.authors[0].verified
        ? `<img class="c-img"  src="./download.png" alt="">`
        : ``
      }</p></div>
         </div>
          <div>
            <div><p>${item.others.views} views</p></div>
          </div>
      </div>
    </div>

    `;
    cardContainer.appendChild(card);
  });
};

function time_calculate(value) {
  if (value.length > 0) {
    let time = parseInt(value);
    let hour = parseInt(time / 3600);
    let rem = time % 3600;
    let min = parseInt(rem / 60);
    return `${hour}hrs ${min} min ago`;
  }
}
const sort = () => {
  fetch("https://openapi.programming-hero.com/api/videos/category/1000")
    .then((res) => res.json())
    .then((data) => display(data.data));
};

const display = (data) => {
  data.sort(
    (element1, element2) =>
      element2.others.views.slice(0, -1) - element1.others.views.slice(0, -1)
  );
  displayID(data);
};

const displayAllData = () => {
  fetch("https://openapi.programming-hero.com/api/videos/category/1000")
    .then((res) => res.json())
    .then((data) => displayID(data.data));
};

loadData();
displayAllData();
