const puppeteer = require("puppeteer")
const mongoose = require("mongoose")

const Data = mongoose.model("Data", new mongoose.Schema({
    title: String,
    price: String
}))

const connect = async () => {
    try{
        const URI = "mongodb+srv://fbabures:independencia1987@ferrigorn.qvh0fa4.mongodb.net/?retryWrites=true&w=majority"
        await mongoose.connect(URI, {useNewUrlParser: true, useUnifiedTopology: true })
        console.log("Connected to DB")
    } catch (error) {
        console.log("No conectado😢")
    }
}

const scrapeProducts = async () => {
    await connect()

    const url = "https://www.amazon.es/"

    const browser = await puppeteer.launch({
        headless: false,
        defaultViewport: null,
        args: ["--start-maximized"]
    })

    const page = await browser.newPage()

    await page.goto(url)

    await page.type("#twotabsearchtextbox", "star wars")

    await page.click("#nav-search-submit-button")

    await page.waitForSelector(".s-pagination-next")

    const title = await page.$$eval('h2 span.a-color-base', (nodes)=>
    nodes.map((n) => n.innerText)
    )

    const price = await page.$$eval('span.a-price[data-a-color="base"] span.a-offscreen', (nodes)=>
    nodes.map((n) => n.innerText)
    )

    const amazonProduct = title.map((value, index) => {
        console.log(value);
        return {
            title: title[index],
            price: price[index]
        }
    })

    amazonProduct.map(async (data) => {
        console.log(data)
        const dataSchema = new Data(data)
        try {
            await dataSchema.save()
            console.log(`Succesfully saved ${dataSchema.title} to database 👌 `)
        } catch (error) {
            console.log(`Failed to save ${dataSchema.title} to the database 😣`)
        }
    })
    
    await browser.close()
    console.log("Todo guardado perfectamente 👏👏")
}

scrapeProducts()