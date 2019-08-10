// Get references to page elements.
var $exampleText = $("#example-text");
var $exampleDescription = $("#example-description");
var $submitBtn = $("#submit");
var $exampleList = $("#example-list");

// The API object contains methods for each kind of request we'll make
var API = {
  saveExample: function (example) {
    return $.ajax({
      headers: {
        "Content-Type": "application/json"
      },
      type: "POST",
      url: "api/examples",
      data: JSON.stringify(example)
    });
  },
  createUser: function (user) {
    return $.ajax({
      headers: {
        "Content-Type": "application/json"
      },
      type: "POST",
      url: "api/users",
      data: JSON.stringify(user)
    });
  },
  getExamples: function () {
    return $.ajax({
      url: "api/examples",
      type: "GET"
    });
  },
  loginUser: function (user) {
    console.log(user)
    return $.ajax({
      url: "api/users/" + user.email,
      type: "GET"
    });
  },
  deleteExample: function (id) {
    return $.ajax({
      url: "api/examples/" + id,
      type: "DELETE"
    });
  }
};

// refreshExamples gets new examples from the db and repopulates the list
var refreshExamples = function () {
  API.getExamples().then(function (data) {
    var $examples = data.map(function (example) {
      var $a = $("<a>")
        .text(example.text)
        .attr("href", "/example/" + example.id);

      var $li = $("<li>")
        .attr({
          class: "list-group-item",
          "data-id": example.id
        })
        .append($a);

      var $button = $("<button>")
        .addClass("btn btn-danger float-right delete")
        .text("ｘ");

      $li.append($button);

      return $li;
    });

    $exampleList.empty();
    $exampleList.append($examples);
  });
};

// handleFormSubmit is called whenever we submit a new example
// Save the new example to the db and refresh the list
var handleFormSubmit = function (event) {
  event.preventDefault();

  var example = {
    text: $exampleText.val().trim(),
    description: $exampleDescription.val().trim()
  };

  if (!(example.text && example.description)) {
    alert("You must enter an example text and description!");
    return;
  }

  API.saveExample(example).then(function () {
    refreshExamples();
  });

  $exampleText.val("");
  $exampleDescription.val("");
};

// handleDeleteBtnClick is called when an example's delete button is clicked
// Remove the example from the db and refresh the list
var handleDeleteBtnClick = function () {
  var idToDelete = $(this)
    .parent()
    .attr("data-id");

  API.deleteExample(idToDelete).then(function () {
    refreshExamples();
  });
};

var handleSignUp = function () {
  event.preventDefault();
  console.log("sign up clicked");

  if ($("#password").val() !== $("#rep-password").val()) {
    alert("password is not the same")
  }
  else {
    var user = {
      name: $("#name").val(),
      email: $("#email").val(),
      password: $("#password").val(),
    }
    console.log(user);
    API.createUser(user).then(function () {
      console.log("we are back from registering a new user")
    });
  };
}
  var handleLogin = function () {
    event.preventDefault();
    console.log("log in clicked");
    //************************ */ VERIFY PASSWORD ENTERED = PASSWORD IN DB
    // if ($("#password").val() !== $("#rep-password").val()) {
    //   alert("incorrect password entered")
    // }
    // else {
    var user = {
      email: $("#emaillogin").val(),
      password: $("#passlogin").val(),
    }
    console.log(user);
    API.loginUser(user).then(function (dbUser) {
      console.log("we are back from logging in a user: ", dbUser)
      //*********************** */ RENDER NEW PAGE
    });
  };

  var  handleToggleSignUp =function(){
    $("#registerTab").click();
  };

  var  handleToggleLogIn =function(){
    $("#loginTab").click();
  };


  // Add event listeners to the submit and delete buttons
  $submitBtn.on("click", handleFormSubmit);
  $exampleList.on("click", ".delete", handleDeleteBtnClick);
  $("#signup").on("click", handleSignUp);
  $("#login").on("click", handleLogin);
  $("#register").on("click", handleToggleSignUp);
  $("#loginAccount").on("click", handleToggleLogIn);
