# UploadZone : Angular.JS directive for file upload
UploadZone is an Angular.JS directive allowing you to change an HTML tag to a file upload zone.  
You can click on target element to open a file browser or drag/drop a file from your desktop.

## Getting started

In your HTML header, add a script tag after Angular.JS :  
```
<script src="/uploadzone.js"></script>
```

In your HTML code :  
```
<div upload-zone url="/media" field-name="myfile">
	Click here or drop a file
</div>
```
In your JS Code, add 'uploadZone' to your app module :
```
var app = angular.module("app", ['uploadZone']);
```

## Options

The following HTML attributes can be used :

### Clickable or not
**clickable** : true / false (default=true)  
A click on target element open a file browser

### Additional fields
**fieldname** : field name

**fields** : A $scope object like :
```
{ 'method':'put', 'token':'xxxx' } 
```
If you need to post some other data, you could use this attribute

### Allowed mime-types
**mimetypes** : list of allowed mime-types separated by a semicolon
```
mimetypes="video/mp4; image/jpeg"
```
Bad mime-types raise "onerror" callback.

### XHR Callbacks
**onloadstart, onprogress, onabort, onerror, onload, ontimeout, onloadend** : $scope callback functions (with one event arg)
```
$scope.progress = function(e){
    $scope.dynamic = e.loaded / e.total;
    $scope.$apply();
}
```
```
<div upload-zone url="/media" onprogress="progress">
    Cliquez ici ou glissez un fichier
</div>
```

# LICENCE : MIT
