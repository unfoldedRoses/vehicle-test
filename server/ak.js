const fs = require('fs');
const path = require('path');

function printTree(directoryPath, prefix = '') {
  const items = fs.readdirSync(directoryPath);

  items.forEach((item, index) => {
    const fullPath = path.join(directoryPath, item);
    const isLast = index === items.length - 1;
    const isDirectory = fs.lstatSync(fullPath).isDirectory();

    console.log(`${prefix}${isLast ? '└── ' : '├── '}${item}`);

    // If the item is a directory, go one level deeper
    if (isDirectory) {
      const subItems = fs.readdirSync(fullPath).slice(0, 5); // Limit to 5 items for brevity
      subItems.forEach((subItem, subIndex) => {
        console.log(
          `${prefix}${isLast ? '    ' : '│   '}${subIndex === subItems.length - 1 ? '└── ' : '├── '}${subItem}`
        );
      });
    }
  });
}


const targetDirectory = './';
console.log(targetDirectory);
printTree(targetDirectory);
