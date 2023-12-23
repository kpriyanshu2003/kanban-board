const fetchData = async () => {
  try {
    const response = await fetch(
      "https://tfyincvdrafxe7ut2ziwuhe5cm0xvsdu.lambda-url.ap-south-1.on.aws/ticketAndUsers"
    );
    const data = await response.json();
    return data;
  } catch (error) {
    console.error("Error fetching data:", error);
    throw error;
  }
};

const refreshDataEvery10Minutes = (setData) => {
  const intervalId = setInterval(async () => {
    try {
      const data = await fetchData();
      setData(data);
    } catch (error) {
      console.error("Error refreshing data:", error);
    }
  }, 10 * 60 * 1000);
  return intervalId;
};

export { fetchData, refreshDataEvery10Minutes };
