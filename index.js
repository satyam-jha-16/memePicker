import { catsData } from "./data.js";

const getImageBtn = document.getElementById("get-image-btn");
const gifsOnlyBtn = document.getElementById("gifs-only-option");
const memeModal = document.getElementById("meme-modal");
const memeModalInner = document.getElementById("meme-modal-inner");
const memeModalCloseBtn = document.getElementById("meme-modal-close-btn");
const emotionRadios = document.getElementById("emotion-radios");

getImageBtn.addEventListener("click", renderCat);
memeModalCloseBtn.addEventListener("click", closeModal);
emotionRadios.addEventListener("change", highlightCheckedOpt);

function getEmotionsArray(cats) {
  const emotionsArray = [];
  for (let cat of cats) {
    // console.log(cat)
    for (let emotion of cat.emotionTags) {
      if (!emotionsArray.includes(emotion)) {
        emotionsArray.push(emotion);
      }
    }
  }
  return emotionsArray;
}
function renderEmotionsRadios(cats) {
  let radioItems = "";
  const emotions = getEmotionsArray(cats);
  for (const temp of emotions) {
    radioItems += `
        <div class="radio">
        <label for="${temp}">${temp}</label>
        <input
        type = "radio"
        id = "${temp}"
        value = "${temp}"
        name = "emotion"
        >
        </div>`;
  }
  emotionRadios.innerHTML = radioItems;
}


function highlightCheckedOpt(event) {
  const radios = document.getElementsByClassName("radio");
  for (let radio of radios) {
      radio.classList.remove("highlight");
    }
    
    document
    .getElementById(event.target.id)
    .parentElement.classList.add("highlight");
}

function getMatchingCatsArray() {
  if (document.querySelector('input[type="radio"]:checked').value) {
      const selectedEmotion = document.querySelector(
          'input[type="radio"]:checked'
          ).value;
          // console.log(selectedEmotion)
          const isGifsOnlyChecked = gifsOnlyBtn.checked;
          // console.log(isGifsOnlyChecked)
    const matchingCatsArray = catsData.filter(function (cat) {
        if (isGifsOnlyChecked) {
            return cat.isGif === true && cat.emotionTags.includes(selectedEmotion);
        }
        return cat.emotionTags.includes(selectedEmotion);
    });
    return matchingCatsArray;
}
}

function getSingleCatObject() {
    const catsArray = getMatchingCatsArray();
    // console.log(catsArray) //temporary measure
    if (catsArray.length === 1) {
        return catsArray[0];
    } else {
        const randomIndex = Math.floor(Math.random() * catsArray.length);
        return catsArray[randomIndex];
    }
}

function renderCat() {
    const catObject = getSingleCatObject();
    memeModalInner.innerHTML = `
    <img 
    class="cat-img" 
    src="./images/${catObject.image}"
    alt="${catObject.alt}"
    >
    `;
    // console.log(catObject)
    memeModal.style.display = "flex";
}
function closeModal() {
    memeModal.style.display = "none";
}

renderEmotionsRadios(catsData);