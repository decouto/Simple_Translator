/* David Couto PS1 6.813 */

// This allows the Javascript code inside this block to only run when the page
// has finished loading in the browser.
$(function() {


    //VARIABLE DECLARATIONS AND DEFINITIONS

    var lang_to = "English";
    var lang_from = "Spanish";
    var current_dict = dicts[lang_to][lang_from]; //keys: words in @lang_to, values: corresponding words in @lang_from
    var len_dict = Object.keys(current_dict).length;
    var autocomplete_words = Object.keys(current_dict); //setup autocomplete source
    var translation = autocomplete_words[Math.floor((Math.random() * len_dict) + 1)]; //randomized first word
    var word_to_translate = current_dict[translation];
    var translator_state = "no_input"; //will indicate first text input, so system knows to delete static examples


    //FUNCTION DEFINITIONS

    function correctTranslation() {

        var text_input = $("#input_text").val();
        var table = document.getElementById("answers_block");
        var row = table.insertRow(0);

        if (text_input == translation) { //if correct, add rows and style
            cell1 = row.insertCell(0);
            cell2 = row.insertCell(1);
            cell3 = row.insertCell(2);
            cell1.innerHTML = word_to_translate;
            cell2.innerHTML = text_input;
            cell3.innerHTML = '<span class="ui-icon ui-icon-check"></span>';
            $(cell1).addClass("correct");
            $(cell2).addClass("correct");
            }
        else { //if incorrect, add rows and style
            cell1 = row.insertCell(0);
            cell2 = row.insertCell(1);
            cell3 = row.insertCell(2);
            cell1.innerHTML = word_to_translate;
            cell2.innerHTML = text_input;
            cell3.innerHTML = translation;
            $(cell1).addClass("wrong");
            $(cell2).addClass("wrong cross");
            $(cell3).addClass("wrong");
            }
        }

    function resetTranslator() {//makes translator ready to use again

        $( "#input_text" ).autocomplete("close"); //turn off autocomplete box
        var rand_num = Math.floor((Math.random() * len_dict) + 1);
        translation = autocomplete_words[rand_num];  //random number for next word

        word_to_translate = current_dict[translation];
        $("#to_translate").html(current_dict[translation]);
        document.getElementById("input_text").value=""; //clear and refocus text input box
        $("#input_text").focus();

        }

    function updateTranslator() {//master handler for translator inputs and state control

        if (translator_state == "no_input") {
            document.getElementById("answers_block").deleteRow(0);
            document.getElementById("answers_block").deleteRow(0);  //delete static example answers on first submit
            translator_state = "collecting_inputs";
            }

        correctTranslation();
        resetTranslator();
        }


    //JQUERY EVENT HANDLERS

    $("#to_translate").html(word_to_translate); //initial random word to translate

    $("#input_record").click(function() { //what to do when "See Answer" button clicked
        updateTranslator();
        });

    $( "#input_text" ).autocomplete({
        minLength: 2,
        source: autocomplete_words,
        select: function( event, ui ) {
            $("#input_text").val(ui.item.label); //places selected autocomplete text into textbox
            updateTranslator();
            event.preventDefault(); //no default even behavior for autocomplete
            }
        });

    $("#input_text").keypress(function(event) { //accepts incomplete "Enter" submitted answers
        if (event.which == 13) {
            event.preventDefault();
            updateTranslator();
            }
        });


});
