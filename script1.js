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
      
    fetchData(repoURL, $loader, $repoTable,$issues,$downloads);

    $('#button1').click(function () {
       
	  $(this).css('background-color','yellow');
       $('#button3').show();
        if ((isissuesLoaded == false) && (isdownloadsLoaded == false)){
            $repoTable.hide();
            $issues.show();
            isissuesLoaded = true;
        } else if((isdownloadsLoaded == true) && (isissuesLoaded == false)){
            $downloads.hide();
            $issues.show();
	        $downloads.show();
            isissuesLoaded=true;
        } else if((isdownloadsLoaded == false) && (isissuesLoaded == true)){
            $issues.show();
        } else{
            $repoTable.hide();
            $issues.show();
            $downloads.show();
        }  
});
   $('#button2').click(function () {
    $('#button3').show();
$(this).css('background-color','yellow');
       if((isdownloadsLoaded == false) && (isissuesLoaded == false)) {
            $repoTable.hide();
            $issues.hide();
            $downloads.show();
            isdownloadsLoaded = true;
        } else if((isdownloadsLoaded == false) && (isissuesLoaded == true)){
            $issues.show();
            $downloads.show();
            isdownloadsLoaded=true;
  	    } else if((isdownloadsLoaded == true) && (isissuesLoaded == false)){
            $downloads.show();
        } else{
            $issues.show();
            $downloads.show();
        } 
});
    $('#button3').click(function () {
            $('#button1').css('background-color','#b0e0e6');
            $('#button2').css('background-color','#b0e0e6');
	        $downloads.hide();
            $issues.hide();
            $repoTable.show();
            $('#button3').hide();
            isdownloadsLoaded=false;
            isissuesLoaded=false;
       });
});


function fetchData (URL, loaderElement, table, issueTable, downloadsTable) {
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
        populateRepoTable(json, table);
        populateissuesTable(json, issueTable );
        $(issues).show();
        populatedownloadsTable(json, downloadsTable);
    }
});
}

function populateRepoTable(json, repoTable){
    for(var i=0; i<json.length; i++){
    repoTable.append("<tr><th>"+json[i].name+"</th><th>"+json[i].full_name+"</th><th>"+json[i].size+"</th><th>"+json[i].created_at+"</th><th>"+json[i].language+"</th><th>"+json[i].has_issues+"</th><th>"+json[i].has_downloads+"</th><th>"+json[i].watchers+"</th></tr>");
   }
}

function populateissuesTable(json, issues){
    for(var i=0; i<json.length; i++){
    if(json[i].has_issues==true){
    issues.append("<tr><th>"+json[i].name+"</th><th>"+json[i].full_name+"</th><th>"+json[i].has_issues+"</th></tr>");
   }
}}
function populatedownloadsTable(json, downloads){
    for(var i=0; i<json.length; i++){
    if(json[i].has_downloads==true){
    downloads.append("<tr><th>"+json[i].name+"</th><th>"+json[i].full_name+"</th><th>"+json[i].has_downloads+"</th></tr>");
   }
}}
