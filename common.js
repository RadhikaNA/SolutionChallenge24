// app.js

let model;

async function loadModel() {
    model = await tf.loadLayersModel('mobilenet://1');
}

async function handleImageUpload(event) {
    const file = event.target.files[0];

    if (file) {
        const img = new Image();
        img.src = URL.createObjectURL(file);

        img.onload = async function () {
            const result = await classifyImage(img);
            displayResult(result);
        };
    }
}

async function classifyImage(img) {
    const tensor = tf.browser.fromPixels(img)
        .resizeNearestNeighbor([224, 224])
        .toFloat()
        .div(tf.scalar(255))
        .expandDims();

    const predictions = await model.predict(tensor).data();
    const topPrediction = Array.from(predictions).indexOf(Math.max(...predictions));

    return `Predicted class: ${topPrediction}`;
}

function displayResult(result) {
    const resultDiv = document.getElementById('result');
    resultDiv.innerHTML = result;
}

// Load the model when the page is loaded
window.onload = function () {
    loadModel();
};
