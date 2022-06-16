## Admetricks Challenge.
Capture and extract data from Internet (:

# The implemented solution
***
After analyzing the proposed problem I decided that this challenge will be solved with **Node.js** using a **headless browser** to navigate into the 
content of the **instructions url's** and then, **get elements with the data requested** (needing CSS selectors of the page content).

Finally, **export data and take screenshots.**

In the first challenge (**songs.js**) I found messy data, i.e. raw data obtained from the web, so my implementation is based on an extracting process. It gets elements with the data requested (song and author) following this example order::

    Song: 'This is a song for Miss Hedy LamarrJeffBeck, Johnny Depp'
    Author: 'Jeff Beck, Johnny Depp'

And I designed a function to **separate author details of Song str.**

    let separateData = (allText, author) => {
                        let song = allText.split(/(?=[A-Z])/); 
                        author = author.split(/(?=[A-Z])/);
                        song = song.slice(0, -(author.length)); 
                        return song.toString().replaceAll(',',"");
    }
    
In the second challenge (**stories.js**) the DOM content (of instructions url) **never** loaded the elements that contain the data requested. So we need to visit the iframe's href to get the elements that contain the stories data.

To convert the img src into MD5, I used **native javascript.**

# How to run?
***
First of all, you need **to verify that you have nodeJs +8 installed.**

    node -v

If you don't have nodejs installed, you need to navigate to https://nodejs.org and follows the steps of installation.

So when you have installed nodeJs, you need **to check that you have installed npm.**

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



