function siteAlert(status, message, save) {
  if (message) {
    if (status) {
      toastr["success"](message, "Success", {
        closeButton: true,
        tapToDismiss: false,
      });
    } else {
      toastr["error"](message, "Error", {
        closeButton: true,
        tapToDismiss: false,
      });
    }
  }
}
function uniqueId(length) {
  var result = "";
  var characters =
    "ABCDEFGHIJKLMNOPQRSTUVWXYZabcdefghijklmnopqrstuvwxyz0123456789";
  for (var i = 0; i < length; i++)
    result += characters.charAt(Math.floor(Math.random() * characters.length));
  return result;
}
function siteAjaxAlert(success, data, save) {
  if (success) {
    if (data.message != undefined) {
      siteAlert(1, data.message, save);
    }
  } else {
    if (
      data.responseJSON != undefined &&
      data.responseJSON.message != undefined
    ) {
      siteAlert(0, data.responseJSON.message, save);
    } else if (data.responseMessage != undefined) {
      siteAlert(0, data.responseMessage, save);
    } else if (data.message != undefined) {
      siteAlert(0, data.message, save);
    } else if (data.statusText != undefined) {
      siteAlert(0, data.statusText, save);
    }
  }
}

function siteSelect2(eles) {
  eles = typeof eles == "string" ? jQuery(eles) : eles;
  if (eles.length) {
    eles.each(function () {
      let self = jQuery(this);
      if (self.hasClass("select2-hidden-accessible")) {
        self.select2("destroy");
      }

      self.select2({
        // theme: 'bootstrap4',
        dropdownAutoWidth: true,
        width: "100%",
        allowClear: true,
        placeholder: "Please Select",
        dropdownParent: self.parent(),
      });
    });
  }
}
siteSelect2(".select2");

function siteFormValidationApply(form, params) {
  params = Object.assign(params, {
    ignore: [],
    errorElement: "span",
    errorPlacement: function (error, element) {
      error.addClass("invalid-feedback");
      element.closest("div").append(error);
    },
    highlight: function (element, errorClass, validClass) {
      jQuery(element).addClass("is-invalid");
    },
    unhighlight: function (element, errorClass, validClass) {
      jQuery(element).removeClass("is-invalid");
    },
  });
  jQuery(form).validate(params);
}

if (jQuery(".crud-frm").length) {
  jQuery(".crud-frm").each(function () {
    siteFormSave(jQuery(this));
  });
}
function siteFormSave(form) {
  siteFormValidationApply(form, {
    submitHandler: function (form) {
      let ajaxParams = {
        type: form.method,
        url: form.action,
        data: jQuery(form).serialize(),
        success: function (res) {
          if (res.url != undefined) {
            siteAjaxAlert(1, res, 1);
            setTimeout(() => {
              window.location.replace(res.url);
            }, 1000);
          } else {
            $("#crud-table").DataTable().ajax.reload();
            siteAjaxAlert(1, res);
            $(".image-form").each(function () {
              this.reset();
            });
            $("#images-preview").empty();
          }
        },
        error: function (err) {
          siteAjaxAlert(0, err);
        },
        complete: function () { },
      };
      var formData = new FormData(form);

      /* This code is to by pass server issue while storing any youtube URL */
      formData.forEach(function (value, key) {
        if (key == "url") {
          formData.set(key, btoa(value));
        }
      });
      /* This code is to by pass server issue while storing any youtube URL */

      if (jQuery(form).attr("enctype") === "multipart/form-data") {
        ajaxParams.data = formData;
        ajaxParams.dataType = "json";
        ajaxParams.mimeType = "multipart/form-data";
        ajaxParams.contentType = false;
        ajaxParams.processData = false;
      }
      jQuery.ajax(ajaxParams);
    },
  });
}

