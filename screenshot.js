// capture.js

const puppeteer = require('puppeteer');

function sleep(ms) {
  return new Promise(resolve => setTimeout(resolve, ms));
}


const save_page = async (address, save_path, width, height) => {
  const browser = await puppeteer.launch();
  const page = await browser.newPage();
  page.setViewport({width: width, height: height})
  await page.goto(address, {waitUntil: 'networkidle2'});
  const tensorboard_tabs = await page.$$('tf-category-pane');
  // console.log('Number of tabs')
  // console.log(tensorboard_tabs.length)
  for (i = 0; i < tensorboard_tabs.length; i++) {
    const tensorboard_tab = tensorboard_tabs[i]
    const collapse = await tensorboard_tab.$('iron-collapse');
    if (collapse) {
      var style = await collapse.getProperty('style');
      style = await style.getProperty('max-height');
      style = await style.jsonValue();;
      if (style == '0px') {
        // console.log('click');
        await sleep(3000);
        await tensorboard_tab.click();
      }
    }
  }
  await sleep(5000);
  await page.screenshot({path: save_path});
  await browser.close();
};

if (process.argv.length < 6 || process.argv[2] == '-h' || process.argv[2] == '--help') {
  console.log('Usage: node screenshot.js url save_path width height');
  process.exit(0);
}
save_page(process.argv[2], 
          process.argv[3], 
          parseInt(process.argv[4]), 
          parseInt(process.argv[5])).catch((err) => (console.log(err)));
