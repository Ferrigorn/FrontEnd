import "./CardsPokemon.css"

export const cardsPokemon= (data)=>{

    document.getElementById("galleryPokemon").innerHTML = "";
    data.map((pokemon)=>{
        const height= (pokemon.height * 0.1);
        const heightRound = height.toFixed(1);
        const weight = (pokemon.weight * 0.1);
        const weightRound = weight.toFixed(1);
        const classCustomType = `"figurePokemon ${pokemon.type[0].type.name}"`;
        const templateFigure = `<figure class=${classCustomType}>
        <img src=${pokemon.imagen} alt=${pokemon.name} />
        <h2>${pokemon.name}</h2>
        <h2>Altura : ${heightRound} m </h2>
        <h2>Peso : ${weightRound} Kg</h2>
        <h2>HP : ${pokemon.hpInicial}</h2>
        </figure>`;
        document.getElementById("galleryPokemon").innerHTML += templateFigure;
    })
}