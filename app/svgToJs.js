const path = require('path');
const fs = require('fs-extra');
const svgson = require('svgson');

/**
 * Convert SVG file into JS file
 * 
 * @param {string} dir - Name of directory
 * @param {string} file - Name of SVG file
 */
const svgToJs = (dir, file) => {
  const svgFile = path.join(dir, file);
  const jsFile = path.join(dir, 'index.js');

  if (fs.existsSync(jsFile)) {
    console.log(`File ${jsFile} already exists`);
    return
  }

  fs.readFile(svgFile, 'utf8', (err, data) => {
    if (err) {
      console.error(`Unable to read file ${svgFile}`, err);
      return
    }
    console.log(`Parsing file ${svgFile}`);
    svgson.parse(data)
      .then(json => {
        const obj = {
            label: json.attributes['aria-label'],
            viewBox: json.attributes.viewBox,
            width: json.attributes.width,
            height: json.attributes.height,
            centerX: json.attributes.centerX,
            centerY: json.attributes.centerY,
            locations: json.children
                .filter(child => {
                    if (child.name !== 'path' && child.name !== 'polygon') {
                        console.warn(`<${child.name}> tag will be ignored`);
                        return false;
                    }
                    return true;
                })
                .map(child => {
                    let childData = {
                        name: child.attributes.name,
                        id: child.attributes.id,
                        type: child.name,
                        area: child.attributes.type,
                        bengali: child.attributes.bengali,
                    };

                    if(child.name == 'path'){
                        childData.path = child.attributes.d;
                    }else{
                        childData.path = child.attributes.points;
                    }

                    return childData;
                })
        };
        const js = `export default ${JSON.stringify(obj)}`;

        console.log(`Writing file ${jsFile}`);
        fs.writeFile(jsFile, js, 'utf8', err => {
          if (err) {
            console.error(`Unable to write file ${jsFile}`, err);
            return;
          }
        })
      }).catch(err => {
        console.error(`Unable ton parse file ${svgFile}`, err)
      });
  })
};

const workingDir = path.join(__dirname, '../public/svg');
const exportDir = path.join(__dirname, '../resources/assets/js/maps');

// Read packages directory
fs.readdir(workingDir, (err, maps) => {
  if (err) {
    console.log('Unable to scan maps directory', err);
    return;
  }

  maps.forEach((map) => {
      if (path.extname(map) === '.svg') {
          var dirName = path.parse(map).name;
          var mapDir = path.join(exportDir, dirName);

          !fs.existsSync(mapDir) && fs.mkdirSync(mapDir);

          //fs.createReadStream(path.join(workingDir, map)).pipe(fs.createWriteStream(path.join(mapDir, map)));
          // Async with promises:
          fs.copy(path.join(workingDir, map), path.join(mapDir, map))
              .then(() => svgToJs(mapDir, map))
              .catch(err => console.error(err));

      }
  })
});





