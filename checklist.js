// add items
$("#add-todo").click(function () {
  var lastSibling = $("#todo-list > .todo-wrap:last-of-type > input").attr(
    "id"
  );
  var newId = Number(lastSibling) + 1;

  $(this).before(
    '<span class="editing todo-wrap"><input type="checkbox" id="' +
      newId +
      '"/><label for="' +
      newId +
      '" class="todo"><i class="fa fa-check"></i><input type="text" class="input-todo" id="input-todo' +
      newId +
      '"/></label></div>'
  );
  $("#input-todo" + newId + "")
    .parent()
    .parent()
    .animate(
      {
        height: "36px",
      },
      200
    );
  $("#input-todo" + newId + "").focus();

  $("#input-todo" + newId + "").enterKey(function () {
    $(this).trigger("enterEvent");
  });

  $("#input-todo" + newId + "").on("blur enterEvent", function () {
    var todoTitle = $("#input-todo" + newId + "").val();
    var todoTitleLength = todoTitle.length;
    if (todoTitleLength > 0) {
      $(this).before(todoTitle);
      $(this).parent().parent().removeClass("editing");
      $(this)
        .parent()
        .after(
          '<span class="delete-item" title="remove"><i class="fa fa-times-circle"></i></span>'
        );
      $(this).remove();
      $(".delete-item").click(function () {
        var parentItem = $(this).parent();
        parentItem.animate(
          {
            left: "-30%",
            height: 100,
            opacity: 0,
          },
          200
        );
        setTimeout(function () {
          $(parentItem).remove();
        }, 1000);
      });
    } else {
      $(".editing").animate(
        {
          height: "0px",
        },
        200
      );
      setTimeout(function () {
        $(".editing").remove();
      }, 400);
    }
  });
});

// remove items

$(".delete-item").click(function () {
  var parentItem = $(this).parent();
  parentItem.animate(
    {
      left: "-30%",
      height: 0,
      opacity: 0,
    },
    200
  );
  setTimeout(function () {
    $(parentItem).remove();
  }, 1000);
});

// Enter Key detect

$.fn.enterKey = function (fnc) {
  return this.each(function () {
    $(this).keypress(function (ev) {
      var keycode = ev.keyCode ? ev.keyCode : ev.which;
      if (keycode == "13") {
        fnc.call(this, ev);
      }
    });
  });
};

// Store locally
$(document).ready(function () {
  $(":checkbox").each(function () {
    let status =
      typeof localStorage.getItem($(this).attr("id")) === "object"
        ? false
        : localStorage.getItem($(this).attr("id")) === "true";
    $(this).prop("checked", status);
    // console.log(status, typeof localStorage.getItem($(this).attr('id')))
  });

  // setItem.

  $(":checkbox").on("change", function () {
    //set the check value of checkbox
    localStorage.setItem($(this).attr("id"), $(this).prop("checked"));
    console.log("updated, ", $(this).attr("id"));
    console.log(localStorage);
  });

  $("#clear").on("click", function () {
    localStorage.clear();
  });
});
