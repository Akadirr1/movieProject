//document.addEventListener("DOMContentLoaded", myFunc)
const searchbtn = document.getElementById('searchbtn')
searchbtn.addEventListener("click", searchmovie)
function searchmovie() {
	const searchQuery = document.getElementById("search").value.trim();
	console.log(searchQuery);
	const encodedUrl = encodeURIComponent(searchQuery);

	fetch(`http://localhost:5500/search?query=${encodedUrl}`)
		.then(res => res.json())
		.then(data => {
			console.log(data)
			displaySearchResults(data);
		})
		.catch(error => console.error('Hata:', error));

}
function displaySearchResults(data) {
	// Arama sonuçlarını göstermek için DOM manipülasyonu
	const resultsContainer = document.getElementById("searchResults") || document.createElement("div");
	resultsContainer.id = "searchResults";
	resultsContainer.innerHTML = ""; // Önceki sonuçları temizle

	if (data.results && data.results.length > 0) {
		data.results.forEach(movie => {
			const movieCard = document.createElement("div");
			movieCard.classList.add("movie-card");

			movieCard.innerHTML = `
                <img src="https://image.tmdb.org/t/p/w200${movie.poster_path || '/no-image.png'}" alt="${movie.title}">
                <h3>${movie.title}</h3>
                <p>Rating: ${movie.vote_average}/10</p>
            `;

			resultsContainer.appendChild(movieCard);
		});
	} else {
		resultsContainer.innerHTML = "<p>Arama sonucu bulunamadı</p>";
	}

	// Container'a ekle
	const container = document.querySelector(".container") || document.body;
	container.appendChild(resultsContainer);
}
function myFunc() {
	fetch("http://localhost:5500/popular")
		.then(res => res.json())
		.then(data => {
			console.log(data);
			const carousel_example = document.getElementById('carouselExample')
			const carousel = document.querySelector('.carousel-inner');
			const movie = data.results;
			movie.forEach((film, index) => {
				const item = document.createElement('div');
				item.classList.add('carousel-item');
				if (index == 0) {
					item.classList.add('active');
				}
				const img = document.createElement('img');
				img.setAttribute("src", `https://image.tmdb.org/t/p/w500/${film.poster_path}`)
				img.classList.add('d-block')
				img.classList.add('w-100')

				item.appendChild(img);
				carousel.appendChild(item);
			});

			const carouselInstance = new bootstrap.Carousel(carousel_example, {
				interval: 2000,  // 2 saniyede bir değişsin
				wrap: true,      // Son slayttan sonra başa dönsün
				keyboard: true,
				ride: 'carousel' // Otomatik hareketi açıkça belirttik

			})
			//const container = document.getElementById("container");
			//const imgdiv = document.createElement("div");
			//const movie = data.results;
			//movie.forEach((film) => {

			//		const img = document.createElement('img');
			//		const overview = document.createElement('h4');
			//		overview.innerHTML = `${film.overview}`
			//		img.setAttribute("src", `https://image.tmdb.org/t/p/w500/${film.poster_path}`)
			//		imgdiv.appendChild(img);
			//		imgdiv.appendChild(overview);


			//});

			//container.appendChild(imgdiv)
		})
		.catch(error => console.error('Hata:', error));


}