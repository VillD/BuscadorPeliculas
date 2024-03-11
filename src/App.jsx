import { useEffect, useRef } from 'react'
import { NoMoviesResults, ListMovies } from './components/Movies'
import { useMovies } from './hooks/useMovies'
import { useState } from 'react'

/* 
function App() {
	const movies = responseMovies.Search
	const hasMovies = movies?.length > 0
	return (
		<>
			<header>
				<h1>Buscador de peliculas</h1>
				<form action='' className='form'>
					<input type='text' placeholder='Avngers, Start Wars, Marvel...' />
					<button type='submit'>Buscar</button>
				</form>
			</header>

			<main>Aqui iran los resultados</main>

			{
				// 1d3660f0
        //http://www.omdbapi.com/?apikey=1d3660f0&s=Avengers 
			}

			{hasMovies ? (
				<ul>
					{movies.map((movie) => {
						return (
							<li key={movie.imdbID}>
								<h3>{movie.Title}</h3>
								<p>{movie.Year}</p>
								<img src={movie.Poster} alt={movie.Title} />
							</li>
						)
					})}
				</ul>
			) : (
				<p>No se encontraron películas para esta busqueda</p>
			)}
		</>
	)
}
*/

function useSearch() {
	const inputRef = useRef()
	const [inputError, setInputError] = useState(null)
	const [inputText, setInputItext] = useState('')

	return { inputRef, inputError, inputText, setInputItext, setInputError }
}
function App() {
	const [sort, setSort] = useState(false)
	const { inputRef, inputError, inputText, setInputItext, setInputError } =
		useSearch()
	const { movies, loading, getMovies } = useMovies({ inputText, sort })
	const hasMovies = movies?.length > 0

	const handelSort = () => {
		setSort(!sort)
	}
	/*
	Controlada
	Una de las maneras que se puede recuperar el valor de un input y que se 
	pueda actualizar.
	*/

	const handleSubmit = (e) => {
		//Controlada - es la forma más rápido y más optima
		e.preventDefault()
		// const inputEl = inputRef.current
		// const value = inputEl.value
		getMovies({ inputText })
	}

	const otherHandleSubmit = (e) => {
		// No controlada - es la forma más rápido y más optima
		e.preventDefault()
		const filds = Object.fromEntries(new window.FormData(e.target))
		console.log(filds)
		getMovies()

		// Y asi si agregamos más input con el objeto FILDS se agregan automaticamente. Esto lo podemos destructurar para que sea más legible, pero con el nombre de cada name
	}

	/* 
	Controlada
	Realizamos la funcion que pueda recuperar el valor del input, si notamos 
	estamos pasando el evento por parametros, para que recupere el valor del 
	target.
	*/
	const handleChange = (e) => {
		const value = e.target.value
		setInputItext(value)
		if (inputText == '') {
			setInputError('No se puede buscar una pelicula vacia')
			return
		}
		setInputError(null)
	}

	//Mejores practicas para no estar atado al contrato de la API

	return (
		<>
			<header>
				<h1>Buscador de peliculas</h1>
				<form action='' onSubmit={handleSubmit} className='form'>
					<input
						// Agregamos como (referencia el input) nuestro useRef()
						// ref={inputRef}
						/*  
						Hacemos que detecte el cambio del teclado
						Le ponemos el valor por defecto que queremos dar 
						*/
						onChange={handleChange}
						value={inputText}
						type='text'
						name='input1'
						placeholder='Avngers, Start Wars, Marvel...'
					/>
					<input type='checkbox' onChange={handelSort} checked={sort}></input>

					<button type='submit'>Buscar</button>
				</form>
				{inputError && <p style={{ textAlign: 'center' }}>{inputError}</p>}
			</header>

			<main>
				{loading ? (
					<p>Cargando...</p>
				) : hasMovies ? (
					<ListMovies movies={movies} />
				) : (
					<NoMoviesResults />
				)}
			</main>
			{/*
        1d3660f0
        http://www.omdbapi.com/?apikey=1d3660f0&s=Avengers

      */}
		</>
	)
}

export default App
