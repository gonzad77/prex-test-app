export interface Film {
  _id: string,
  title: string,
  description: string,
  stars: number,
  src: string,
  date: Date
}

const DefaultFilm = () => ({
  _id: '',
  title: '',
  description: '',
  stars: 0,
  src: '',
  date: new Date()
} as Film);

export { DefaultFilm };