/**
 * 'pdf.worker': 'pdfjs-dist/build/pdf.worker.entry'
 * @disc:rc-tools webpack extension
 * @author:yanxinaliang
 * @time：2018/7/18 8:56
 */
module.exports=function(webpackConfig) {
    // 修改svg loader
    webpackConfig.module.rules.forEach((rule)=>{
        if("svg-sprite"===rule.loader){
            rule.test=/^(?!.*icon).*\.svg$/
        }
    });
    
    webpackConfig.module.rules.unshift({
        test: /\S*icon\S*.(svg|eot|ttf|woff)$/,
        use: { loader: 'file-loader'},
    });
    webpackConfig.module.rules.unshift({
        test:/\.worker\.js$/,
        use: { loader: 'worker-loader',options: { name: 'examples/[hash].worker.js',publicPath:"../"}}
    });
    webpackConfig.module.rules.push({
        test: /.pdf$/,
        use: { loader: 'file-loader',options: { name: 'examples/[hash].pdf',publicPath:"../"}}
    });
    console.log(webpackConfig.module.rules);
    return webpackConfig;
};