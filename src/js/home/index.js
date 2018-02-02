require('./index.css')
console.log('this is home page!')
export default class Home{
   constructor() {
       this.show();
   };  
   show(){
       $("#home").show();
       $("#live").hide();
   };
   hide(){
       $("#home").hide();
       $("#live").show();
   }
}
