// import * as React from 'react'
// import { useQueries, UseQueryOptions } from 'react-query'

// function App() {
//   type Artist = { name: string }

//   const fetchArtist = (artistId: string): Artist[] => {
//     return []
//   }

//   const useArtists = (artistIds: string[]) => {
//     return useQueries(
//       artistIds.map<UseQueryOptions<Artist[], Error>>((artistId) => {
//         return {
//           queryKey: ['artists', artistId],
//           queryFn: () => fetchArtist(artistId),
//           staleTime: Infinity,
//         }
//       })
//     )
//   }

//   const artist = useArtists([])

//   return (
//     <div>
//       <h1>Hello StackBlitz!</h1>
//       <p>{JSON.stringify(artist)}</p>
//     </div>
//   )
// }
