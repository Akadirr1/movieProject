document.addEventListener("DOMContentLoaded", myFunc)
const push = document.addEventListener("onclick", searchmovie);
function searchmovie() {
	const searchQuery = document.getElementById("search").value.trim();
	const encodedUrl = encodeURIComponent(searchQuery);

	fetch("http://localhost:5500/search",encodedUrl)
	.then(res => res.json())
	.then(data => console.log(data));
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