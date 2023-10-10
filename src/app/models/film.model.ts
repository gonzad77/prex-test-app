export interface Film {
  id: string,
  title: string,
  description: string,
  stars: number,
  src: string,
  date: Date
}

const DefaultFilm = () => ({
  id: '',
  title: '',
  description: '',
  stars: 0,
  src: '',
  date: new Date()
} as Film);

export { DefaultFilm };