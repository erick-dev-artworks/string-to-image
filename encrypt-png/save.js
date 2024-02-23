const QRCode = require('qrcode');
const fs = require("fs");
const Jimp = require("jimp");
const qrCodeReader = require('qrcode-reader');
const compress_images = require("compress-images");

let inputFile  = "file2.png";
let outputFile = "file2-small.png";


async function writePNG(text){
  var resX = await QRCode.toDataURL(text)
  var base64Data = resX.replace(/^data:image\/png;base64,/, "");

  fs.writeFileSync("./file2.png", base64Data, 'base64', function(err) {

    console.log(err);

  });

  //console.log(resX)
}

async function encryptQR(text){
  var buff = new Buffer.from(text)
  var hash = buff.toString('base64')

  fs.writeFileSync("./file2.txt", hash, function(err) {
    console.log(err);
  });

  return hash
}


async function readPNG(text){
  const buffer = await fs.readFileSync('./file2.png');
  console.log('readed: ', buffer)
  
}

function MyFun() {
  compress_images(
    "./file2.png",
    "./",
    { compress_force: false, statistic: true, autoupdate: true },
    false,
    { jpg: { engine: "mozjpeg", command: ["-quality", "60"] } },
    { png: { engine: "pngquant", command: ["--quality=20-50", "-o"] } },
    { svg: { engine: "svgo", command: "--multipass" } },
    {
      gif: { engine: "gifsicle", command: ["--colors", "64", "--use-col=web"] },
    },
    function (err, completed) {
      if (completed === true) {
        // Doing something.
      }
    }
  );
}



async function writeDATA(){
var string1 = "Family is the place where you learn your first lesson in life. Your family members are the only assets that will remain with you forever. Whatever the circumstances, family members are always there for each other to support us. Good values and good morals are always taught in a family.  In the family, we are prepared to respect our elders and love younger ones. We learn lessons consistently from our family, about honesty, dependability, kindness and so on.In the family, we are prepared to respect our elders and love younger ones. We learn lessons consistently from our family, about honesty, dependability, kindness and so on."


  var r1 = await encryptQR(string1)
  var r2 = await writePNG(r1)
  await readPNG()
  await MyFun()
}
writeDATA()