function siteServerSideDatatable(tableID, params) {
  if (tableID !== "") {
    let url;
    if (tableID.charAt(0) === "#") {
      if (jQuery(tableID).attr("data-loadurl") != undefined) {
        url = jQuery(tableID).attr("data-loadurl");
      }
    } else {
      if (jQuery("#" + tableID).attr("data-loadurl") != undefined) {
        url = jQuery("#" + tableID).attr("data-loadurl");
      }
    }

    let args = {
      lengthMenu: [
        [10, 25, 50, 100],
        [10, 25, 50, 100],
      ],
      info: true,
      paging: true,
      ordering: true,
      responsive: true,
      // bStateSave: true,
      serverSide: true,
      ajax: url,
    };

    if (params.buttons == 1) {
      args.dom = "lBfrtip";
      args.buttons = [];

      if (params.exportPdf != undefined) {
        args.buttons.push({
          extend: "pdf",
          className: "btn-info",
          title: params.exportTitle
            ? $("title").text() + " (" + params.exportTitle + ")"
            : $("title").text(),
          text: "Print",
          download: "open", // download
          orientation: "landscape",
          // pageSize: 'Tabloid',
          header: true,
          exportOptions: {
            columns: params.exportPdf.exportOptions, // [0, 1, 2, 3]
          },
          customize: function (doc) {
            doc.content.forEach(function (item) {
              if (item.table) {
                item.table.widths = params.exportPdf.exportWidth; // ['*', '*', '*', '*'];
              }
            });
            doc.styles.tableHeader.alignment = "left";
            doc.styles.tableHeader.fontSize = 12;
            doc.styles.tableHeader.bold = true;
            doc.styles.tableHeader.padding = true;
            doc.defaultStyle.fontSize = 10;
            if (params.extraBlock != undefined) {
              doc.content.push(doc.content[1]);
              doc.content[1] = {
                margin: [0, 0, 0, 15],
                width: "auto",
                table: {
                  headerRows: 0,
                  widths: [100, 150, 100, 150],
                  body: params.extraBlock,
                },
                layout: {
                  defaultBorder: false,
                },
              };
            }
          },
        });
      }
      if (params.exportCSV != undefined) {
        // CSV export button
        args.buttons.push({
          extend: "csv",
          className: "btn-info",
          title: params.exportTitle
            ? $("title").text() + " (" + params.exportTitle + ")"
            : $("title").text(),
          text: "CSV",
          bom: true,
          exportOptions: {
            columns: params.exportCsv.exportOptions,
          },
        });
      }
      if (params.exportExcel != undefined) {
        // Excel export button
        args.buttons.push({
          extend: "excel",
          className: "btn-info",
          title: params.exportTitle
            ? $("title").text() + " (" + params.exportTitle + ")"
            : $("title").text(),
          text: "Excel",
          bom: true,
          exportOptions: {
            columns: params.exportExcel.exportOptions,
          },
        });
      }
      delete params.buttons;
    }

    let table;
    if (tableID.charAt(0) === "#") {
      table = jQuery(tableID).DataTable(Object.assign(args, params));
    } else {
      table = jQuery("#" + tableID).DataTable(Object.assign(args, params));
    }
    return table;
  }
}

function approveOrReject(action, endpoint, itemId, containerId) {
  let title, icon, confirmButtonText, successMessage;

  if (action === "approve") {
    title = "Are you sure?";
    icon = "success";
    confirmButtonText = "Yes, approve it!";
    successMessage = "The item has been approved.";
  } else if (action === "reject") {
    title = "Are you sure?";
    icon = "warning";
    confirmButtonText = "Yes, reject it!";
    successMessage = "The item has been rejected.";
  } else if (action === "lead-converted") {
    title = "Are you sure?";
    icon = "success";
    confirmButtonText = "Yes, approve it!";
    successMessage = "The lead has been succeed.";
  } else if (action === "lead-lost") {
    title = "Are you sure?";
    icon = "warning";
    confirmButtonText = "Yes, reject it!";
    successMessage = "The lead has been rejected.";
  }

  Swal.fire({
    title: title,
    text: "You won't be able to revert this!",
    icon: icon,
    showCancelButton: true,
    confirmButtonColor: "#3085d6",
    cancelButtonColor: "#d33",
    confirmButtonText: confirmButtonText,
  }).then((result) => {
    if (result.isConfirmed) {
      $.ajax({
        url: `${endpoint}`,
        type: "POST",
        data: {
          id: itemId,
          action: action,
        },
        success: function (response) {
          $("#crud-table").DataTable().ajax.reload();
          $("#" + response.tableId).DataTable().ajax.reload();
          if (containerId != undefined) {
            $("#" + containerId).fadeOut("slow", function () {
              $(this).remove();
            });
          }
        },
        error: function (xhr, status, error) {
          Swal.fire("Error!", "An error occurred.", "error");
        },
      });
    }
  });
}

