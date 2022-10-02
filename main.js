Prediction="";

Webcam.set({
    width:350,
    height:300,
    image_format:'png',
    png_quality:90
});

camera=document.getElementById("camera");

Webcam.attach('#camera');

function gestures()
{
    Webcam.snap(function(data_uri){
        document.getElementById("result").innerHTML="<img id='capture' src='"+data_uri+"'/>";

    });
}
console.log('ml5 version', ml5.version);
classifier =ml5.imageClassifier('https://teachablemachine.withgoogle.com/models/TVQ80hcsW/model.json', modelloaded);

function modelloaded()
{
    console.log('model is loaded');
}

function speak()
{
    var synth=window.speechSynthesis;
    s ="The prediction is " + Prediction;
    var utterthis = new SpeechSynthesisUtterance(s);
    synth.speak(utterthis);
}

function check()
{
    img = document.getElementById("capture");
    classifier.classify(img,got_result);
}

function got_result(error,results)
{
    if(error)
    {
        console.error(error);
    }
    else
    {
        console.log(results);
        document.getElementById("result_gestures_name").innerHTML=results[0].label;
        Prediction = results[0].label;
        speak();

        if(results[0].label=="Amazing")
        {
            document.getElementById("update_gestures").innerHTML="&#128076;";
        }
        if(results[0].label=="Best")
        {
            document.getElementById("update_gestures").innerHTML="&#128077;";
        }
        if(results[0].label=="Victory")
        {
            document.getElementById("update_gestures").innerHTML="&#9996;";
        }
    }

}
