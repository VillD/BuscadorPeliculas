import { useMemo, useRef, useState } from 'react'
import { searchMovies } from '../services/movies'

export function useMovies({ sort }) {
	const [movies, setMovies] = useState([])
	const [loading, setLoading] = useState(false)
	const [error, setError] = useState(null)

	//Inicializamos una variable en useRef()
	const previosSearch = useRef()

	const getMovies = useMemo(() => {
		return async ({ inputText }) => {
			if (inputText == previosSearch.current) return

			try {
				setLoading(true)
				setError(null)
				const newMovies = await searchMovies({ inputText })

				//Igualamos al valor y obtenemos su referencia para que no vuelva a renderizar la busqueda
				previosSearch.current = inputText
				setMovies(newMovies)
			} catch (e) {
				setError(e.message)
			} finally {
				setLoading(false)
			}
		}
	}, [])

	// const getSortedMovies = () => {
	// 	console.log('getSortedMovies')
	// 	const sortedMovies = sort
	// 		? [...movies].sort((a, b) => a.title.localeCompare(b.title))
	// 		: movies
	// 	return sortedMovies
	// }

	const sortedMovies = useMemo(() => {
		console.log('Sorted movies')
		return sort
			? [...movies].sort((a, b) => a.title.localeCompare(b.title))
			: movies
	}, [sort, movies])

	// console.log({ render: sortedMovies })
	return { movies: sortedMovies, getMovies, loading }
}
