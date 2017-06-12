console.log("fileInput is running...")
var fileInput = document.getElementById('file-input');
var fileDisplayArea = document.getElementById('img');
fileInput.addEventListener('change', function (e) {
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
    
    
    var file = fileInput.files[0];
    var imageType = /image.*/;
    if (file.type.match(imageType)) {
        var reader = new FileReader();
        reader.onload = function (e) {
            fileDisplayArea.src = reader.result;
            fileDisplayArea.id = "img";
        }
        reader.readAsDataURL(file);
    } else {
        fileDisplayArea.innerHTML = "File not supported!"
    }
});
