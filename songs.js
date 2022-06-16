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
                // We find two ways to get the data requested:
                // Clicking href's of each song and load +40 pages content or
                // Get data without syntax and design a function to order this.

                // Separate autor data of song property.
                // song Str example: This is a Song for Miss Hedy LamarrJeff Beck, Johnny Depp.
                let separateData = (allText, autor) => {
                    let song = allText.split(/(?=[A-Z])/); 
                    autor = autor.split(/(?=[A-Z])/);
                    song = song.slice(0, -(autor.length)); 
                    return song.toString().replaceAll(',',"");
                }

                // get all elements that contains songs info and save that (song and autor).
                let items = document.querySelectorAll('article ul.listado-letras li > a'); 
                let data = [];
                items.forEach(item => {
                    autor = item.querySelector('.info-letra p').innerHTML
                    data.push({
                        song :  separateData(item.querySelector('.info-letra').textContent,
                                autor),
                        autor : autor   
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