function deleteRecord(endpoint, itemId, containerId) {
  Swal.fire({
    title: "Are you sure?",
    text: "You won't be able to revert this!",
    icon: "warning",
    showCancelButton: true,
    confirmButtonColor: "#3085d6",
    cancelButtonColor: "#d33",
    confirmButtonText: "Yes, delete it!",
  }).then((result) => {
    if (result.isConfirmed) {
      $.ajax({
        url: `${endpoint}`,
        type: "POST",
        data: {
          id: itemId,
        },
        success: function (response) {
          $("#" + response.tableId).DataTable().ajax.reload();
          if (containerId != undefined) {
            $("#" + containerId).fadeOut("slow", function () {
              $(this).remove();
            });
          }
        },
        error: function (xhr, status, error) {
          Swal.fire(
            "Error!",
            "An error occurred while deleting the item.",
            "error"
          );
        },
      });
    }
  });
}

function applyDates(type, eles) {
  if (eles.length) {
    if (type == "datetime") {
      eles.bootstrapMaterialDatePicker({
        format: "DD-MM-YYYY HH:mm",
        clearButton: true,
        weekStart: 1,
        minDate: new Date(),
      });
    } else if (type == "date") {
      eles.bootstrapMaterialDatePicker({
        format: "MM-DD-YYYY",
        clearButton: true,
        weekStart: 1,
        time: false,
      });
    } else if (type == "time") {
      eles.bootstrapMaterialDatePicker({
        format: "HH:mm",
        clearButton: true,
        date: false,
      });
    } else if (type == "minToday") {
      eles.bootstrapMaterialDatePicker({
        format: "DD-MM-YYYY",
        clearButton: true,
        weekStart: 1,
        time: false,
        minDate: new Date(),
      });
    }
  }
}

$("body").on("focus", ".datetimepicker", function () {
  applyDates("datetime", jQuery(".datetimepicker"));
});
$("body").on("focus", ".datepicker", function () {
  applyDates("date", jQuery(".datepicker"));
});
$("body").on("focus", ".timepicker", function () {
  applyDates("time", jQuery(".timepicker"));
});
$("body").on("focus", ".mindatepicker", function () {
  applyDates("minToday", jQuery(".mindatepicker"));
});

if (jQuery(".txteditor").length) {
  jQuery(".txteditor").summernote({
    height: 150,
  });
}

function funAddContent() {
  var $div = jQuery("#sampleContentRow").clone();
  $div.removeClass("d-none");
  $div.find(".cls-text-content").attr("name", "image[]");
  $div.find(".cls-image-content").attr("name", "description[]");
  $div.appendTo(jQuery("#listOfContent"));
}

function funRemoveContent(ele) {
  jQuery(ele).closest(".cls-row-content").remove();
}
jQuery(document).ready(function () {
  if (!jQuery("#listOfContent .cls-row-content").length) {
    funAddContent();
  }
});
function previewImage(event, previewId) {
  const files = event.target.files;
  const output = document.getElementById(previewId);
  output.innerHTML = '<div class="form-group d-flex flex-wrap"></div>';
  const imagesContainer = output.querySelector(".form-group");
  for (let i = 0; i < files.length; i++) {
    const reader = new FileReader();
    reader.onload = function () {
      imagesContainer.innerHTML += `<div class="mr-2"><img src="${reader.result}" height="100px" width="120px" alt="Preview"></div>`;
    };
    reader.readAsDataURL(files[i]);
  }
}
function previewAudio(event, previewId) {
  const reader = new FileReader();
  reader.onload = function () {
    const output = document.getElementById(previewId);
    output.innerHTML = `<audio controls class="mt-2">
                            <source src="${reader.result}" type="audio/mp3">
                            Your browser does not support the audio element.
                          </audio>`;
  };
  reader.readAsDataURL(event.target.files[0]);
}
