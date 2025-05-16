const searchbtn = document.getElementById('searchbtn')
searchbtn.addEventListener("click", searchmovie)
function searchmovie() {
	const searchQuery = document.getElementById("search").value.trim();
	console.log(searchQuery);

	if(!searchQuery) return;

	const encodedUrl = encodeURIComponent(searchQuery);

	showPage('search-page')

	// Loading göstergesi ekle
	const resultsContainer = document.getElementById("searchResults");
    resultsContainer.innerHTML = '<div class="spinner-border text-light" role="status"><span class="visually-hidden">Loading...</span></div>';

	fetch(`http://localhost:5500/search?query=${encodedUrl}`)
		.then(res => res.json())
		.then(data => {
			console.log(data)
			displaySearchResults(data);
		})
		.catch(error => {
			console.error('Hata:', error)
			document.getElementById("searchResults").innerHTML = '<div class="alert alert-danger">Arama sırasında bir hata oluştu!</div>';

		});

}
document.addEventListener("DOMContentLoaded", function() {
    // Ana sayfa yüklenme fonksiyonları
    myFunc1();
    myFunc1_1();
    myFunc2();
    
    // Ana sayfaya dön butonu
    const backButton = document.getElementById('back-to-home');
    if (backButton) {
        backButton.addEventListener('click', function() {
            showPage('home-page');
        });
    }
});
function displaySearchResults(data) {
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
function showPage(pageId){
	document.querySelectorAll(".page").forEach(page=>{
		page.classList.remove('active')
	});

	document.getElementById(pageId).classList.add("active");
}

function myFunc1() {
	fetch("http://localhost:5500/popular")
		.then(res => res.json())
		.then(data => {
			console.log(data);
			const carousel_example = document.getElementById('carouselExampleCaptions')
			const carousel_indicators= document.querySelector('.carousel-indicators')
			const carousel = document.querySelector('.carousel-inner');
			const movie = data.results;
			let slideIndex = 0;
			movie.forEach((film, index) => {
				if(index%2==0)
				{
				const indicator = document.createElement('button')
				indicator.setAttribute("type","button");
				indicator.setAttribute("data-bs-target","#carouselExampleCaptions");
				indicator.setAttribute("data-bs-slide-to",`${slideIndex}`);
				indicator.setAttribute("aria-label",`Slide ${slideIndex}`);
				const item = document.createElement('div');
				item.classList.add('carousel-item');
				if (index === 0) {
					item.classList.add('active');
					indicator.classList.add('active');
					indicator.setAttribute("aria-current","true");

				}
				const img = document.createElement('img');
				img.setAttribute("src", `https://image.tmdb.org/t/p/w500/${film.backdrop_path}`)
				img.classList.add('d-block')
				img.classList.add('w-100')

				const carousel_caption = document.createElement('div');
				carousel_caption.classList.add('carousel-caption')
				carousel_caption.classList.add('d-none')
				carousel_caption.classList.add('d-md-block')
				carousel_caption.innerHTML = `
				<h6>${film.title}</h6>
				`
				item.appendChild(carousel_caption);
				carousel_indicators.appendChild(indicator);
				item.appendChild(img);
				carousel.appendChild(item);
				slideIndex++;

				}
			});

			const carouselInstance = new bootstrap.Carousel(carousel_example, {
				interval: 2000,  // 2 saniyede bir değişsin
				wrap: true,      // Son slayttan sonra başa dönsün
				keyboard: true,
				ride: 'carousel' // Otomatik hareketi açıkça belirttik

			})
		})
		.catch(error => console.error('Hata:', error));


}
function myFunc1_1() {
	fetch("http://localhost:5500/popular")
		.then(res => res.json())
		.then(data => {
			console.log(data);
			const carousel_example1 = document.getElementById('carouselExampleCaptions1')
			const carousel_indicators= carousel_example1.querySelector('.carousel-indicators')
			const carousel = carousel_example1.querySelector('.carousel-inner');
			const movie = data.results;
			let slideIndex1 = 0;
			movie.forEach((film, index) => {
				if(index%2 != 0)
				{
				const indicator = document.createElement('button')
				indicator.setAttribute("type","button");
				indicator.setAttribute("data-bs-target","#carouselExampleCaptions1");
				indicator.setAttribute("data-bs-slide-to",`${slideIndex1}`);
				indicator.setAttribute("aria-label",`Slide ${slideIndex1}`);
				const item = document.createElement('div');
				item.classList.add('carousel-item');
				if (slideIndex1 === 0) {
					item.classList.add('active');
					indicator.classList.add('active');
					indicator.setAttribute("aria-current","true");

				}
				const img = document.createElement('img');
				img.setAttribute("src", `https://image.tmdb.org/t/p/w500/${film.backdrop_path}`)
				img.classList.add('d-block')
				img.classList.add('w-100')

				const carousel_caption = document.createElement('div');
				carousel_caption.classList.add('carousel-caption')
				carousel_caption.classList.add('d-none')
				carousel_caption.classList.add('d-md-block')
				carousel_caption.innerHTML = `
				<h6>${film.title}</h6>
				`
				item.appendChild(carousel_caption);
				carousel_indicators.appendChild(indicator);
				item.appendChild(img);
				carousel.appendChild(item);
				slideIndex1++;
				}
			});

			const carouselInstance = new bootstrap.Carousel(carousel_example1, {
				interval: 2000,  // 2 saniyede bir değişsin
				wrap: true,      // Son slayttan sonra başa dönsün
				keyboard: true,
				ride: 'carousel' // Otomatik hareketi açıkça belirttik

			})
		})
		.catch(error => console.error('Hata:', error));


}
function myFunc2(){
	fetch("http://localhost:5500/popular")
	.then(res => res.json())
	.then(data => {
		const movie = data.results;
		console.log(movie)
		movie.forEach((film,index) => {
		if(index<18)
		{
		const populardiv= document.querySelector(".popular");
		const card = document.createElement("div");
		card.classList.add("card")
		card.classList.add("text-bg-dark")
		const img = document.createElement("img");
		img.classList.add("card-img");
		img.setAttribute("src",`https://image.tmdb.org/t/p/w500/${film.poster_path}`);
		const card_img_overlay = document.createElement("div");
		card_img_overlay.classList.add("card-img-overlay");

		card_img_overlay.innerHTML=`
		<h6 class="card-title">${film.title}</h6>
		<p class="card-text">${film.vote_average.toFixed(1)}</br>puan</p>
		`
		card.appendChild(img);
		card.appendChild(card_img_overlay);
		populardiv.appendChild(card)
		}
		})
	})
}
document.addEventListener("DOMContentLoaded", myFunc1)
document.addEventListener("DOMContentLoaded", myFunc1_1)
document.addEventListener("DOMContentLoaded", myFunc2)
//function myFunc() {
//	fetch("http://localhost:5500/popular")
//		.then(res => res.json())
//		.then(data => {
//			console.log(data);
//			const carousel_example = document.getElementById('carouselExample')
//			const carousel = document.querySelector('.carousel-inner');
//			const movie = data.results;
//			movie.forEach((film, index) => {
//				const item = document.createElement('div');
//				item.classList.add('carousel-item');
//				if (index == 0) {
//					item.classList.add('active');
//				}
//				const img = document.createElement('img');
//				img.setAttribute("src", `https://image.tmdb.org/t/p/w500/${film.poster_path}`)
//				img.classList.add('d-block')
//				img.classList.add('w-100')

//				item.appendChild(img);
//				carousel.appendChild(item);
//			});

//			const carouselInstance = new bootstrap.Carousel(carousel_example, {
//				interval: 2000,  // 2 saniyede bir değişsin
//				wrap: true,      // Son slayttan sonra başa dönsün
//				keyboard: true,
//				ride: 'carousel' // Otomatik hareketi açıkça belirttik

//			})
			
//		})
//		.catch(error => console.error('Hata:', error));


//}