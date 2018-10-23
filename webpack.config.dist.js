/**
 * 'pdf.worker': 'pdfjs-dist/build/pdf.worker.entry'
 * @disc:rc-tools webpack extension
 * @author:yanxinaliang
 * @time：2018/7/18 8:56
 */
const path=require("path");
const cwd = process.cwd();


module.exports=function(webpackConfig,options) {
    // 修改svg loader
    webpackConfig.module.rules.forEach((rule)=>{
        if("svg-sprite"===rule.loader){
            rule.test=/^(?!.*icon).*\.svg$/
        }
    });
    webpackConfig.module.rules.unshift({
        test: /\S*icon\S*.svg$/,
        use: { loader: 'url-loader',options:{name: '[hash].[ext]',publicPath:"../",limit:10000}},
    });
    webpackConfig.module.rules.unshift({
        test:/\.worker\.js$/,
        use: { loader: 'worker-loader',options: { name: '[hash].worker.js',publicPath:"../",inline: true}}
    });
    webpackConfig.module.rules.push({
        test: /.pdf$/,
        use: { loader: 'file-loader',options: { name: '[hash].pdf',publicPath:"../"}}
    });
    webpackConfig.entry=["src/EBoard.ts"];
    webpackConfig.output.path=path.join(cwd, 'dist/');
    return webpackConfig;
};