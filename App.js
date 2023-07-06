document.addEventListener("DOMContentLoaded", function () {
  const searchInput = document.getElementById("search");
  const resultCard = document.getElementById("cards");

  const searchButton = document.getElementById("search-btn");
  const word = document.createElement("h2");
  const para = document.createElement("p");
  const audio = document.createElement("audio");
  //var searchlist = [];
  window.onload = () => {
    resultCard.innerHTML = "";
  };

  searchButton.addEventListener("click", handleSearch);
  async function handleSearch() {
    try {
      const response = await fetch(
        `https://api.dictionaryapi.dev/api/v2/entries/en/${searchInput.value.toLowerCase()}`
      );
      const data = await response.json();
      console.log(data);

      var searchhistory = searchInput.value.trim();
      displayData(data, searchhistory);
    } catch (error) {
      console.log(error);
    }

    var searchhistory = searchInput.value.trim();

    if (searchhistory !== "") {
      searchInput.value = "";
      // savedhistory();
    }
  }
  const displayData = (data, searchhistory) => {
    resultCard.setAttribute("class", "resultcard");

    if (typeof data == "object" && data.title) {
      resultCard.innerText = "";
      const result = data.title;
      word.textContent = result;
      const parag = document.createElement("p");
      parag.appendChild(word);

      resultCard.appendChild(parag);
      savedhistory(searchhistory, result);
    } else {
      const heading = data[0].word;
      word.textContent = heading;
      const wordCard = document.createElement("p");
      wordCard.appendChild(word);
      const meaning = data[0]?.meanings[0]?.definitions[0]?.definition;
      para.innerText = meaning;
      wordCard.appendChild(para);
      const audio_1 = data[0].phonetics[1].audio;
      audio.src = audio_1;
      audio.controls = true;
      audio.style.backgroundColor = "black";
      audio.style.padding = "5px";
      wordCard.appendChild(audio);
      resultCard.appendChild(wordCard);
      const searchList = JSON.parse(localStorage.getItem("searchList")) || [];
      console.log(searchList, "searchList");
      savedhistory(searchhistory, meaning);
    }
  };

  function savedhistory(text, meaning) {
    let searchList = JSON.parse(localStorage.getItem("searchList")) || [];
    searchList.push({ text, meaning });
    localStorage.setItem("searchList", JSON.stringify(searchList));
  }
});