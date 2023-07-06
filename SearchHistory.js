document.addEventListener("DOMContentLoaded", function () {
    var histroyList = document.getElementById("histroylist");
    showSearchHistory();
  
    function showSearchHistory() {
      var searchList = JSON.parse(localStorage.getItem("searchList")) || [];
      if (searchList.length >= 0) {
        histroyList.innerHTML = "";
  
        searchList.forEach((searches) => {
          var historylist1 = document.createElement("div");
  
          var listItem = document.createElement("p");
  
          var listdef = document.createElement("p");
          var historylist1 = document.createElement("div");
          listItem.textContent = searches.text;
          historylist1.appendChild(listItem);
  
          listdef.textContent = searches.meaning;
          historylist1.appendChild(listdef);
  
          const deletebutton = document.createElement("button");
          deletebutton.setAttribute("id", "deletebutton");
          deletebutton.innerHTML = "delete";
          deletebutton.addEventListener("click", () => {
            deleteItemFromLocalStorage(searchList.indexOf(searches));
          });
          historylist1.appendChild(deletebutton);
          histroyList.appendChild(historylist1);
          historylist1.setAttribute("class", "resultcard");
        });
      }
    }
    function deleteItemFromLocalStorage(index) {
      let storedItems = JSON.parse(localStorage.getItem("searchList")) || [];
      storedItems.splice(index, 1);
      localStorage.setItem("searchList", JSON.stringify(storedItems));
      showSearchHistory();
    }
  });