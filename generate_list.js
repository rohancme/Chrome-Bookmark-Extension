function print_all(items,print_sublist){
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

    }
    else if(print_sublist=='true'){//will print subfolders
        print_references_in_folder(items.id,print_sublist);
    }

    else{
      console.log(print_sublist);
    }
    });
}


function print_references_in_folder(id,print_sublist){
  chrome.bookmarks.getChildren(id,function(items){
    print_all(items,print_sublist);
  });
}


function selectBlock(containerid) {
  var range = document.createRange();
  range.selectNode(document.getElementById(containerid));
  window.getSelection().addRange(range);
}


document.addEventListener('DOMContentLoaded', function() {

  document.getElementById('MainDiv').addEventListener("dblclick", function(){ 
    selectBlock('MainDiv');
  });

  var query = window.location.search.substring(1);
  var split_query=query.split('?');
  var folder_header=split_query[0];
  var folder_id=folder_header.split('=')[1];

  var print_sublist_header=split_query[1];
  var print_sublist=print_sublist_header.split('=')[1];


  print_references_in_folder(folder_id,print_sublist);

});
