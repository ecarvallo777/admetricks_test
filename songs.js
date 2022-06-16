const puppeteer = require('puppeteer');
const ObjectsToCsv = require('objects-to-csv'); 

function run () {
    return new Promise(async (resolve, reject) => { 
        try {
            // Launch a headless browser, visit instructions url.
            const browser = await puppeteer.launch(); 
            const page = await browser.newPage(); 
            await page.goto("https://www.musica.com/letras.asp?letras=novedades");
            let getSongs = await page.evaluate(() => {
                // I find two ways to get the data requested:
                // [1] Clicking href's of each song and load +40 pages content or
                // [2] Get data without syntax and design a function to sort this.
                // I chose the second way.

                // Separate author data of song property.
                // song Str example: This is a Song for Miss Hedy LamarrJeff Beck, Johnny Depp.
                let separateData = (allText, author) => {
                    let song = allText.split(/(?=[A-Z])/); 
                    author = author.split(/(?=[A-Z])/);
                    song = song.slice(0, -(author.length)); 
                    return song.toString().replaceAll(',',"");
                }

                // get all elements that contains songs info and save that (song and author).
                let items = document.querySelectorAll('article ul.listado-letras li > a'); 
                let data = [];
                items.forEach(item => {
                    author = item.querySelector('.info-letra p').innerHTML
                    data.push({
                        song :  separateData(item.querySelector('.info-letra').textContent,
                                author),
                        author : author   
                    });
                });
                return data
            });

            let exportData = async (data) => {
                const csv = new ObjectsToCsv(data);
                await csv.toDisk('./assets/csv/songs.csv');
                browser.close();
                return 'Search into assets folder :).'
            }

            return resolve(exportData(getSongs));
        } catch (e) {
            return reject(e);
        }
    })
}
run().then(console.log, console.error);
