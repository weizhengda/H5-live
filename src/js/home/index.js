require('./index')
console.log('this is home page!')
export default class Home{
   constructor() {
       this.hiden();
   };
   
   show(){
       $("#home").hiden();
   };
   hiden(){
      $("#home").show();
   }
}
