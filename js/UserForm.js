$(document).ready(function () 
{
    for (var i = 0; i < 24; i++) {
                $("#ddlHrs").append($("<option></option>").val(i).html(i));
    }

    for (var i = 1; i <= 12; i++) {
                $("#ddlMonth").append($("<option></option>").val(i).html(i));
    }

    for (var i = 1; i <= 31; i++) {
                $("#ddlDay").append($("<option></option>").val(i).html(i));
    }

    $(".numeric").keydown(function (e)
    {
        // Allow: backspace, delete, tab, escape, enter and .
        if ($.inArray(e.keyCode, [45, 46, 8, 9, 27, 13, 110, 190]) !== -1 ||
            // Allow: Ctrl+A, Command+A
            (e.keyCode === 65 && (e.ctrlKey === true || e.metaKey === true)) || 
            // Allow: home, end, left, right, down, up
            (e.keyCode >= 35 && e.keyCode <= 40)) {
            // let it happen, don't do anything
                return;
            }
        // Ensure that it is a number and stop the keypress
        if ((e.shiftKey || (e.keyCode < 48 || e.keyCode > 57)) && (e.keyCode < 96 || e.keyCode > 105)) {
            e.preventDefault();
        }
    });

    $("#btnSubmit").show();

    $("#btnSubmit").click(function (event) {
			event.preventDefault();

            $("#btnSubmit").attr("disabled","disabled");
            var incCode = $('#ddlIncidentCode').val().split('-');

            // Disabling textbox and dropdown
            $("#ddlIncidentCode").attr("disabled", "disabled");
            $("#txtZipcode").attr("disabled", "disabled");
            $("#txtcost").attr("disabled", "disabled");
          
            $('#ddlHrs').attr("disabled", "disabled");
            $('#ddlMonth').attr("disabled", "disabled");
            $('#ddlDay').attr("disabled", "disabled");
            $('#ddlYears').attr("disabled", "disabled");
        
            $.ajax({
		        	 type : "POST",
		             url: "ImageWebService.asmx/ImageGenerationCall",
                     data: "{incidentCode:'" + incCode[0] + "',hour:'" + $('#ddlHrs').val() + "',month:'" + $('#ddlMonth').val() + "',day:'" + $('#ddlDay').val() + "',year:'" + $('#ddlYears').val() + "',zipcode:'" + $('#txtZipcode').val() + "',cost:'" + $('#txtcost').val() + "'}",
                     contentType: "application/json; charset=utf-8",
                     dataType: "json",
                     success: function (result)
                     {
                         $("#validationSummary").text(result.d);
                         alert(result.d);

                        window.location.href = "/Index.html";
		        	 },
		        	 error : function(e) 
		        	 {
                         $("#btnSubmit").removeAttr("disabled");
                         alert("Error!");
                     },
                     failure: function (e)
                     {
                         alert(e.responseText);
                     }
            });
    });
    
});
