console.log("fileInput is running...")
var fileInput = document.getElementById('file-input');
var fileDisplayArea = document.getElementById('img');
fileInput.addEventListener('change', function (e) {
    try{
    $("#verarbeite")
        .show()
    $('#erstelle_map')
        .hide()
    $('#analysiere1')
        .hide()    
    $('#analysiere2')
        .hide()
    $("#img")
        .show()
    $("#canvas")
        .hide()
    $("#result1")
        .hide()
    $("#result2")
        .hide()
    $("#div_result")
        .hide();
    
    
    var file = fileInput.files[0];
    var imageType = /image.*/;
    if (file.type.match(imageType)) {
        var reader = new FileReader();
        reader.onload = function (e) {
            fileDisplayArea.src = reader.result;
            fileDisplayArea.id = "img";
            }
        
            $("#div_result")
                .show();
        reader.readAsDataURL(file);
    } else {
        fileDisplayArea.innerHTML = "File not supported!"
    }
        
        fileDisplayArea.name = this.value.replace(/.*[\/\\]/, '');
}catch(err){
    console.log("Es wurde keine Datei ausgewählt")
      }});
