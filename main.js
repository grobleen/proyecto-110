Webcam.set({
    width:350,
    height:300,
    image_format : 'png',
    png_quality:90
  });
//crea la variable camera y agrega document.getElementById("camera");
camera=document.getElementById("camera");
Webcam.attach( '#camera' );

      
function take_snapshot()
{
    Webcam.snap(function(data_uri) {
        document.getElementById("result").innerHTML = '<img id="captured_image" src="'+data_uri+'"/>';
    });
}
  //agrega una impresion en consola para mostrar la version del ml5
  console.log("versión:",ml5.versión)
classifier = ml5.imageClassifier('https://teachablemachine.withgoogle.com/models/QJifh3bKr/model.json',modelLoaded);

  function modelLoaded() {
    //imprime en consola el mensaje de Modelo cargado
    console.log("Modelo cargado")
  }
      
  function check()
  {
    //crea la variable img y agrega un document.getElementById('captured_image');
img = document.getElementById ('captured_image');
    classifier.classify(img, gotResult);
  }

function gotResult(error, results) {
  if (error) {
    console.error(error);
  } else {
    console.log(results);
    
    document.getElementById("result_object_name").innerHTML = results[0].label;
    //crea la variable gesture como los resultados en 0 para la label
   gesture = results[0].label;
    
    toSpeak = "";
    
    if(gesture == "GENIAL")
    {
      //establece la variable toSpeak con el texto "Esto se ve genial"
      toSpeak = "Esto c ve genial";
      document.getElementById("result_object_gesture_icon").innerHTML = "&#128076;";
    }
    else if(gesture == "BIEN")
    {
      toSpeak = "Todo bien";
      document.getElementById("result_object_gesture_icon").innerHTML = "&#128077;";
    }
    else if(gesture == "VICTORIA")
    {
      toSpeak = "Esa fue una victoria maravillosa";
      document.getElementById("result_object_gesture_icon").innerHTML = "&#9996;";
    }
    //llama a la funcion speak()
    speak();
  }
}


function speak(){
    var synth = window.speechSynthesis;
    //crea la variable speak_data y asignale la variable toSpeak
speak_data = toSpeak;   

    var utterThis = new SpeechSynthesisUtterance(speak_data);

    synth.speak(utterThis);

}
