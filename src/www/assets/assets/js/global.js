var jsonDocument = {};
var hospitalName = '';
$(function() {
  if(window.location.hash) {
    fetchGuidelineTmp(hospitalName);
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
    var path_arr = [];
    var path_str = window.location.hash;
    if(path_str) {
      path_str = path_str.substring(1);
      path_arr = path_str.split('/');
      hospital = path_arr.shift();
      if(hospitalName == '') {
        hospitalName = hospital.replace('%20', ' ');
        fetchGuidelineTmp(hospitalName);
        return;
      }
    } else {
      path_str = encodeURI(hospitalName);
    }

    path_so_far = '#' + encodeURI(hospitalName);
    breadcrumb.push('<li><a href="' + path_so_far + '">' + hospitalName + '</a><span class = "divider">/</span></li>');
    for(x = 0; x < path_arr.length; x++) {
      path_so_far += '/' + path_arr[x];
      breadcrumb.push('<li><a href="' + path_so_far + '">' + current.title + '</a><span class = "divider">/</span></li>');
      current = current.children[parseInt(path_arr[x])];
    }
    $(".breadcrumb").html(breadcrumb.join(""));


    var path_str = window.location.hash;
    path_str = path_str.substring(1);
    var path_arr = path_str.split('/');
    path_arr.shift();

    var pathIdString = "";

    


    if(current.type == 'category') {
      for(var i = 0; i < path_arr.length; i++){
        pathIdString += path_arr[i] + "/";
    }
      cat = []
      // we're in a category view


      $.each(current.children, function(k,v) {
        cat.push('<tr><td><input id="' + pathIdString + k + ".title"
            + '" onchange="onChangeHandler(event)" value="'
            + v.title + '"/></td><td><a href="#'
            + path_str + '/' + k + '">' + ">>>"
            + '</a></td><td>Modified two days ago</td></tr>');
      });
      $("#catTable table").html(cat.join(''));
      $("#categories").show();
    } else {
      for(var i = 0; i < path_arr.length; i++){
        pathIdString += path_arr[i] + "/";
      }
      pathIdString = pathIdString.slice(0, -1);
      // we're in a content view
       $("#catTable table").html('<tr><td>'
            + current.title + '</td><td><input id="' + pathIdString + ".content"
            + '" onchange="onChangeHandler(event)" value="'
            + current.content + '"/></td><td>Modified two days ago</td></tr>');
       $("#categories").show();
    }
  }

  /**
   * 
   * save the full set of guidelines that are currently in the DOM
   */
   $("#saveContBtn").click(function(event) {
    event.preventDefault();  
    $.ajax({
      'beforeSend': function(xhr) {
          xhr.setRequestHeader("Authentication", "Basic " + btoa(
            $("input#username").val() + ":" + $("input#password").val())
          ) //May need to use "Authorization" instead
      },

      type: "POST",
      url: "/services/updateHospitalProtocols",
      data: JSON.stringify({'hospitalName': hospitalName, 'protocols': jsonDocument}),
      success: function(){
        console.log("Updated")
      },
      error:function(){
          console.log("error");
      },   
      dataType: 'application/json'
    });
  });

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