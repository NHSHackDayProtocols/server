var jsonDocument = {};
var hospitalName = '';
var current;
$(function() {
  if(window.location.hash) {
    fetchGuideline(hospitalName);
  }

    $(window).on('hashchange', function() {
        jsonToDom();
    });

  // function fetchGuidelineTmp(hospitalName) {
  //     guidelineJson = 
  //     jsonDocument = {'type': 'category', 'title': 'Protocols', 'children': guidelineJson};
  //     var guidelineHtml = jsonToDom();
  // }
  /**
   * fetch the guidelines for a particular hospital
   */
  function fetchGuideline(hospitalName) {
    var url = '/services/getHospitalProtocols/' + encodeURI(hospitalName);
    $.getJSON(url, function(guidelineJson) {
      jsonDocument = guidelineJson;
      // TODO:
      // var guidelineHtml = jsonToDom();
      // $("#guideline").html(guidelineHtml);
      jsonToDom();
    }).fail(function() {
      console.log("No data");
      $("#guideline").html('<p>No guideline data</p><div class="span5"><a href="#newCategoryModal" id="newCategoryBtn" role="button" class="btn btn-small" data-hierarchy="/" data-toggle="modal">New Category</a><a href="#newTreatModal" id="newTreatBtn" role="button" class="btn btn-success btn-small" data-hierarchy="/" data-toggle="modal">New Treatment</a></div>');
    });
  }
  /**
   * TODO
   * parse json, and return some HTML
   */
  function jsonToDom() {
    current = jsonDocument;
    var breadcrumb = [];
    var path_arr = [];
    var path_str = window.location.hash;
    if(path_str) {
      path_str = path_str.substring(1);
      path_arr = path_str.split('/');
      hospital = path_arr.shift();
      if(hospitalName == '') {
        hospitalName = hospital.replace('%20', ' ');
        fetchGuideline(hospitalName);
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


    path_str = window.location.hash;
    path_str = path_str.substring(1);
    path_arr = path_str.split('/');
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
      $("#newCatBtn").removeAttr("disabled");
      $("#newRespBtn").removeAttr("disabled");
      try{
        if(current.children[0].type == "category"){
          $("#newRespBtn").attr("disabled","disabled"); 
        }else{
          $("#newCatBtn").attr("disabled","disabled"); 
        }
      }catch (e){
        console.log(e);  
      }
      
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
       $("#newRespBtn").attr("disabled","disabled");
        $("#newCatBtn").attr("disabled","disabled");  
    }

  }

  /**
   * 
   * add a new category to the current list
   */
  $("#newCatBtn").click(function(event) {
    if(typeof($(event.target).attr("disabled")) == "undefined"){
      event.preventDefault();  
      current.children.push({
                 "children":[],
                 "idTitle":"default-category",
                 "title":"default category",
                 "type":"category"
              })
      jsonToDom();      
    }
  });

  $("#newRespBtn").click(function(event) {
    if(typeof($(event.target).attr("disabled")) == "undefined"){
      event.preventDefault();  
      current.children.push({
                 "idTitle":"default-information",
                 "title":"default information",
                 "value":"content goes here (html supported)",
                 "type":"information"
              })
      jsonToDom();
    }
  });


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
        fetchGuideline(hospitalName);
      }
    });
  });
});