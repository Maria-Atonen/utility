var autoCompete = {
    currentFocus: null,
    input: null,


    /*    @param input: the text field element
          @param options: an array of possible autocompleted values*/
    autocomplete: function (input, options, cb) {
        var inputId = input.getAttribute("id");
        autoCompeteNew.input = input;
        autoCompeteNew.input.autocomplete = "off";
        document.addEventListener("click", function (event) {
            autoCompeteNew.closeAllLists(event.target);
        });
        autoCompeteNew.input.addEventListener("input", function () {
            var autocompleteItems;
            var matchingItem;
            var currentInput = this.value;
            autoCompeteNew.closeAllLists();
            if (!currentInput || currentInput.length < 3) {
                return false;
            }
            autoCompeteNew.currentFocus = -1;
            autocompleteItems = document.createElement("DIV");
            autocompleteItems.setAttribute("id", this.id + "autocomplete-list");
            autocompleteItems.setAttribute("class", "autocomplete-items");
            this.parentNode.appendChild(autocompleteItems);
            // addOption - div to add options to collection, byDefault is not visible
            var addOption = document.createElement("DIV");
            addOption.setAttribute("id", inputId + "addOptionDiv");
            addOption.setAttribute("style", "display: none");
            autocompleteItems.appendChild(addOption);
            cb();
            document.getElementById("spanId").setAttribute("id", inputId+ "addOptionSpan");
            document.getElementById(inputId+ "addOptionSpan").innerHTML += currentInput;
            document.getElementById(inputId + "addOptionSpan").setAttribute("value", currentInput);
            options.each(function (option) {
                if (option.toUpperCase().includes(currentInput.toUpperCase())) {
                    matchingItem = document.createElement("DIV");
                    var beginOfMatch = option.toUpperCase().indexOf(currentInput.toUpperCase());
                    matchingItem.innerHTML = '<span class="M0">' + option.substr(0, beginOfMatch).replace(/ /gi, '&nbsp') + '</span>'
                        + '<strong class="M0">' +  option.substr(beginOfMatch, currentInput.length).replace(/ /gi, '&nbsp') + '</strong>'
                        + '<span class="M0">' +  option.substr(beginOfMatch + currentInput.length).replace(/ /gi, '&nbsp') + '</span>';
                    matchingItem.innerHTML += "<input type='hidden' value='" + option + "'>";
                    matchingItem.addEventListener("click", function () {
                        autoCompeteNew.input.value = this.getElementsByTagName("input")[0].value;
                        autoCompeteNew.closeAllLists();
                    });
                    autocompleteItems.appendChild(matchingItem);
                }
            });

        });
        autoCompeteNew.input.addEventListener("keydown", function (event) {
            var option = document.getElementById(this.id + "autocomplete-list");
            if (option) option = option.getElementsByTagName("div");
            if (event.keyCode == 40) { // arrow DOWN
                autoCompeteNew.currentFocus++;
                autoCompeteNew.addActive(option);
            } else if (event.keyCode == 38) { // arrow UP
                autoCompeteNew.currentFocus--;
                autoCompeteNew.addActive(option);
            } else if (event.keyCode == 13) {// ENTER
                if (autoCompeteNew.currentFocus > -1) {
                    event.preventDefault();
                    if (option) option[autoCompeteNew.currentFocus].click();
                }
            }
        });
    },

    addActive: function (option) {
        if (!option) return false;
        autoCompeteNew.removeActive(option);
        if (autoCompeteNew.currentFocus >= option.length) autoCompeteNew.currentFocus = 0;
        if (autoCompeteNew.currentFocus < 0) autoCompeteNew.currentFocus = (option.length - 1);
        option[autoCompeteNew.currentFocus].classList.add("autocomplete-active");
    },

    removeActive: function (option) {
        for (var i = 0; i < option.length; i++) {
            option[i].classList.remove("autocomplete-active");
        }
    },

    closeAllLists: function (element) {
        var autocompleteItems = document.getElementsByClassName("autocomplete-items");
        for (var i = 0; i < autocompleteItems.length; i++) {
            if (element != autocompleteItems[i] && element != autoCompeteNew.input) {
                autocompleteItems[i].parentNode.removeChild(autocompleteItems[i]);
            }
        }
    }

};