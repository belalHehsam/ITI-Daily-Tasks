function createModal(cssProperties) {
  cssProperties["position"] = "fixed";
  cssProperties["left"] = "50%";
  cssProperties["top"] = "50%";
  cssProperties["transform"] = "translateX(-50%) translateY(-50%)";
  cssProperties["display"] = "none";
  var modal = $("<div>").css(cssProperties).attr("id", "modal");

  $("body").append(modal);
  return modal;
}

function createGallery() {
  var curr = 0;
  var MAX_IMAGES = 8;

  var speed = 400;

  var left = $("<img>").attr("src", "./images/left.png").css({
    width: "40px",
    position: "absolute",
    top: "50%",
    transform: "translateY(-50%)",
    left: "-50px",
    cursor: "pointer",
  });


  left.click(function () {
    imgPreview.animate({ left: "100%", opacity: 0 }, speed, function () {
      curr = (curr - 1 + MAX_IMAGES) % MAX_IMAGES;
      imgPreview
        .attr("src", "./images/" + (curr + 1) + ".jpg")
        .css({ left: "-100%", opacity: 0 })
        .animate({ left: "0", opacity: 1 }, speed, "linear");
    });
  });


  var right = $("<img>").attr("src", "./images/right.png").css({
    width: "40px",
    position: "absolute",
    transform: "translateY(-50%)",
    top: "50%",
    right: "-50px",
    cursor: "pointer",
  });


  right.click(function () {
    imgPreview.animate({ left: "-100%", opacity: 0 }, speed, function () {
      curr = (curr + 1) % MAX_IMAGES;
      imgPreview
        .attr("src", "./images/" + (curr + 1) + ".jpg")
        .css({ left: "100%", opacity: 0 })
        .animate({ left: "0", opacity: 1 }, speed, "linear");
    });
  });

  var imgPreview = $("<img>").attr("src", "./images/1.jpg").css({
    width: "100%",
    height: "100%",
    overflow: "hidden",
    position: "absolute",
    left: "0",
    top: "0",
  });

  modal = createModal({
    width: "384px",
    height: "174px",
  });
  left.appendTo(modal);
  imgPreview.appendTo(modal);
  right.appendTo(modal);

  modal.fadeIn();
}

function createSlideDownMenu() {
  var menu = $("#services-btn ul");

  if (menu.length === 0) {
    var items = [];
    for (var i = 0; i < 3; i++) {
      items.push(
        $("<li>")
          .text("item #" + (i + 1))
          .css({
            backgroundColor: "#f36da4",
            textAlign: "center",
            borderRadius: "10px",
            padding: "10px",
            width: "100%",
            fontSize: "16px",
          }),
      );
    }

    menu = $("<ul>").hide().append(items).css({
      width: "100%",
      position: "absolute",
      top: "100%",
      left: "0",
      marginTop: "8px",
      padding: "0",
      listStyle: "none",
    });

    $("#services-btn").css({ position: "relative" }).append(menu);
  }

  menu.slideToggle("slow");
}

function showComplainSummary(data) {
  var modal = $("#modal");
  modal.empty().css({
    width: "400px",
    height: "300px",
    backgroundColor: "#fff",
    padding: "20px",
  });

  var fields = [
    { label: "Your complain is : ", value: data.complain },
    { label: "Your name is ", value: data.name },
    { label: "Your email is ", value: data.email },
    { label: "Your phone is ", value: data.phone },
  ];

  for (let i = 0; i < fields.length; i++) {
    var item = fields[i];
    var p = $("<p>").css({ margin: "5px 0", fontSize: "18px" });
    var label = $("<span>").text(item.label);
    var value = $("<span>").text(item.value).css("font-weight", "bold");
    p.append(label, value).appendTo(modal);
  }

  $("<button>")
    .text("Back to edit")
    .css({ marginTop: "20px", cursor: "pointer", padding: "5px 10px" })
    .click(function () {
      createComplainForm(data);
    })
    .appendTo(modal);
}

function createComplainForm(prevData) {
  var modal = $("#modal").length ? $("#modal") : createModal({});

  modal.empty().css({
    width: "400px",
    height: "auto",
    minHeight: "350px",
    backgroundColor: "#fff",
    padding: "30px",
    boxShadow: "0px 12px 14px rgba(0,0,0, 0.4)",
    display: "flex",
    flexDirection: "column",
    alignItems: "center",
  });

  function createInputRow(labelText, id, value) {
    var row = $("<div>").css({
      marginBottom: "10px",
      width: "100%",
      textAlign: "center",
    });
    var label = $("<label>")
      .text(labelText + " ")
      .attr("for", id);
    var input = $("<input>")
      .attr({ type: "text", id: id })
      .val(value || "")
      .css("width", "200px");
    return row.append(label, input);
  }

  var nameRow = createInputRow(
    "Name:",
    "comp-name",
    prevData ? prevData.name : "",
  );
  var emailRow = createInputRow(
    "Email:",
    "comp-email",
    prevData ? prevData.email : "",
  );
  var phoneRow = createInputRow(
    "Phone:",
    "comp-phone",
    prevData ? prevData.phone : "",
  );

  var complainLabel = $("<p>")
    .text("Complain:")
    .css({ textAlign: "center", margin: "10px 0 5px 0" });
  var complainText = $("<textarea>")
    .attr("id", "comp-text")
    .val(prevData ? prevData.complain : "")
    .css({ width: "280px", height: "80px", marginBottom: "15px" });

  var sendBtn = $("<button>")
    .text("send")
    .css({ cursor: "pointer", padding: "2px 15px" })
    .click(function () {
      var data = {
        name: $("#comp-name").val(),
        email: $("#comp-email").val(),
        phone: $("#comp-phone").val(),
        complain: $("#comp-text").val(),
      };
      showComplainSummary(data);
    });

  modal.append(
    nameRow,
    emailRow,
    phoneRow,
    complainLabel,
    complainText,
    sendBtn,
  );
  modal.fadeIn();
}

$(document).ready(function () {
  $(".container .btn").each(function () {
    $(this).click(function () {
      if ("#modal".length) $("#modal").remove();
    });
  });
  $("#about-btn").click(function () {
    var modal = createModal({
      width: "500px",
      height: "200px",
      backgroundColor: "#fff",
      boxShadow: "0px 12px 14px rgba(0,0,0, 0.4)",
    });
    $("<p>")
      .css({ textAlign: "center" })
      .text("Story About snow man")
      .appendTo(modal);
    modal.fadeIn();
  });

  $("#gallery-btn").click(function () {
    createGallery();
  });

  $("#services-btn").click(function () {
    createSlideDownMenu();
  });

  $("#complain-btn").click(function () {
    if ($("#modal").length) $("#modal").remove();
    createComplainForm();
  });
});
