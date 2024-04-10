const fetchData = async (url: string) => {
  try {
    const response = await fetch(url);
    return response.json();
  } catch (error) {
    console.error(`Error fetching data from ${url}:`, error);
    // Handle the error or rethrow if necessary
  }
};

export default fetchData;
