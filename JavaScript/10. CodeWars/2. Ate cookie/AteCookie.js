 const cookie = (x) => {
  if(typeof x == "string"){
    console.log("who ate the last cookie? It was Zach!");
  }else if(typeof x == "number") {
    console.log("Who ate the cookie? It was Monica!");
  }else (console.log("who ate the cookie? It was the dog!"));
};

cookie("You");
cookie(25);
cookie()