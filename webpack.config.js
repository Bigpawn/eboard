/**
 * 'pdf.worker': 'pdfjs-dist/build/pdf.worker.entry'
 * @disc:rc-tools webpack extension
 * @author:yanxinaliang
 * @time：2018/7/18 8:56
 */
const path=require("path");

module.exports=function(webpackConfig) {
    // 修改svg loader
    webpackConfig.module.rules.forEach((rule)=>{
        if("svg-sprite"===rule.loader){
            rule.test=/^(?!.*icon).*\.svg$/
        }
    });
    webpackConfig.module.rules.unshift({
        test: /\S*icon\S*.svg$/,
        use: { loader: 'url-loader',options:{name: 'examples/[hash].[ext]',publicPath:"../",limit:10000}},
    });
    webpackConfig.module.rules.unshift({
        test:/\.worker\.js$/,
        use: { loader: 'worker-loader',options: { name: 'examples/[hash].worker.js',publicPath:"../",inline: true}}
    });
    webpackConfig.module.rules.push({
        test: /.pdf$/,
        use: { loader: 'file-loader',options: { name: 'examples/[hash].pdf',publicPath:"../"}}
    });
    webpackConfig.module.rules.push({
        test: /.cur$/,
        use: { loader: 'file-loader',options: { name: 'examples/[hash].cur',publicPath:"../"}}
    });
    return webpackConfig;
};