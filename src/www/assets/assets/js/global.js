$(function() {
  /**
   * fetch the guidelines for a particular hospital
   */
  function fetchGuideline(hospitalName) {
    var url = '/services/getHospitalProtocols/' + encodeURI(hospitalName);
    $.getJSON(url, function(guidelineJson) {
      console.log(guidelineJson);
      // TODO:
      // var guidelineHtml = jsonToDom(guidelineJson);
      // $("#guideline").html(guidelineHtml);
    }).fail(function() {
      console.log("No data");
      $("#guideline").html('<p>No guideline data</p><div class="span5"><a href="#newCategoryModal" id="newCategoryBtn" role="button" class="btn btn-success btn-small" data-hierarchy="/" data-toggle="modal">New Category</a></div>');
    });
  }

  /**
   * TODO
   * parse the dom, and return a json object
   */
  function domToJson() {
    // TODO
  }

  /**
   * TODO
   * parse json, and return some HTML
   */
  function jsonToDom(guidelineJson) {
    // TODO
  }

  /**
   * TODO
   * save the full set of guidelines that are currently in the DOM
   */
  function saveGuideline() {
    // TODO:
    // var guidelineJson = domToJson();
    // $.post('/services/updateHospitalProtocols', guidelineJson);
  }

  /**
   * populate the hospital list.
   * we should do this server side really
   */
  $.getJSON('/services/hospitalList', function(data) {
    var hospitalNames = [];
    $.each(data, function(k, hospital) {
      hospitalNames.push(hospital.name);
    });
    $('#hospital_select').typeahead({
      source: hospitalNames,
      items: 4,
      updater: function(hospitalName) {
        fetchGuideline(hospitalName);
      }
    });
  });

  $("#saveCategory").on("click", function() {
    var val = $("#categoryName").val();
    $("#categoryName").val("");
    // TODO:
    // Add the category to the right place in the structure
    // saveGuideline();
    $("#newCategoryModal").modal('hide');
  });
    console.log('wtf');

});