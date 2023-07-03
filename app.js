// for mixitup portfolio
var mixer = mixitup('.portfolio-gallery');


// for contact form
(function($) {

	"use strict";


  // Form
	var contactForm = function() {
		if ($('#contactForm').length > 0 ) {
			$( "#contactForm" ).validate( {
				rules: {
					name: "required",
					subject: "required",
					email: {
						required: true,
						email: true
					},
					message: {
						required: true,
						minlength: 5
					}
				},
				messages: {
					name: "Please enter your name",
					subject: "Please enter your subject",
					email: "Please enter a valid email address",
					message: "Please enter a message"
				},
				/* submit via ajax */
				
				submitHandler: function(form) {		
					var $submit = $('.submitting'),
						waitText = 'Submitting...';

					$.ajax({   	
				      type: "POST",
				      url: "php/sendEmail.php",
				      data: $(form).serialize(),

				      beforeSend: function() { 
				      	$submit.css('display', 'block').text(waitText);
				      },
				      success: function(msg) {
		               if (msg == 'OK') {
		               	$('#form-message-warning').hide();
				            setTimeout(function(){
		               		$('#contactForm').fadeOut();
		               	}, 1000);
				            setTimeout(function(){
				               $('#form-message-success').fadeIn();   
		               	}, 1400);

		               	// setTimeout(function(){
				              //  $('#form-message-success').fadeOut();   
		               	// }, 8000);

		               	setTimeout(function(){
				               $submit.css('display', 'none').text(waitText);  
		               	}, 1400);

		         //       	setTimeout(function(){
		         //       		$( '#contactForm' ).each(function(){
											//     this.reset();
											// });
		         //       	}, 1400);
			               
			            } else {
			               $('#form-message-warning').html(msg);
				            $('#form-message-warning').fadeIn();
				            $submit.css('display', 'none');
			            }
				      },
				      error: function() {
				      	$('#form-message-warning').html("Something went wrong. Please try again.");
				         $('#form-message-warning').fadeIn();
				         $submit.css('display', 'none');
				      }
			      });    		
		  		} // end submitHandler

			});
		}
	};
	contactForm();

})(jQuery);


//for downloading pdf file
function DownloadFile(fileName) {
	//Set the File URL.
	var url = "resume/" + fileName;

	//Create XMLHTTP Request.
	var req = new XMLHttpRequest();
	req.open("GET", url, true);
	req.responseType = "blob";
	req.onload = function () {
		//Convert the Byte Data to BLOB object.
		var blob = new Blob([req.response], { type: "application/octetstream" });

		//Check the Browser type and download the File.
		var isIE = false || !!document.documentMode;
		if (isIE) {
			window.navigator.msSaveBlob(blob, fileName);
		} else {
			var url = window.URL || window.webkitURL;
			link = url.createObjectURL(blob);
			var a = document.createElement("a");
			a.setAttribute("download", fileName);
			a.setAttribute("href", link);
			document.body.appendChild(a);
			a.click();
			document.body.removeChild(a);
		}
	};
	req.send();
};
