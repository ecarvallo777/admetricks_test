const puppeteer = require('puppeteer'); // Import Puppeteer library.
const ObjectsToCsv = require('objects-to-csv'); // Import objects-to-csv library.


function run () {
    return new Promise(async (resolve, reject) => { 
        try {
            const browser = await puppeteer.launch(); // new headless browser instance.
            const page = await browser.newPage(); // open a new tab.
            await page.goto("https://www.musica.com/letras.asp?letras=novedades"); // go to url.

            //get the list 
            let getSongs = await page.evaluate(() => {
                let separateString = (allText, autor) => {
                    //Alltext example: Quiero SerDanny Santillán
                    //autor example: Danny Santillán

                    let name = allText.split(/(?=[A-Z])/); // Split all uppercase words.
                    //name example: ['Quiero', 'Ser', 'Danny', 'Santillán']

                    autor = autor.split(/(?=[A-Z])/); // Split all autor words.
                    //autor example: ['Danny', 'Santillán']

                    name = name.slice(0, -(autor.length)); // Delete autor properties of name array.
                    //name example: ['Quiero', 'Ser']

                    return name.toString().replaceAll(',',"") //return name of the song.
                    //Convert name array to string and delete ',' auto-generated by toString() function and return.

                }

                let items = document.querySelectorAll('article ul.listado-letras li > a'); // get all elements that contains songs info. (lyrics url, autor and name).
                
                let data = []; // array to store data.
    
                //Iterate through each element.

                items.forEach(item => {
                    
                    data.push({
                        autor : item.querySelector('.info-letra p').innerHTML, // save autor.
                        name :  separateString(item.querySelector('.info-letra').textContent, item.querySelector('.info-letra p').innerHTML), // save name of the song. 
                    });
                });

                return data // send data to export.
            });
            let exportData = async (data) => {
                const csv = new ObjectsToCsv(data);
                await csv.toDisk('./assets/csv/songs.csv'); // export data to csv.
                
                browser.close(); // Close headless browser.
                return;

            }

            return resolve(exportData(getSongs));

        } catch (e) {
            return reject(e);
        }
    })
}
run().then('Search into assets folder :).', console.error);