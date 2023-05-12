# Scratch-GUI
Scratch's GUI includes the blocks, the stage (or renderer), and the code area where the blocks are placed.

# Important Things to Note
The way we got scratch into the site was by following the directions to get scratch running in isolation (https://github.com/scratchfoundation/scratch-gui): 
```
$ git clone https://github.com/LLK/scratch-gui.git
$ cd scratch-gui
$ npm install
```

## To run in the browser at http://localhost:8601/:
```
$ npm start
```

We then pulled our project files into a directory inside the same root directory for this kind of structure:
```
kansratch-gui # root directory
-- backend
-- documentation
-- frontend
-- scratch-gui # scratch's repo
```

A component containing the scratch-gui (ScratchEditor) was then created by using an IFrame of the 8601 port. Then the component was placed on a page with the url address of "scratch/editor" (in the `index.js`). The `projectDetails.js` then redirects to this url address when the user clicks the "See Inside" button.

# Our Struggle
It took a while for us to get this part of the system working. To save from further head ache for future developers we have documented below the things we have attempted, and the struggles we have encountered while developing this part of the site:
1. Embedding Scratch in an existing site is very complicated and confusing
    - We tried the `npm install` route, and just ended up with a bunch of errors with dependencies (scratch uses an old version of React for starters), and a bunch of failing static files. 
2. Scratch is bloated
    - It would often crash, and there was a big memory leak that was caused by trying to embed the scratch-gui into our existing KanScratch site.
3. Scratch disallows putting their editor into an IFrame (they only allow using an IFrame on a project to play it, but not to actually see the code behind the project)
    - We tried just slapping scratch into KanScratch using an IFrame for open house, but quickly found out that they don't allow you to do this (it would have been hard to make modifications to the scratch-gui anyway if we went down this route, but figured it would still be good information to share). https://developer.mozilla.org/en-US/docs/Web/HTTP/Headers/X-Frame-Options
