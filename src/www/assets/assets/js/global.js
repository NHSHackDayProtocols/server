var jsonDocument = {};
$(function() {
  function fetchGuidelineTmp(hospitalName) {
      guidelineJson = [{"children":[{"children":[{"content":"Do this and that","idTitle":"adults-default","title":"adults generic","type":"information"}],"idTitle":"adults","title":"adults","type":"category"},{"children":[{"content":"<html>...","idTitle":"line-1","title":"1st line","type":"information"},{"content":"<html>...","idTitle":"line-2","title":"2st line","type":"information"}],"idTitle":"penicilin-alergy","title":"penicilin allergy","type":"category"}],"idTitle":"u-infection","title":"U Infection","type":"category"}];
      jsonDocument = guidelineJson;
      var guidelineHtml = jsonToDom();
  }
  /**
   * fetch the guidelines for a particular hospital
   */
  function fetchGuideline(hospitalName) {
    var url = '/services/getHospitalProtocols/' + encodeURI(hospitalName);
    $.getJSON(url, function(guidelineJson) {
      jsonDocument = guidelineJson;
      // TODO:
      // var guidelineHtml = jsonToDom(guidelineJson);
      // $("#guideline").html(guidelineHtml);
    }).fail(function() {
      console.log("No data");
      $("#guideline").html('<p>No guideline data</p><div class="span5"><a href="#newCategoryModal" id="newCategoryBtn" role="button" class="btn btn-small" data-hierarchy="/" data-toggle="modal">New Category</a><a href="#newTreatModal" id="newTreatBtn" role="button" class="btn btn-success btn-small" data-hierarchy="/" data-toggle="modal">New Treatment</a></div>');
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
  function jsonToDom() {
    var path = window.location.hash.substring(1).split('/');
    var current = guidelineJson[0];
    for(x = 0; x < path.length; x++) {
      current = current.children[parseInt(path[x])];
    }
    console.log(current);
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
        fetchGuidelineTmp(hospitalName);
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