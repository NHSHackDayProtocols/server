var jsonDocument = {};
var hospitalName = '';
$(function() {
  function render() {
    path_str = window.location.hash;

  }

    $(window).on('hashchange', function() {
        jsonToDom();
    });

  function fetchGuidelineTmp(hospitalName) {
      guidelineJson = [{"children":[{"children":[{"content":"Do this and that","idTitle":"adults-default","title":"adults generic","type":"information"}],"idTitle":"adults","title":"adults","type":"category"},{"children":[{"content":"<html>...","idTitle":"line-1","title":"1st line","type":"information"},{"content":"<html>...","idTitle":"line-2","title":"2st line","type":"information"}],"idTitle":"penicilin-alergy","title":"penicilin allergy","type":"category"}],"idTitle":"u-infection","title":"U Infection","type":"category"},{"children":[{"children":[{"content":"Do this and that","idTitle":"adults-default","title":"adults generic","type":"information"}],"idTitle":"adults","title":"adults","type":"category"},{"children":[{"content":"<html>...","idTitle":"line-1","title":"1st line","type":"information"},{"content":"<html>...","idTitle":"line-2","title":"2st line","type":"information"}],"idTitle":"penicilin-alergy","title":"penicilin allergy","type":"category"}],"idTitle":"b-infection","title":"B Infection","type":"category"}];
      jsonDocument = {'type': 'category', 'title': 'Protocols', 'children': guidelineJson};
      var guidelineHtml = jsonToDom();
  }
  /**
   * fetch the guidelines for a particular hospital
   */
  function fetchGuideline(hospitalName) {
    var url = '/services/getHospitalProtocols/' + encodeURI(hospitalName);
    $.getJSON(url, function(guidelineJson) {
      jsonDocument = {'title': 'Protocols', 'children': guidelineJson};
      // TODO:
      // var guidelineHtml = jsonToDom();
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
    var current = jsonDocument;
    var breadcrumb = [];
    path_str = window.location.hash;
    if(path_str) {
      path_str = path_str.substring(1);
      path_arr = path_str.split('/');
      path_arr.shift();
      for(x = 0; x < path_arr.length; x++) {
        breadcrumb.push('<li><a href="#">' + current.title + '</a><span class = "divider">/</span></li>');
        current = current.children[parseInt(path_arr[x])];
      }
      $("#breadcrumb").html(breadcrumb.join(""));
    } else {
      path_str = encodeURI(hospitalName);
    }

    if(current.type == 'category') {
      cat = []
      // we're in a category view


        path_str = window.location.hash;
        path_str = path_str.substring(1);
        path_arr = path_str.split('/');
        path_arr.shift();

        var pathIdString = "";

        for(var i = 0; i < path_arr.length; i++){
            pathIdString += path_arr[i] + "/";
        }

      $.each(current.children, function(k,v) {
        cat.push('<tr><td><input id="' + pathIdString.slice(0, -1) + ".title"
            + '" onchange="onChangeHandler(event)" value="'
            + v.title + '"/></td><td><a href="#'
            + path_str + '/' + k + '">' + ">>>"
            + '</a></td><td>Modified two days ago</td></tr>');
      });
      $("#catTable table").html(cat.join(''));
      $("#categories").show();
    } else {
      // we're in a content view
    }
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
      updater: function(hospital) {
        hospitalName = hospital;
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
});