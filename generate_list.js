function print_all(items){
  var counter=1;
  items.forEach(function(items){
   
    if(items.url!=null){
      var refList = document.getElementById("reference_list");
      var newNode = document.createElement("LI");
      //Just basically prints the title followed by the url retrieved from
      var newNodeText=document.createTextNode('['+counter+'] '+items.title+'. Retrieved from '+items.url);
      newNode.appendChild(newNodeText);
      refList.appendChild(newNode);
      counter++;

      //If I decide I need to print the subfolders as well
      //if (items.children)
        //print_all(items.children);
    }
    });
}


function print_references_in_folder(id){
  chrome.bookmarks.getChildren(id,function(items){
    print_all(items);
  });
}


function selectBlock(containerid) {
  var range = document.createRange();
  range.selectNode(document.getElementById(containerid));
  window.getSelection().addRange(range);
}


document.addEventListener('DOMContentLoaded', function() {

  document.getElementById('MainDiv').addEventListener("click", function(){ 
    selectBlock('MainDiv');
  });

  var query = window.location.search.substring(1);
  var value=query.split('=')[1];
  print_references_in_folder(value);

});