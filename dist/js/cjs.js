AOS.init({
  duration: 1500
});

$(function() {
  var $wn = $(window);
  var typer = document.querySelector(".auto-typing"),
    typerText = "call us now...015879898",
    describtion = document.querySelector(".letter-describtion"),
    setCont,
    i = 0;
  typer.textContent = "";

  function type() {
    if (i < typerText.length) {
      typer.textContent += typerText[i];

      i++;
    } else {
      clearInterval(setCont);
    }
  }

  var handleAutoTyping = function() {
    var scrollValue = $(this).scrollTop();
    if (scrollValue >= $(".auto-typing").offset().top - 600) {
      if (typer.textContent === "") setInterval(type, 100);
      $wn.off("scroll", handleAutoTyping);
    }
  };
  $wn.scroll(handleAutoTyping);

  /*letters*/
  var letters = $("embed");
  letters.hover(
    function() {
      describtion.textContent = $(this).data("typing");
    },

    function() {
      describtion.textContent = "";
    }
  );
  /*
     #########
     navbar settings
     #########
     */

  /*navbar scroll*/

  $("nav li").on("click", function(e) {
    e.preventDefault();

    $("body,html").animate(
      {
        scrollTop: $("#" + $(this).data("scroll")).offset().top - 100
      },
      1000
    );

    /*navbar-active*/
    $("nav li a").removeClass("custom-active");
    $(this)
      .children("a")
      .addClass("custom-active");
  });
  /*navbar opacity */
  $wn.scroll(function() {
    $(this).scrollTop() === 0
      ? $("nav").css("opacity", "1")
      : $("nav").css("opacity", "0.8");

    /*active on scroll*/
    $("section").each(function() {
      if ($wn.scrollTop() > $(this).offset().top - 150) {
        if ($(this).attr("id")) {
          $("nav li a").removeClass("custom-active");
          $("nav li[data-scroll=" + $(this).attr("id") + "]")
            .find("a")
            .addClass("custom-active");
          /*show button button*/
          var scrollButton = $(".fa-chevron-circle-up");
          if ($wn.scrollTop() > $("#services").offset().top - 150) {
            if (scrollButton.is(":hidden")) scrollButton.show(500);
          } else {
            scrollButton.hide(500);
          }
        }
      }
    });
  });

  /*click scroll button*/
  $(".fa-chevron-circle-up").on("click", function() {
    $("body,html").animate(
      {
        scrollTop: 0
      },
      1000
    );
  });

  /*show inquiry on click*/
  $(".fa-comments").on("click", function(e) {
    e.stopPropagation();

    var chatBox = $(".chat");
    chatBox.click(function(e) {
      e.stopPropagation();
    });
    chatBox.fadeToggle(400, function() {
      $("body").click(function(ev) {
        chatBox.fadeOut();
      });

      $(document).keydown(function(e) {
        if (e.keyCode === 27) {
          chatBox.fadeOut();
        }
      });
    });
  });

  /*toggler*/
  $("#toggler").click(function() {
    $(this).toggleClass("off");
    $(".hiring").toggleClass("opacity0");
  });

  /*readmore/less*/

  var btn = $(".jumbotron a");
  btn.on("click", function() {
    $(this).toggleClass("readLess");
    btn.text("Read more");
    $(".readLess").text("Read less");
  });

  /*color boc*/
  $(".fa-cog").on("click", function() {
    $(".color-box").stop();
    $(".color-box").toggle(500);
  });

  $("#default").on("click", function() {
    $("link[data-style='true']").attr("href", "style/css/default.css");
  });

  $("#style1").on("click", function() {
    $("link[data-style='true']").attr("href", "style/css/style1.css");
  });

  /*time line */
  var timeLineScale = $wn.innerWidth() < 500 ? 1000 : 300;
  $wn.scroll(function() {
    $(".timeline__bullet").each(function() {
      if (
        parseInt($wn.scrollTop()) >=
        parseInt($(this).offset().top) - timeLineScale
      ) {
        if (!$(this).hasClass("wiggle")) {
          $(this)
            .addClass("wiggle")
            .find(".card-custom")
            .addClass("active");
          $(this)
            .find(".inner")
            .addClass("active");
        }
      } else {
        $(this)
          .removeClass("wiggle")
          .find(".card-custom")
          .removeClass("active");
        $(this)
          .find(".inner")
          .removeClass("active");
      }
    });
  });

  //statisitcs

  var statScale = $wn.innerWidth() < 500 ? 700 : 150;
  var statCountHandler = function(e) {
    if (
      parseInt($wn.scrollTop()) >=
      parseInt($(".team-work").offset().top - statScale)
    ) {
      $(".statisitic").each(function() {
        var numSpan = $(this).find(".number");
        var cc = 0;
        var setIntContianer = setInterval(function() {
          numSpan.text(cc);
          cc += 1;
          if (cc === numSpan.data("count")) {
            clearInterval(setIntContianer);
          }
        }, 10);
        $wn.off("scroll", statCountHandler);
      });
    }
  };
  $wn.scroll(statCountHandler);
});
