// This allows the Javascript code inside this block to only run when the page
// has finished loading in the browser.
$(function() {
    var lang_to = "English";
    var lang_from = "Spanish";
    var current_dict = dicts[lang_to][lang_from]; //keys: words in @lang_to, values: corresponding words in @lang_from

    var autocomplete_words = Object.keys(current_dict);
    var translator_state = "no_input";
    var len_dict = Object.keys(current_dict).length;
    var word_to_translate = "espejo";
    var translation = "mirror";

    function correctTranslation() {
        var text_input = $("#input_text").val();
        var table = document.getElementById("answers_block");
        var row = table.insertRow(0);
        if (text_input == translation) {
            cell1 = row.insertCell(0);
            cell2 = row.insertCell(1);
            cell3 = row.insertCell(2);
            cell1.innerHTML = word_to_translate;
            cell2.innerHTML = text_input;
            cell3.innerHTML = '<span class="ui-icon ui-icon-check"></span>';
            $(cell1).addClass("correct");
            $(cell2).addClass("correct");
            }
        else {
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

    function resetTranslator() {
        var rand_num = Math.floor((Math.random() * len_dict) + 1);
        translation = autocomplete_words[rand_num];
        word_to_translate = current_dict[translation];
        $("#to_translate").html(current_dict[translation]);
        document.getElementById("input_text").value="";
        $("#input_text").focus();
        }

    function updateTranslator() {
        if (translator_state == "no_input") {
            document.getElementById("answers_block").deleteRow(0);
            document.getElementById("answers_block").deleteRow(0);
            translator_state = "collecting_inputs";
            }

        correctTranslation();
        resetTranslator();
        }


    $("#input_record").click(function() {
        updateTranslator();
        });

    $("#input_text").keypress(function(event) {
        if (event.which == 13) {
            event.preventDefault();
            updateTranslator();
            }
        });


});
