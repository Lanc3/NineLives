// For an introduction to the Blank template, see the following documentation:
// http://go.microsoft.com/fwlink/?LinkID=397704
// To debug code on page load in cordova-simulate or on Android devices/emulators: launch your app, set breakpoints, 
// and then run "window.location.reload()" in the JavaScript Console.
(function () {
    "use strict";

    document.addEventListener( 'deviceready', onDeviceReady.bind( this ), false );

    function onDeviceReady() {
        // Handle the Cordova pause and resume events
        document.addEventListener( 'pause', onPause.bind( this ), false );
        document.addEventListener( 'resume', onResume.bind( this ), false );
        
        // TODO: Cordova has been loaded. Perform any initialization that requires Cordova here.
        var parentElement = document.getElementById('deviceready');
      
        startPoint();
        //fgile("content/words.txt");
    };

    function fail(e) {
        console.log("FileSystem Error " +e.code);
        
    }

    function fgile(url) {
        var request = new XMLHttpRequest();
        request.open('GET', url, false);
        var that = this;
        // Hook the event that gets called as the request progresses
        request.onload = function () {
            // If the request is "DONE" (completed or failed)
            if (request.readyState == 4 && request.status == 200) {
                console.log(request.responseText);

            }
        }
        request.send();
        return self.shaderData;
    }

    function onPause() {
        // TODO: This application has been suspended. Save application state here.
    };

    function onResume() {
        // TODO: This application has been reactivated. Restore application state here.
    };
} )();