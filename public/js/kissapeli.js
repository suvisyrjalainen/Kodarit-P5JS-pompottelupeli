let taustakuva;
let kissakuva;
let lautanY = 350;
let lautan_leveys = 80;
let taustan_korkeus = 400;
let taustan_leveys = 800;

var kissalista = [];
var elamia_jaljella = 9;
var pisteet = 0;

var kissatimer;

function preload() {
  //taustakuva = loadImage('https://igno.cc/opetus/kuvat/tausta.png');
  //kissakuva = loadImage('https://igno.cc/opetus/kuvat/cat.png');
  taustakuva = loadImage('images/tausta.png');
  kissakuva = loadImage('images/robotti.png');
}

function setup() {
  var canvas = createCanvas(windowWidth, windowWidth / 3);
  canvas.parent("kissapeli");

  angleMode(DEGREES);

}

function draw() {
  background('white');
  image(taustakuva, 0, 0, windowWidth, windowWidth / 3);
  luo_lautta(windowWidth);

  kissalista.forEach(function(kissa_olio, monesko) {
      kissa_olio.liikuta(windowWidth);
      if(kissa_olio.Y > windowWidth / 3){
        kissalista.splice(monesko, 1);
        elamia_jaljella = elamia_jaljella - 1;
      }
      if(kissa_olio.X > windowWidth){
        kissalista.splice(monesko, 1);
        pisteet = pisteet + 1;
        console.log("pisteet: " + pisteet);
      }
      textSize(32);
      text('Elämiä jäljellä: ' + elamia_jaljella + '   Pisteet: ' + pisteet, 10, 30);
      if(elamia_jaljella == 0){
        gameOver();
      }

  });
}

function windowResized() {
  resizeCanvas(windowWidth, windowWidth / 3);
}

function pelaa(){
  kissalista = [];
  pisteet = 0;
  elamia_jaljella = 9;
  clearTimeout(kissatimer);
  loop();
  luo_kissoja();
}

function gameOver(){
  noLoop();
  push();
  fill('white');
  textSize(50);
  textAlign(CENTER);
  text('GAME OVER', windowWidth / 2, windowWidth / 3 / 2);
  pop();
}


function luo_lautta(windowWidth){
   fill('#85adad');
   rect(mouseX, windowWidth / 3 - 50, lautan_leveys, 30, 20, 20, 0, 0);
   fill('black');
   ellipse(mouseX + 10, windowWidth / 3 - 50 + 30, 15, 15)
   ellipse(mouseX + lautan_leveys - 10, windowWidth / 3 - 50 + 30, 15, 15)
}

function luo_kissoja() {             // luo kissoja:
    let uusi_kisu = new Kissa();          // luodaan uusi kissa
    kissalista.unshift(uusi_kisu);        // ja lisätään se kissalistan alkuun
    kissatimer = setTimeout(luo_kissoja, 2000);      // ja luodaan uusi kissa tauon jälkeen
}


class Kissa{
   constructor(){
     this.X = 30;
     this.Y = 200;
     this.Xnopeus = random(2, 4);
     this.Ynopeus = random(-2, -4);; //lähetetään ylöspäin
     this.korkeus = 60;
     this.leveys = 60;
     this.kulma = 0;
   }
   liikuta(windowWidth){
     this.X = this.X + this.Xnopeus;
     this.Ynopeus = this.Ynopeus + 0.05; //painovoima

     if(this.Y + this.korkeus / 2 > windowWidth / 3 - 50){
       if(this.X > mouseX && this.X < mouseX + lautan_leveys){
        this.Ynopeus = -abs(this.Ynopeus);
      }
     }

     this.Y = this.Y + this.Ynopeus;
     this.kulma = this.kulma + 1;

     push();       // tallentaa koordinaatiston origon ja kulman
     translate(this.X, this.Y); //siirtää koordinaatiston origon kissan kohdalle
     rotate(this.kulma);
     imageMode(CENTER);         //asetaa kuvan origon kuvan keskelle
     image(kissakuva, 0, 0, this.leveys, this.korkeus);
     pop();        // palauttaa koordinaatiston asetuksen alkuperäiseen

     //image(kissakuva, this.X, this.Y, this.leveys, this.korkeus);
   }
}
