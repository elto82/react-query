import { useQuery } from "@tanstack/react-query"

const getRandomNumberFromApi = async (): Promise<number> => {
  try {
    const res = await fetch("https://www.random.org/integers/?num=1&min=1&max=500&col=1&base=10&format=plain&rnd=new");
    return +await res.text();
  } catch (error) {
    throw new Error("Ocurrió un error al obtener el número aleatorio");
  }
};



export const useRandom = () => {
  const query = useQuery(
    ["random-number"],
    getRandomNumberFromApi,
  )


  return query
}

