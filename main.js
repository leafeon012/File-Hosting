(function() {
  "use strict";
  var fileInput = document.getElementById("file");

  function downloadFile(name, url) {
    
    var ael = document.createElement('a');

    ael.setAttribute('href', url);
    ael.setAttribute('download', name);
    ael.style.display = 'none';
    document.body.appendChild(ael);

    ael.click();

    document.body.removeChild(ael);
  }


  function encode() {
    var reader = new FileReader(),
    file = fileInput.files[0];


    reader.onload = function() {
      var data = reader.result,
      encodedData = btoa(data),
      //btoa => binarytoascii (binary to base64)
      blob = new Blob([encodedData]);

      downloadFile(file.name + ".txt", URL.createObjectURL(blob));
    }

  
    reader.readAsBinaryString(file);
  }

  function base64toBlob(base64Data) {
    var sliceSize = 1024,
    byteCharacters = atob(base64Data),
    bytesLength = byteCharacters.length,
    slicesCount = Math.ceil(bytesLength / sliceSize),
    byteArrays = new Array(slicesCount);

    for (var sliceIndex = 0; sliceIndex < slicesCount; ++sliceIndex) {
      var begin = sliceIndex * sliceSize;
      var end = Math.min(begin + sliceSize, bytesLength);

      var bytes = new Array(end - begin);

      for (var offset = begin, i = 0; offset < end; ++i, ++offset) {
        bytes[i] = byteCharacters[offset].charCodeAt(0);
      }
      byteArrays[sliceIndex] = new Uint8Array(bytes);
    }
    return new Blob(byteArrays, {});
  }

  function decode() {
    var reader = new FileReader(),
    file = fileInput.files[0];
    const name = document.getElementById('name').value;
    
    
    reader.onload = function() {
      var data = reader.result,
      blob = base64toBlob(data);
      blob = base64toBlob(name);

      downloadFile(file.name + ".pk", URL.createObjectURL(blob));
    }

    reader.readAsText(name);
  }

  document.getElementById("encode").addEventListener('click', encode);
  document.getElementById("decode").addEventListener('click', decode);
} ())

