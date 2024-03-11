import '../App.css'

export function ListMovies({ movies }) {
	return (
		<>
			<ul className='movies'>
				{movies.map((movie) => {
					return (
						<li key={movie.id} className='movie'>
							<h3>{movie.title}</h3>
							<p>{movie.year}</p>
							<img src={movie.poster} alt={movie.title} />
						</li>
					)
				})}
			</ul>
		</>
	)
}

export function NoMoviesResults() {
	return (
		<>
			<p style={{ textAlign: 'center' }}>No se encontraron resultados</p>
		</>
	)
}
