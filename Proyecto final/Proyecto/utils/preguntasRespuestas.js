export const preguntasQuiz = async () => {
    const optionsRequest = {
      method: "get",
      url: "https://opentdb.com/api.php?amount=10&type=multiple"
      ,
    };
  
     return await optionsRequest();
  
  };