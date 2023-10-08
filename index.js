import { catsData } from "./data.js"

function getEmotionsArray(cats) {
  const emotionsArray = [];
  for (let cat of cats) {
    // console.log(cat)
    for (let emotion of cat.emotionTags) {
        if(!(emotionsArray.includes(emotion))){
            emotionsArray.push(emotion);
        }
    }
  }
  return emotionsArray;
}
const emotionRadios = document.getElementById("emotion-radios")
function renderEmotionsRadios(cats){
    let radioItems = ""
    const emotions = getEmotionsArray(cats)
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
        </div>`
    }
    emotionRadios.innerHTML = radioItems
}

renderEmotionsRadios(catsData)
emotionRadios.addEventListener("change", highlightCheckedOpt)
function highlightCheckedOpt(event){

    const radios = document.getElementsByClassName("radio")
    for (let radio of radios) {
        radio.classList.remove("highlight")
    }

    document.getElementById(event.target.id).parentElement.classList.add("highlight")
}
