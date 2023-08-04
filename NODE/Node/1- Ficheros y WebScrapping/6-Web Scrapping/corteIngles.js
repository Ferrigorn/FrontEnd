const puppeteer = require("puppeteer")
const mongoose = require("mongoose")

const Libros = mongoose.model("Libros", new mongoose.Schema({
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

    const url = "https://www.elcorteingles.es/libros"

    const browser = await puppeteer.launch({
        headless: false,
        defaultViewport: null,
        args: ["--start-maximized"]
    })

    const page = await browser.newPage()
    
    await page.goto(url)

    await page.type("#main_search", "novela historica")

    await page.click("#search-button")

    await page.waitForSelector("#pagination-next")

    const title = await page.$$eval(".plp_title_seo", (nodes) =>
        nodes.map((n) => n.innerText)
    )

    const price = await page.$$eval(".pricing js-preview-pricing", (nodes) =>
        nodes.map((n) => n.innerText)
    )

    const librosProduct = title.map((value, index) => {
        return {
            title: title[index],
            price: price[index]
        }
    })

    librosProduct.map(async (data) => {
        const dataSchema = new Libros(data)
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