new WOW().init();
jQuery.validator.addMethod(
  "usPhoneFormat",
  function(value, element) {
    return (
      this.optional(element) ||
      /\d{1}[\(]\d{3}[\)]\d{3}[\-]\d{2}[\-]\d{2}/.test(value)
    );
  },
  "Enter a valid phone number."
);
$(window).on("load resize", function() {
  var pagew = $(window).outerWidth();
  var c_width = $(".one .container").outerWidth() - 30;
  $(".fw_item").css("width", "calc(100% + " + (pagew - c_width) / 2 + "px)");
});
function loadProjectGallery(parent, project, count){
  for(let i = 2; i<=count; i++){
    let $a = $(`<a data-fancybox="${project}" href="img/galery/${project}/${i}.jpg" style="display: none;"/>`)
    $a.appendTo(parent);
  }
}
$(window).on("load resize scroll", function() {
  var offset = $(".center_div").offset().top - 235;
  $(".line_wrp span").css("height", offset);
  $(".anchor_page").each(function() {
    if (offset > $(this).offset().top - 235) {
      $(this).addClass("activeS");
    } else {
      $(this).removeClass("activeS");
    }
  });
});
$(window).on("load scroll", function() {
  if ($(window).scrollTop() > 90) {
    $("header").addClass("fixMe");
  } else {
    $("header").removeClass("fixMe");
  }
});
$(document).ready(function() {
  loadProjectGallery('#nemo', 'capitan-nemo', 37);
  loadProjectGallery('#lenynsky', 'lenynsky', 46);
  loadProjectGallery('#moscow', 'moscow', 37);
  loadProjectGallery('#premier-palas', 'premier-palas', 39);
  loadProjectGallery('#kudrovo', 'kudrovo', 31);
  loadProjectGallery('#ohta', 'ohta', 21);
  loadProjectGallery('#parnas', 'parnas', 48);
  loadProjectGallery('#uralskaya', 'uralskaya', 23);
  loadProjectGallery('#small', 'small', 14);
  loadProjectGallery('#warm', 'warm', 22);
  var textArray = [
    "Каждый проект – авторский",
    "Творческий подход к решению технических заданий",
    "Поэтапная оплата удобным способом",
    "Авторский надзор",
  ];
  var index = 0;
  setInterval(function() {
    $(".changet").animate(
      {
        opacity: 0,
      },
      600,
      function() {
        if (textArray.length > index) {
          $(this)
            .text(textArray[index])
            .animate({ opacity: 1 }, 600);
          index++;
        } else index = 0;
      }
    );
  }, 4000);

  $("input[name='phone']").mask("0(000)000-00-00");
  $(".pressing").click(function() {
    $(this).toggleClass("pressed");
    $(this)
      .closest("form")
      .find(".normb")
      .toggleClass("noActive")
      .prop("disabled", function(i, v) {
        return !v;
      });
  });
  $(".pressing span").click(function(e) {
    e.preventDefault();
    $("#politika").modal("toggle");
  });
  $(".cases_slider").owlCarousel({
    loop: true,
    margin: 30,
    nav: false,
    dots: false,
    autoWidth: true,

    responsive: {
      0: {
        items: 1,
      },
      600: {
        items: 1,
      },
      1000: {
        items: 1,
      },
    },
  });
  $(".steps_carousel").owlCarousel({
    loop: false,
    margin: 30,
    nav: false,
    dots: false,
    autoWidth: true,
    responsive: {
      0: {
        items: 1,
      },
      600: {
        items: 1,
      },
      1000: {
        items: 1,
      },
    },
  });
  $(".go_prev").click(function() {
    $(this)
      .closest(".controls_car")
      .prev(".fw_item")
      .find(".owl-carousel")
      .trigger("prev.owl.carousel");
  });
  $(".go_next").click(function() {
    $(this)
      .closest(".controls_car")
      .prev(".fw_item")
      .find(".owl-carousel")
      .trigger("next.owl.carousel");
  });
  $(".step_item_wrp").mouseover(function() {
    $(this).addClass("active");
  });
  $(".steps_carousel").on("changed.owl.carousel", function(event) {
    $(".step_item_wrp").mouseover(function() {
      $(this).addClass("active");
    });
  });
  $("a[href^=#]")
    .not(".media")
    .click(function(e) {
      e.preventDefault();
      var id = $(this).attr("href");
      $("html,body").animate({ scrollTop: $(id).offset().top - 70 }, 500);
    });

  $(".modal").on("hidden.bs.modal", function() {
    $(window).resize();
  });
  $(".open_nav").click(function() {
    $(".normal_nav").slideToggle(300);
    $(this).toggleClass("openedNav");
    if ($(".open_nav").hasClass("openedNav")) {
      $(".open_nav")
        .find("img")
        .attr("src", "img/close_nav.svg");
    } else {
      $(".open_nav")
        .find("img")
        .attr("src", "img/menu.svg");
    }
  });
  if ($(window).outerWidth() < 992) {
    $(".normal_nav a").click(function() {
      $(".normal_nav").slideUp(300);
      $(".open_nav")
        .find("img")
        .attr("src", "img/menu.svg");
      $(".open_nav").removeClass("openedNav");
    });
  }
  $("form").each(function() {
    var forma = $(this);
    $(forma).validate({
      rules: {
        phone: {
          required: true,
          usPhoneFormat: true,
        },
      },
      submitHandler: function(form) {
        $.ajax({
          type: "POST",
          url: "mail.php",
          data: $(forma).serialize(),
          success: function(html) {
            $(".modal").modal("hide");

            $("#t").modal("toggle");
            if (
              $(forma)
                .closest(".modal")
                .attr("id") == "quiz"
            ) {
              $(".thanks_modal .tht2").text(
                "Ваши ответы уже у нас! Не терпится узнать о вашем помещении больше :) Мы с вяжемся с вами в течение 10 минут в рабочее время с 10:00 до 19:00 "
              );
            } else {
              $(".thanks_modal .tht2").text(
                "Ваша заявка уже у нас! Мы с вяжемся с вами в течение 10 минут в рабочее время с 10:00 до 19:00 "
              );
            }

            if ($(form).hasClass("reachg1")) {
              ym(56625307, "reachGoal", "Button1");
            }
            if ($(form).hasClass("reachg2")) {
              ym(56625307, "reachGoal", "Button2");
            }
            if ($(form).hasClass("reachg3")) {
              ym(56625307, "reachGoal", "Button3");
            }
            if ($(form).hasClass("reachg5")) {
              ym(56625307, "reachGoal", "Button5");
            }
          },
        });
        return false;
      },
    });
  });
  $(".reachg4").click(function() {
    ym(56625307, "reachGoal", "Button4");
  });
  //$('#recall').modal('toggle')
  $(".ch_item").click(function() {
    if (
      $(this)
        .closest(".check_wrp")
        .hasClass("multiple")
    ) {
      $(this).toggleClass("checked");
    } else {
      $(this)
        .closest(".check_wrp")
        .find(".ch_item")
        .removeClass("checked");
      $(this).addClass("checked");
    }
    if (
      $(this)
        .closest(".check_wrp")
        .find("input").length > 0
    ) {
      $(".check_wrp input").val("");
      $(".if_c").removeClass("checked");
    }
  });
  $(".check_wrp input").change(function() {
    if ($(this).val() != "") {
      $(this)
        .closest(".check_wrp")
        .find(".ch_item")
        .removeClass("checked");
      $(".if_c").addClass("checked");
      $(".if_c p").text($(".check_wrp input").val());
    } else {
      $(this)
        .closest(".check_wrp")
        .find(".ch_item")
        .removeClass("checked");
      $(".check_wrp input").val("");
      $(".if_c").removeClass("checked");
    }
  });
  var counter = 1;
  var answers = [];
  function summarize() {
    answers = [];
    $(".q_item")
      .not(".step4")
      .each(function() {
        var qu = $(this)
          .find(".q_ttle")
          .text();
        var an = $(this)
          .find(".checked p")
          .text();
        answers += qu + "\n" + "- " + an + "\n\n\n";
      });
    $(".chosen").val(answers);
    if (counter == 4) {
      $("#quiz .mt1").text("Благодарим за ответы!");
      $("#quiz .mt2").text(
        "Укажите номер телефона, чтобы мы связались с вами и ознакомили с подходящим для вас проектом"
      );
    }
  }
  $(".next_but").click(function() {
    if (
      $(this)
        .closest(".check_wrp")
        .find(".checked").length > 0
    ) {
      counter++;
      $(".q_item").hide();
      $(".step" + counter + "").show();
    } else {
      alert("Необходимо выбрать вариант ответа!");
    }
    summarize();
  });
  $(".prev_but").click(function() {
    counter--;
    $(".q_item").hide();
    $(".step" + counter + "").show();
    summarize();
  });
});
$(document).mouseup(function(e) {
  var container = $(".open_nav, .normal_nav");

  // if the target of the click isn't the container nor a descendant of the container
  if (!container.is(e.target) && container.has(e.target).length === 0) {
    if ($(window).outerWidth() < 992) {
      $(".normal_nav").slideUp(300);
      $(".open_nav")
        .find("img")
        .attr("src", "img/menu.svg");
      $(".open_nav").removeClass("openedNav");
    }
  }
});

var lastId,
  topMenu = $("header ul.normal_nav"),
  topMenuHeight = 90,
  menuItems = topMenu.find("a"),
  scrollItems = menuItems.map(function() {
    var item = $($(this).attr("href"));
    if (item.length) {
      return item;
    }
  });

$(window).on("load scroll", function(e) {
  var fromTop = $(this).scrollTop() + topMenuHeight;
  var cur = scrollItems.map(function() {
    if ($(this).offset().top < fromTop) return this;
  });
  cur = cur[cur.length - 1];
  var id = cur && cur.length ? cur[0].id : "";

  if (lastId !== id) {
    lastId = id;
    menuItems
      .parent()
      .removeClass("active")
      .end()
      .filter("[href='#" + id + "']")
      .parent()
      .addClass("active");
  }
});
