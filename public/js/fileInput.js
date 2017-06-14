console.log("fileInput is running...")
var fileInput = document.getElementById('file-input');
var fileDisplayArea = document.getElementById('img');
fileInput.addEventListener('change', function (e) {
    try{
    $("#verarbeite")
        .show()
    $('#erstelle_map')
        .hide()
    $('#analysiere')
        .hide()
    $("#img")
        .show()
    $("#canvas")
        .hide()
    $("#result")
        .hide()
    $("#div_result")
                .hide();
    
    
    var file = fileInput.files[0];
    var imageType = /image.*/;
    if (file.type.match(imageType)) {
        var reader = new FileReader();
        console.log($(window).height()+" & "+$(window).width() )
        reader.onload = function (e) {
            fileDisplayArea.src = reader.result;
            fileDisplayArea.id = "img";

            //fileDisplayArea.width = $(window).width()/1.5;
            
            }
        
            $("#div_result")
                .show();
        reader.readAsDataURL(file);
    } else {
        fileDisplayArea.innerHTML = "File not supported!"
    }
}catch(err){
    console.log("Es wurde keine Datei ausgewählt")
      }});
