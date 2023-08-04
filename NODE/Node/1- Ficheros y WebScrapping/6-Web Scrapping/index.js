const puppeteer = require("puppeteer")
const mongoose = require("mongoose")

const Carritos = mongoose.model("Carritos", new mongoose.Schema({
    title: String,
    price: String
}))

const connect = async () => {
    try {
        const URI = "mongodb+srv://fbabures:independencia1987@ferrigorn.qvh0fa4.mongodb.net/?retryWrites=true&w=majority"
        await mongoose.connect(URI, { useNewUrlParser: true, useUnifiedTopology: true })
        console.log("conectado con DB 👌")

    } catch (error) {
        console.error("No te has podido conectar a DB 😢")
    }
}

const scrapeProducts = async () => {
    await connect()

    const url = "https://www.bugaboo.com/es-es"

    const browser = await puppeteer.launch({
        headless: false,
        defaultViewport: null,
        args: ["--start-maximized"]
    })

    const page = await browser.newPage()
    
    await page.goto(url)

    await page.type(".header__right-search-icon", "carritos")

    await page.click("")

    await page.waitForSelector(".search-results__next-button")

    const title = await page.$$eval(".product-tile__title", (nodes) =>
        nodes.map((n) => n.innerText)
    )

    const price = await page.$$eval(".price__value", (nodes) =>
        nodes.map((n) => n.innerText)
    )

    const bugabooProduct = title.map((value, index) => {
        return {
            title: title[index],
            price: price[index]
        }
    })

    bugabooProduct.map(async (data) => {
        const dataSchema = new Carritos(data)
        try {
            await dataSchema.save()
            console.log(`Succesfully saved ${dataSchema.title} to the dataBase 🙌`)
        } catch (error) {
            console.error(`Failed to save ${dataSchema.title} to the dataBase 💩`)
        }
    })

    await browser.close()
    console.log(`Yuhuuu todo guardado ✔`)
}

scrapeProducts()