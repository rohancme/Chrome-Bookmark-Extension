function printBookmarks(items,list_name){
  items.forEach(function(items){
    if(items.url==null){
      var refList = document.getElementById(list_name);
      var newNode = document.createElement("LI");
      var newItem = document.createElement("a");
      var newItemName = document.createTextNode(items.title);         // Create a text node
      newItem.appendChild(newItemName);
      newItem.href="ReferenceList.html?id="+items.id;
      newItem.onclick = function () {
                chrome.tabs.create({active: true, url: newItem.href});
      };
      newNode.appendChild(newItem);

      //I have No idea why this test doesn't work earlier in the function
      if(items.title!=""){
      refList.appendChild(newNode);
      }

      if (items.children){
        //create a new sublist
        var newList=document.createElement("ul");
        //generate a unique id for it. Its name plus its unique bookmark element id should do
        var newListID=items.title+items.id;
        newList.setAttribute("id",newListID);
        refList.appendChild(newList);
        printBookmarks(items.children,newListID);
      } 
    }
    });
}

document.addEventListener('DOMContentLoaded', function() {

  chrome.bookmarks.getTree(function(items){
      var main_list_name="MainList";
      printBookmarks(items,main_list_name);
  });

});
