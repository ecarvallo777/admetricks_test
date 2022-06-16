## Admetricks Challenge.
Capture and extract data from Internet (:

# The implemented solution
***
The robot decided that this challenge will be developed with **Node.js** using a **headless browser** to navigate into the 
content of the **instructions url's** and then, **get elements with the data requested** (using CSS selectors).

Finally, **export data and take screenshots.**

In addition, the robot found with some difficulties to save messy data. In the first challenge (**songs.js**), he gets 
elements with the data requested (song and autor) in this example order:

    Song: 'This is a song for Miss Hedy LamarrJeffBeck, Johnny Depp'
    Autor: 'Jeff Beck, Johnny Depp'

And he designed a function to **separate autor details of Song str.**

    let separateData = (allText, autor) => {
                        let song = allText.split(/(?=[A-Z])/); 
                        autor = autor.split(/(?=[A-Z])/);
                        song = song.slice(0, -(autor.length)); 
                        return song.toString().replaceAll(',',"");
    }
    
In the second challenge (**stories.js**), the DOM content (of instructions url) **never** loaded the elements that contains the data requested. Then, he visited the iframe's href to get the elements that contains the stories data.

To convert the img src into MD5, he used **native javascript.**

# How to run?
***
First of all, you need **to verify that you have nodeJs +8 installed.**

    node -v

If you don't have nodejs installed, you need to navigate to https://nodejs.org and follows the steps of installation.

Then, when you have installed nodeJs, you need **to check that you have installed npm.**

    npm -v

Now, **you need to download some libraries.**

**puppeteer:** A high-level API to control chrome over the devTools protocols. https://pptr.dev/.

    npm i puppeteer 
    
**objects-to-csv:** A library that allows convert arrays of objects into csv files. https://www.npmjs.com/package/objects-to-csv.

    npm i objects-to-csv 

***

At that time, you have all of things that you need **to start the project.**

**To run the first challenge,** please stay in the **root folder** and type this command:

    node songs.js 

**To run the second challenge,** please stay in the **root folder** and type this command:

    node stories.js



