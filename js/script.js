$(document).ready(function(){
    var repoURL = "http://jsonblob.com/api/5575522be4b0463c77b9b268";
    var $repoTable = $('#repoTable');
    var $issues = $('#issues');
    var $downloads = $('#downloads');
    var $loader = $('#loader');
   
    isissuesLoaded = false;
    isdownloadsLoaded = false; 
    isrepoloaded = false;
    $loader.hide();
  
    fetchData(repoURL, $loader, "repoTable", $repoTable);

    $('#button1').click(function () {
	    $(this).css('background-color','yellow');
        if (isissuesLoaded == false){
            $repoTable.hide();
            fetchData(repoURL, $loader, "issues", $issues);
            $('input').hide();
            isissuesLoaded = true;
        } else{
            $repoTable.hide();
            $issues.show();
        }  
});
   $('#button2').click(function () {
            $(this).css('background-color','yellow');
       if(isdownloadsLoaded == false) {
            $repoTable.hide();
            fetchData(repoURL, $loader, "downloads", $downloads);
            $('input').hide();
            isdownloadsLoaded = true;
        }else {
            $repoTable.hide();
            $downloads.show();
        } 
});
   $('#button3').click(function () {
            $('#button1').css('background-color','#b0e0e6');
            $('#button2').css('background-color','#b0e0e6');
	    $downloads.hide();
            $issues.hide();
            $repoTable.show();
       });
});


function fetchData (URL, loaderElement, fetch, table) {
    $.ajax({
    type: 'GET',
    dataType: 'json',
    url: URL,
    cache: false,
    beforeSend: function(){
        loaderElement.show();
        $('table').hide();
    },
    complete: function(){
        loaderElement.hide();
        $('#button1').show();
	$('#button2').show();
        table.show();
    },
    success: function(json){
        if(fetch == "repoTable"){
            populateRepoTable(json, table);
        } else if(fetch=="issues"){
	$('#button3').show();
            populateissuesTable(json, table);
        }else {
	$('#button3').show();
            populatedownloadsTable(json, table);
        }
    }
});
}

function populateRepoTable(json, repoTable){
    for(var i=0; i<json.length; i++){
    repoTable.append("<tr><th>"+json[i].name+"</th><th>"+json[i].full_name+"</th><th>"+json[i].size+"</th><th>"+json[i].created_at+"</th><th>"+json[i].language+"</th><th>"+json[i].has_issues+"</th><th>"+json[i].has_downloads+"</th><th>"+json[i].watchers+"</th></tr>");
   }
}

function populateissuesTable(json, repoTable){
    for(var i=0; i<json.length; i++){
    if(json[i].has_issues==true){
    repoTable.append("<tr><th>"+json[i].name+"</th><th>"+json[i].full_name+"</th><th>"+json[i].has_issues+"</th></tr>");
   }
}}
function populatedownloadsTable(json, repoTable){
    for(var i=0; i<json.length; i++){
    if(json[i].has_downloads==true){
    repoTable.append("<tr><th>"+json[i].name+"</th><th>"+json[i].full_name+"</th><th>"+json[i].has_downloads+"</th></tr>");
   }
}}
