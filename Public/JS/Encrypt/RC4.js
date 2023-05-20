const key = "Chuccacbandeuquamon";

function RC4_encrypt(input) {
  let result = "";
  let x = 0, y = 0;
  let box = new Array(256);

  for (let i = 0; i < 256; i++) {
    box[i] = i;
  }

  for (let i = 0; i < 256; i++) {
    y = (key[i % key.length].charCodeAt(0) + box[i] + y) % 256;
    let temp = box[i];
    box[i] = box[y];
    box[y] = temp;
  }

  for (let i = 0; i < input.length; i++) {
    x = (x + 1) % 256;
    y = (box[x] + y) % 256;
    let temp = box[x];
    box[x] = box[y];
    box[y] = temp;

    let xorIndex = (box[x] + box[y]) % 256;
    let xorValue = input.charCodeAt(i) ^ box[xorIndex];
    result += String.fromCharCode(xorValue);
  }

  return result;
}

module.exports = RC4_encrypt;
