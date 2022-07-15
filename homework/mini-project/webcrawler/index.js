import { Starbucks } from "./models/starbucks.model.js"

import puppeteer from "puppeteer";
import mongoose from "mongoose";

// 몽고DB 접속!!
await mongoose.connect("mongodb://localhost:27017/miniproject")

async function startCrawling(){
    const browser = await puppeteer.launch({ headless: false });
    const page = await browser.newPage();
    await page.setViewport({ width: 1280, height: 720 });
    await page.goto("https://www.starbucks.co.kr/menu/drink_list.do");
    await page.waitForTimeout(1000);

    const espressoImgs = await page.$$eval('.product_espresso img[src]', imgs => imgs.map(img => img.getAttribute('src')));
    const espressoCoffees = await page.$$eval('.product_espresso img[alt]', coffees => coffees.map(coffee => coffee.getAttribute('alt')));
    
    for( let i=0; i<espressoImgs.length; i++){
        Starbucks.create({
            name: espressoCoffees[i],
            img: espressoImgs[i]
        });
    }
    
    // const coldBrewImgs = await page.$$eval('.product_cold_brew img[src]', imgs => imgs.map(img => img.getAttribute('src')));
    // const coldBrewCoffees = await page.$$eval('.product_cold_brew img[alt]', coffees => coffees.map(coffee => coffee.getAttribute('alt')));

    // const frappuccinoImgs = await page.$$eval('.product_frappuccino img[src]', imgs => imgs.map(img => img.getAttribute('src')));
    // const frappuccinoCoffees = await page.$$eval('.product_frappuccino img[alt]', coffees => coffees.map(coffee => coffee.getAttribute('alt')));



    await browser.close()

}

startCrawling();