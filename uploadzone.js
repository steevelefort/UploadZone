/*******************************************
*     UPLOAD DIRECTIVE FOR ANGULAR.JS      *
* wrote by Steeve LEFORT / Lefort-Software *
*      steeve[at]lefort-software.com       *
*******************************************/

var uploadZone = angular.module("uploadZone", []);

uploadZone.directive('uploadZone', function() {
    return {
        restrict: 'EA',
        replace: true,
        link: function (scope, element, attrs) {
            var dz = element[0];

            var mimetest = function(file) {
                if (typeof attrs["mimetypes"] != "undefined") {

                    var list = attrs["mimetypes"].split(";");
                    var success = false;
                    for (i = 0; i < list.length; i++) {
                        if (list[i].trim() == file.type) success = true;
                    }
                    if (!success){
                        if (typeof attrs["onerror"] != "undefined"){
                            scope[attrs["onerror"]]({ 'message':'File type not allowed' })
                        }
                    }
                    return success;
                }
                return true;
            }

            var openFileBrowser = function(e){
                e.stopPropagation();
                e.preventDefault();
                fileInput.click();
                return false;
            }

            var cancel = function(e){
                e.stopPropagation();
                e.preventDefault();
                return false;
            }

            var drop = function(e){
                e.stopPropagation();
                e.preventDefault();
                var dt    = e.dataTransfer;
                var files = dt.files;
                //console.log('Dropped:'+files[0]);
                if (mimetest(files[0])) upload(files[0]);
                return false;
            }

            var open = function(e){
                //console.log('Selected:'+e.srcElement.files[0]);
                if (mimetest(e.srcElement.files[0]))
                    upload(e.srcElement.files[0]);
                return false;
            }

            var upload = function(file){
                var xhr = new XMLHttpRequest();

                if (typeof attrs["url"] == "undefined") {
                    console.log("uploadZone: 'url' attribute must be defined");
                    return;
                }
                xhr.open('POST', attrs["url"],true);
                xhr.setRequestHeader('X-Requested-With', 'XMLHttpRequest');

                if (typeof attrs["onloadstart"] != "undefined") xhr.upload.addEventListener('loadstart',scope[attrs["onloadstart"]]);
                if (typeof attrs["onprogress"] != "undefined") xhr.upload.addEventListener('progress',scope[attrs["onprogress"]]);
                if (typeof attrs["onabort"] != "undefined") xhr.upload.addEventListener('abort',scope[attrs["onabort"]]);
                if (typeof attrs["onerror"] != "undefined"){
                    xhr.addEventListener('error',scope[attrs["onerror"]]);
                    xhr.upload.addEventListener('error',scope[attrs["onerror"]]);
                    xhr.onreadystatechange=function(e){
                        if (xhr.readyState===4 && xhr.status>399)
                            scope[attrs["onerror"]]({'message':xhr.statusText})
                    };
                }
                if (typeof attrs["onload"] != "undefined") xhr.upload.addEventListener('load',scope[attrs["onload"]]);
                if (typeof attrs["ontimeout"] != "undefined") xhr.upload.addEventListener('timeout',scope[attrs["ontimeout"]]);
                if (typeof attrs["onloadend"] != "undefined") xhr.upload.addEventListener('loadend',scope[attrs["onloadend"]]);

                var form = new FormData();

                var name = "file";
                if (typeof attrs["fieldname"] != "undefined") name = attrs["fieldname"];
                form.append(name, file);

                var fields = scope[attrs["fields"]];
                if (typeof fields != 'undefined'){
                    for (field in fields){
                        form.append(field,fields[field]);
                    }
                }

                xhr.send(form);
            }

            var explorer = true;
            var clickable = attrs["clickable"];
            if (typeof clickable != 'undefined'){
                if (clickable.toUpperCase()=='FALSE')
                    explorer=false;
                else{
                    if (clickable.toUpperCase()=='FALSE')
                        explorer=true;
                    else
                        console.log("uploadZone: 'clickable' attribute must be 'true' or 'false'")
                }
            }

            if (explorer) {
                var fileInput = document.createElement('input');
                fileInput.type = 'file';
                fileInput.addEventListener("change", open, false);
                dz.addEventListener('click',  openFileBrowser, false);
            }

            dz.addEventListener('dragstart', cancel, false);
            dz.addEventListener('dragenter', cancel, false);
            dz.addEventListener('dragover',  cancel,false);
            dz.addEventListener('dragleave', cancel, false);
            dz.addEventListener('dragend', cancel, false);
            dz.addEventListener('drop',  drop, false);

        }
    }
});