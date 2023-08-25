export const getAll = async () => {
    const character = await fetch("https://thronesapi.com/api/v2/Characters")
    const characterJson = await character.json()
    return characterJson
}

export const getById = async (id) => { //funcion asincrona para recibir el character por id (parametro) con promesa. Se podria realizar con axios tambien
    const uniqueCharacter = await fetch(`https://thronesapi.com/api/v2/Characters/${id}`)
    const uniqueCharacterJson = await uniqueCharacter.json()

    
    return uniqueCharacterJson;
}