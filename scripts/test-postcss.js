const postcss = require('postcss');
const fs = require('fs');
const cfg = require('../postcss.config.cjs');

(async()=>{
  const css = fs.readFileSync('src/index.css','utf8');
  // build plugin array from config object
  const plugins = [];
  for (const [name, opts] of Object.entries(cfg.plugins)) {
    plugins.push(require(name)(opts));
  }
  const result = await postcss(plugins).process(css,{from: 'src/index.css'});
  console.log(result.css.slice(0,500));
})();