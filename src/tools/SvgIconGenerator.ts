/*
 * @Author: Liheng (liheeng@gmail.com)
 * @Date: 2018-05-28 11:32:55
 * @Last Modified by: Liheng (liheeng@gmail.com)
 * @Last Modified time: 2018-05-28 11:34:42
 */
const generator = require('typescript-react-svg-icon-generator');

const config = {
    svgDir: '../assets/svg/',
    destination: '../src/components/icon/index.tsx'
};

generator(config);