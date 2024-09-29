let searchInput = document.getElementById("searchInput");
let searchBtn = document.getElementById("searchBtn");

const getData = async (searchValue) => {
    try {
        let data = await fetch(`https://api.dictionaryapi.dev/api/v2/entries/en/${searchValue}`);
        let jsonData = await data.json();

        document.querySelector(".text").innerHTML = "";
        let div = document.createElement("div");
        div.classList.add("detail");


        div.innerHTML = `
            <h2>Word: <span>${jsonData[0].word}</span></h2>
            <p>${jsonData[0].meanings[0].partOfSpeech}</p>
            <p>Meaning: <span>${jsonData[0].meanings[0].definitions[0].definition}</span></p>
            <p>Example: <span>${jsonData[0].meanings[0].definitions[0].example == undefined ? "Not Found" : jsonData[0].meanings[0].definitions[0].example}</span></p>
            <p>Synonyms: <span>${jsonData[0].meanings[0].synonyms.join(", ") || "Not Found"}</span></p>
            <p>Antonyms: <span>${jsonData[0].meanings[0].antonyms.join(", ") || "Not Found"}</span></p>
        `;


        if (jsonData[0].phonetics[0] && jsonData[0].phonetics[0].audio) {
            let audioContainer = document.createElement("div");
            audioContainer.classList.add("audio-container");

            let audio = document.createElement("audio");
            audio.controls = true;
            audio.src = jsonData[0].phonetics[0].audio;

            audioContainer.appendChild(audio);
            div.appendChild(audioContainer); 
        } else {
            let noAudio = document.createElement("p");
            noAudio.innerText = "Pronunciation audio not available";
            div.appendChild(noAudio);
        }


        let readMoreLink = document.createElement("a");
        readMoreLink.href = jsonData[0].sourceUrls[0];
        readMoreLink.target = "_blank";
        readMoreLink.innerText = "Read More";
        div.appendChild(readMoreLink);

        document.querySelector(".text").appendChild(div);
    } catch (error) {
        document.querySelector(".text").innerHTML = "<h1>Word not found</h1>";
    }
};

searchBtn.addEventListener("click", function () {
    let searchValue = searchInput.value;
    if (searchValue === "") {
        alert("Please enter a word");
    } else {
        getData(searchValue);
    }
});
