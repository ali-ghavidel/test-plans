const allure = require('allure-commandline');

MediaSourceHandle.exports = (on,config) => {
    on('after:run',()=>{
        const allureResults = allure(['generate','allure-results','--clean']);
        allureResults.on('exit',(code)=>{
            console.log(`Allure report generated with exit code ${code}`)
        })
    })
}