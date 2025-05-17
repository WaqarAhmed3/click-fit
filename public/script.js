$(document).ready(function () {
  $.ajax({
    url: "http://numbersapi.com/1/30/date?json",
    method: "GET",
    beforeSend: function () {
      $("#factLoading").removeClass("d-none");
      $("#factContent").addClass("d-none");
      $("#factError").addClass("d-none");
    },
    success: function (data) {
      $("#factText").text(data.text);
      $("#factLoading").addClass("d-none");
      $("#factContent").removeClass("d-none");
    },
    error: function () {
      $("#factLoading").addClass("d-none");
      $("#factError").removeClass("d-none");
    },
  });

  $(".navbar-nav .nav-link").on("click", function () {
    if ($(".navbar-toggler").is(":visible")) {
      $(".navbar-collapse").collapse("hide");
    }
  });

  $(window).on("scroll", function () {
    const scrollPos = $(document).scrollTop();

    $(".navbar-nav .nav-link").each(function () {
      const currLink = $(this);
      const refElement = $(currLink.attr("href"));

      if (
        refElement.length &&
        refElement.offset().top - 80 <= scrollPos &&
        refElement.offset().top + refElement.outerHeight() > scrollPos
      ) {
        $(".navbar-nav .nav-link").removeClass("active");
        currLink.addClass("active");
      }
    });
  });

  let selectedFiles = [];

  $("#browseBtn").on("click", () => $("#fileInput").click());

  $("#fileInput").on("change", function () {
    selectedFiles = Array.from(this.files);
    displayPreviews();
  });

  $("#dropArea")
    .on("dragover", function (e) {
      e.preventDefault();
      $(this).addClass("dragover");
    })
    .on("dragleave", function () {
      $(this).removeClass("dragover");
    })
    .on("drop", function (e) {
      e.preventDefault();
      $(this).removeClass("dragover");
      selectedFiles = Array.from(e.originalEvent.dataTransfer.files);
      displayPreviews();
    });

  function displayPreviews() {
    $("#previewContainer").empty();

    if (selectedFiles.length === 0) {
      $("#previewMessage").show();
      return;
    } else {
      $("#previewMessage").hide();
    }

    selectedFiles.forEach((file, index) => {
      const reader = new FileReader();

      reader.onload = function (e) {
        const wrapper = $("<div>").addClass("preview-thumbnail-wrapper");

        const img = $("<img>").attr("src", e.target.result);

        const removeBtn = $("<span>")
          .addClass("remove-image")
          .html("&times;")
          .on("click", () => {
            selectedFiles.splice(index, 1);
            displayPreviews();
          });

        wrapper.append(img).append(removeBtn);
        $("#previewContainer").append(wrapper);
      };

      reader.readAsDataURL(file);
    });
  }

  $("#uploadBtn").on("click", function () {
    if (selectedFiles.length === 0) {
      $("#uploadStatus").text("Please select some images first.");
      return;
    }

    const formData = new FormData();
    selectedFiles.forEach((file) => formData.append("images", file));

    $.ajax({
      url: "/upload",
      method: "POST",
      data: formData,
      contentType: false,
      processData: false,
      success: function () {
        $("#uploadStatus")
          .text("Images uploaded successfully!")
          .removeClass("text-danger")
          .addClass("text-success");
        selectedFiles = [];
        $("#previewContainer").empty();
        $("#previewMessage").show();
        setTimeout(() => {
          $("#uploadStatus").empty();
        }, 2000);
      },
      error: function () {
        $("#uploadStatus").text("Upload failed.").addClass("text-danger");
      },
    });
  });
});
