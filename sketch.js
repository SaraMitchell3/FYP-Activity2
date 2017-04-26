var button1, button2, button3, button4, button5, cnv2, chords;
var x1 = 75;
var x2 = 75;
var x3 = 75;
var f;
var playing = false;

function preload() {
  correct = loadSound('correct.wav');
  wrong = loadSound('wrong.wav');
  majorC = loadSound('majorC.wav');
  minorC = loadSound('minorC.wav');
  AT2 = loadSound('AT2.wav');
  Amajor = loadSound('Amajor.mp3');
  Bminor = loadSound('Bminor.mp3');
  Cmajor = loadSound('Cmajor.mp3');
  Dminor = loadSound('Dminor.mp3');
  Eminor = loadSound('Eminor.mp3');
  Fmajor = loadSound('Fmajor.mp3')
  Gmajor = loadSound('Gmajor.mp3');
}

function setup() {

  cnv2 = createCanvas(1250, 700);

  env1 = new p5.Env();
  env1.setADSR(0.02, 0.05, 0.3, 0.3);
  env1.setRange(1, 0);
  env2 = new p5.Env();
  env2.setADSR(0.02, 0.05, 0.3, 0.3);
  env2.setRange(1, 0);
  osc1 = new p5.Oscillator();
  osc1.setType('sine');
  osc1.amp(env1);
  osc1.start();
  osc2 = new p5.Oscillator();
  osc2.setType('sine');
  osc2.amp(env2);
  osc3 = new p5.Oscillator();
  osc3.setType('sine');
  osc3.amp(env2);

  masterVolume(0.6, 0.5);

  // Play major chord
  button1 = createButton('Play');
  button1.position(420, 236);
  button1.mousePressed(playMajorC);

  // Play minor chord 
  button2 = createButton('Play');
  button2.position(420, 276);
  button2.mousePressed(playMinorC);

  // Play activity chord
  button3 = createButton('Play');
  button3.position(325, 316);
  button3.mousePressed(playAT2);

  // Answer = major
  button4 = createButton('Major');
  button4.position(470, 316);
  button4.mousePressed(check1);

  // Answer = minor
  button5 = createButton('Minor');
  button5.position(520, 316);
  button5.mousePressed(check2);

  // Play final chord
  button6 = createButton('Play');
  button6.position(50, 650);
  button6.mousePressed(playChord);
  button6.size(80, 30);

  array = [AT2, Amajor, Bminor, Cmajor, Dminor, Eminor, Fmajor, Gmajor];
  chords = random(array);
}

function draw() {

  background(255);

  if (majorC.currentTime() > 3.6) {
    majorC.stop();
    button1.html("Play");
  }

  if (minorC.currentTime() > 3.4) {
    minorC.stop();
    button2.html("Play");
  }

  if (AT2.currentTime() > 3.7) {
    minorC.stop();
    button3.html("Play");
  }

  textSize(50);
  textStyle(BOLD);
  fill(255, 125, 0);
  text("Activity 2: Major and Minor Chords", 250, 100);

  textSize(20);
  textStyle(NORMAL);
  fill(0);
  text("In this activity we will learn to distinguish between major and minor chords.", 50, 170);
  text("Just like the scales we have already seen, major chords sound 'happy', while minor chords sound rather 'sad'.", 50, 210);
  text("This is what a major chord sounds like:", 50, 250);
  text("This is what a minor chord sounds like:", 50, 290);
  text("Now try to identify this chord:", 50, 330);
  textSize(15);
  textStyle(BOLD);
  text("Answer:", 400, 330);
  textSize(20);
  textStyle(NORMAL);
  text("You can now build your own chords on this machine. Slide the balls along the tracks until you like the sound.", 50, 370);
  text("Click on the balls to hear the individual notes, or click 'Play' to hear the full chord:", 50, 400);

  line(50, 470, width - 50, 470);
  line(50, 540, width - 50, 540);
  line(50, 610, width - 50, 610);

  fill(200, 50, 50);
  ellipse(x1, 470, 50, 50);
  fill(255);
  ellipse(x2, 540, 50, 50);
  fill(51, 153, 255);
  ellipse(x3, 610, 50, 50);
  }

//
//
//FUNCTIONS
//
//

function check1() { // major

  if (chords == Amajor || chords == Cmajor || chords == Fmajor || chords == Gmajor) {
    correct.play();
  } else {
    wrong.play();
  }
}

function check2() { // minor 

  if (chords == AT2 || chords == Bminor || chords == Dminor || chords == Eminor) {
    correct.play();
  } else {
    wrong.play();
  }
}

function playMajorC() {

  if (!majorC.isPlaying()) {
    majorC.play();
    button1.html("Stop");
  } else {
    majorC.stop();
    button1.html("Play");
  }
}

function playMinorC() {
  if (!minorC.isPlaying()) {
    minorC.play();
    button2.html("Stop");
  } else {
    minorC.stop();
    button2.html("Play");
  }
}

function playAT2() {
  
  chords.play();
  chords = random(array); // picks a random new chord every time the Play button is pressed
}

function env1Attack() {
  env1.triggerAttack();
}

function env2Attack() {
  env2.triggerAttack();
}

function mouseReleased() {
  env1.triggerRelease();
  env2.triggerRelease();
}

function mousePressed() {
  var f1 = map(x1, 50, 1200, 220, 440); // A3 to A4, mapped across the screen
  var f2 = map(x2, 50, 1200, 220, 440);
  var f3 = map(x3, 50, 1200, 220, 440);


  if (mouseY > 445 && mouseY < 495) { // stretch needs to be delimited (it goes out of the screen)
    x1 = mouseX;
    env1Attack();
    osc1.freq(f1);
  } else if (mouseY > 515 && mouseY < 565) {
    x2 = mouseX;
    env1Attack();
    osc1.freq(f2);
  } else if (mouseY > 585 && mouseY < 635) {
    x3 = mouseX;
    env1Attack();
    osc1.freq(f3);
  }
}

function mouseDragged() {

  var f1 = map(x1, 50, 1200, 220, 440);
  var f2 = map(x2, 50, 1200, 220, 440);
  var f3 = map(x3, 50, 1200, 220, 440);

  if (mouseY > 445 && mouseY < 495) { // stretch needs to be limited (it goes out of the screen)
    x1 = mouseX;
    env1Attack();
    osc1.freq(f1);
  } else if (mouseY > 515 && mouseY < 565) {
    x2 = mouseX;
    env1Attack();
    osc1.freq(f2);
  } else if (mouseY > 585 && mouseY < 635) {
    x3 = mouseX;
    env1Attack();
    osc1.freq(f3);
  }
}

function playChord() {

  var f1 = map(x1, 50, 1200, 220, 440);
  var f2 = map(x2, 50, 1200, 220, 440);
  var f3 = map(x3, 50, 1200, 220, 440);

  env1Attack();
  env2Attack();
  osc2.start();
  osc3.start();
  osc1.freq(f1);
  osc2.freq(f2);
  osc3.freq(f3);
}