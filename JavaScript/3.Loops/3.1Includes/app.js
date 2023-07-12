const products = ['Camiseta de Pokemon', 'Pantalón coquinero', 'Gorra de gansta', 'Camiseta de Basket', 'Cinrurón de Orión', 'AC/DC Camiseta']

for (const i in products) {
    let producteActual = products[i];
    if (producteActual.includes("Camiseta")){
        console.log(producteActual);
    }
   
}