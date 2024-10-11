// Generate barcode with JsBarcode
JsBarcode("#barcode", "123456789012", {
    format: "CODE128",
    lineColor: "#000",
    width: 2,
    height: 100,
    displayValue: true
});

// Barcode scanning with QuaggaJS
const scannerContainer = document.getElementById('scanner-container');
const scanResult = document.getElementById('scan-result');
const startScan = document.getElementById('start-scan');

startScan.addEventListener('click', function() {
    Quagga.init({
        inputStream: {
            name: "Live",
            type: "LiveStream",
            target: scannerContainer, // The DOM element to use for showing the camera
        },
        decoder: {
            readers: ["code_128_reader"] // Choose the type of barcode
        }
    }, function(err) {
        if (err) {
            console.log(err);
            return;
        }
        Quagga.start();
    });

    Quagga.onDetected(function(data) {
        scanResult.innerHTML = data.codeResult.code;
        Quagga.stop(); // Stop scanning after a barcode is detected
    });
});
