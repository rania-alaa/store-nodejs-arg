var fs = require('fs');
var path = require('path');

var fun = process.argv.splice(2)
switch (fun[0]) {
   case 'add':
     add(fun[1],fun[2]);
     break;
   case 'list':
     list();
     break;
   case 'get':
     get(fun[1]);
     break;
   case 'remove':
     remove(fun[1]);
     break;
   case 'clear':
     clear();
     break;
 }
 function add(mykey, myvalue){
   var dicts = [];
   var dictAsJSON = fs.readFileSync(path.join(__dirname,"db.db")).toString()
   if (dictAsJSON != "") {
        dicts = JSON.parse(dictAsJSON);
   }
   dicts.push({
     key: mykey ,
     value: myvalue
   });
   fs.writeFileSync(path.join(__dirname,"db.db"),JSON.stringify(dicts))
   console.log("done adding");
 }
 function list(){
   var dictAsJSON = fs.readFileSync(path.join(__dirname,"db.db")).toString()
   if (dictAsJSON == "") {
         return "No Keys "
   }
   else {
     var dicts = JSON.parse(dictAsJSON);
     console.log("the avalible key and values:");
     console.log(dicts);
   }
 }
 function get(mykey){
   var selecteddict = "no such dictionary" ;
   var dictAsJSON = fs.readFileSync(path.join(__dirname,"db.db")).toString()
   if (dictAsJSON == "") {
     console.log("No Keys avalible to get it, please add a key first ");
   }
   else {
     var dicts = JSON.parse(dictAsJSON);
     dicts.forEach(function(dict) {
       if (dict.key == mykey) {
         selecteddict = dict
       }
     });
   }
    console.log(selecteddict);
 }
 function remove(mykey){
   var selecteddict ;
   var dictAsJSON = fs.readFileSync(path.join(__dirname,"db.db")).toString()
   if (dictAsJSON == "") {
     return "No Keys avalible to remove it, please add a key first "
   }
   else{
     var dicts = JSON.parse(dictAsJSON);
     dicts.forEach(function(dict) {
       if (dict.key == mykey) {
         selecteddict = dict
         var index= dicts.indexOf(selecteddict)
         dicts.splice(index,1)
         fs.writeFileSync(path.join(__dirname,"db.db"),JSON.stringify(dicts))
         selecteddict = selecteddict.key +" key removed" ;
       }
       else {
         selecteddict = "no such dictionary" ;
       }
     });
   }
    console.log(selecteddict);
 }
 function clear(){
   var cler = "" ;
         fs.writeFileSync(path.join(__dirname,"db.db"),cler)
         var dictAsJSON = fs.readFileSync(path.join(__dirname,"db.db")).toString()
         console.log("cleared");
 }
