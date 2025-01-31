const searchInput = document.getElementById("search-input");
const resultArtist = document.getElementById("result-artist");
const resultPlaylist = document.getElementById("result-playlists");

function requestApi(searchTerm) {
  const url = `http://localhost:3000/artists`; // Busca todos os artistas da API
  fetch(url)
    .then((response) => response.json())
    .then((result) => displayResults(result, searchTerm))
    .catch((error) => console.error("Erro ao buscar artistas:", error));
}

function displayResults(result, searchTerm) {
  resultPlaylist.classList.add("hidden");

  // Limpar resultados anteriores
  resultArtist.innerHTML = "";

  // Filtrar resultados que começam com o termo pesquisado
  const filteredResult = result.filter((artist) =>
    artist.name.toLowerCase().startsWith(searchTerm)
  );

  // Verifica se há resultados filtrados
  if (filteredResult.length > 0) {
    const element = filteredResult[0]; // Exibe apenas o primeiro resultado encontrado

    const artistCard = document.createElement("div");
    artistCard.classList.add("artist-card");

    const artistName = document.createElement("h3");
    artistName.innerText = element.name;

    const artistImage = document.createElement("img");
    artistImage.src = element.urlImg || "https://via.placeholder.com/150";
    artistImage.alt = element.name;

    artistCard.appendChild(artistImage);
    artistCard.appendChild(artistName);
    resultArtist.appendChild(artistCard);

    resultArtist.classList.remove("hidden"); // Mostra a seção de artistas
  } else {
    resultArtist.classList.add("hidden"); // Esconde a seção de artistas se não houver resultados
  }
}

document.addEventListener("input", function () {
  const searchTerm = searchInput.value.toLowerCase().trim();

  if (searchTerm === "") {
    // Esconde os resultados se o campo de busca estiver vazio
    resultPlaylist.classList.add("hidden");
    resultArtist.classList.add("hidden");
    resultArtist.innerHTML = ""; // Limpa os resultados
    return;
  }

  // Faz a busca quando o termo é válido
  requestApi(searchTerm);
});
