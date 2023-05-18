// export default {
//     devServer:{
//         proxy:{
//             'api/':{
//                 target:'https://www.51tagger.com',
//                 changeOrigin:true
//             }
//         }
//     }
// }
const test =require('./data/test.json');//引入test.json
const path=require('path')
module.exports = {
    devServer:{
        host:'loacalhost',
        proxy:{
            'api/':{
                target:'https://www.51tagger.com',
                changeOrigin:true
            }
        }
    },
    before(app){
        http://localhost:8081/test
        app.get('/test',(req,res)=>{
            res.json(test)
        })
    },
   configureWebpack:{
    resolve:{
        alias:{
            
        }
    }
   }
}

function resolve(arg0) {
    throw new Error('Function not implemented.');
}
