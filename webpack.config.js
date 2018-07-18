/**
 * 'pdf.worker': 'pdfjs-dist/build/pdf.worker.entry'
 * @disc:rc-tools webpack extension
 * @author:yanxinaliang
 * @time：2018/7/18 8:56
 */
const webpack = require('webpack');
module.exports=function(webpackConfig) {
    // 支持iconfont字体库[`./examples/${file}`]
    // webpackConfig.entry["vender"]="pdfjs-dist/build/pdf.worker.js";
    webpackConfig.module.rules.unshift({
        test: /\S*icon\S*.(svg|eot|ttf|woff)$/,
        loader: 'file',
    });
    webpackConfig.module.rules.unshift({
        test:/\.worker\.js$/,
        use: { loader: 'worker-loader',options: { name: 'examples/[hash].worker.js',publicPath:"../"}}
    });
    webpackConfig.module.rules.push({
        test: /.pdf$/,
        use: { loader: 'file-loader',options: { name: 'examples/[hash].pdf',publicPath:"../"}}
    });
/*    webpackConfig.plugins.push(new webpack.optimize.CommonsChunkPlugin({
        name: 'vender',
        filename: 'examples/test.js',
    }));*/
    return webpackConfig;
};