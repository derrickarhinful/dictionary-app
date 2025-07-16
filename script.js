const input = document.querySelector(".searchBar");
const searchBtn = document.querySelector(".searchBtn");
const soundBtn = document.querySelector(".soundBox");
const wordSearched = document.querySelector(".wordSearched");
const phonetics = document.querySelector(".phonetics");
const wordClass = document.querySelector(".wordClass");
const content = document.querySelector(".content");
const definitionResults = document.querySelector(".definitionResults");
const exampleResult = document.querySelector(".exampleResult");
const partOfSpeech = document.querySelector(".partOfSpeech");
const definition = document.querySelector(".Definition");
const example = document.querySelector(".Example");
const audio = document.querySelector(".audio");

searchBtn.addEventListener("click", () => {
  if (input.value !== "") {
    searchWord();
    input.value = "";
  }
});
input.addEventListener("keydown", (e) => {
  if (input.value.trim() !== "" && e.key === "Enter") {
    searchWord();
    input.value = "";
  }
});

async function searchWord() {
  const keyword = input.value;
  const url = `https://api.dictionaryapi.dev/api/v2/entries/en/${keyword}`;
  const data = await fetch(url);
  const results = await data.json();
  try {
    const result = results[0];
    phonetics.innerHTML = result.phonetics[0].text;
    wordSearched.innerHTML = result.word;
    wordClass.innerHTML = result.meanings[0].partOfSpeech;
    audio.src = result.phonetics[0].audio;
    console.log(results);
    if (result.phonetics[0].audio === "") {
      console.log("send");
      soundBtn.style.display = "none";
    } else {
      soundBtn.style.display = "block";
    }
    partOfSpeech.style.display = "block";
    definition.style.display = "block";
    definitionResults.innerHTML = result.meanings[0].definitions[0].definition;
    if (result.meanings[0].definitions[0].example) {
      example.style.display = "block";
      exampleResult.innerHTML = result.meanings[0].definitions[0].example;
    }
  } catch (err) {
    wordSearched.innerText = results.message;
    phonetics.innerHTML = "";
    wordClass.innerHTML = "";
    soundBtn.style.display = "none";
    partOfSpeech.style.display = "none";
    definition.style.display = "none";
    definitionResults.innerHTML = "";
    exampleResult.innerHTML = "";
    example.style.display = "none";
  }
}
soundBtn.addEventListener("click", () => {
  audio.play();
});
