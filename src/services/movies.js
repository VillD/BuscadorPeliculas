const API_KEY = '1d3660f0&s'

export const searchMovies = async ({ inputText }) => {
	if (inputText == '') return null

	try {
		const response = await fetch(
			//http://www.omdbapi.com/?apikey=1d3660f0&s=Avengers
			`https://www.omdbapi.com/?apikey=${API_KEY}=${inputText}`
		)
		const json = await response.json()
		const movies = json.Search

		return movies?.map((movie) => ({
			id: movie.imdbID,
			title: movie.Title,
			year: movie.Year,
			poster: movie.Poster,
		}))
	} catch (e) {
		throw new Error('Error searching movies')
	}
}
