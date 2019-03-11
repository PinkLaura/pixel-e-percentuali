 $(document).ready(function(){
			
			
			$target_dir = "uploads/";
			$target_file = $target_dir . basename($_FILES["fileToUpload"]["name"]);
			$uploadOk = 1;
			$imageFileType = strtolower(pathinfo($target_file,PATHINFO_EXTENSION));
			
			
			// Check if image file is a actual image or fake image
			if(isset($_POST["submit"])) {
				$check = getimagesize($_FILES["fileToUpload"]["tmp_name"]);
				if($check !== false) {
					console.log( "File is an image - " . $check["mime"] . ".");
					$uploadOk = 1;
				} else {
					console.log(  "File is not an image.");
					$uploadOk = 0;
				}
			}
	 
			if($imageFileType != "jpg" && $imageFileType != "png" && $imageFileType != "jpeg"
				&& $imageFileType != "gif" ) {
				console.log(  "Sorry, only JPG, JPEG, PNG & GIF files are allowed.");
				$uploadOk = 0;
			}
			
			// Check if $uploadOk is set to 0 by an error
			if ($uploadOk == 0) {
				console.log(  "Sorry, your file was not uploaded.");
				
			// if everything is ok, try to upload file
			}
			else {
				if (move_uploaded_file($_FILES["fileToUpload"]["tmp_name"], $target_file)) {
					console.log(  "The file ". basename( $_FILES["fileToUpload"]["name"]). " has been uploaded.");
				}
				else {
						console.log(  "Sorry, there was an error uploading your file.");
				}
			}
	 
	 
	 
	 
			TurnInCanvas(document.getElementById("reset"));
			TurnInCanvas(document.getElementById("immagine1"));
			TurnInCanvas(document.getElementById("immagine2"));
			TurnInCanvas(document.getElementById("immagine3"));
			TurnInCanvas(document.getElementById("immagine4"));
			
			// Evento chiamato al click
			$('#submit').click(function(){
				resetImg("immagine1");
				resetImg("immagine2");
				resetImg("immagine3");
				resetImg("immagine4");
			
				let n = $('#value').val();	
				RemoveRandomPixel(n, "immagine1");				
				RemoveOrderedPixel(n, "immagine2");
				ChangeAlpha(n, "immagine3");
				SwapPixel(n, "immagine4");
		});
		
		
		// Trasformo l'immagine in una canvas
		function TurnInCanvas(obj) {
			Caman(obj, function() {
				this.render();
			});
		}

		function resetImg(id) {
			let reset = document.getElementById("reset");

			let img = document.getElementById(id);
			let ctxImg = img.getContext('2d');
			let imgData = ctxImg.getImageData(0, 0, img.width, img.height).data;

			ctxImg.drawImage(reset, 0, 0);
		}

		function RemoveRandomPixel(n, id) {
			
			n = 100 - n;
			
			let img = document.getElementById(id);

			let canvasWidth = img.width;
			let canvasHeight = img.height;

			let ctx = img.getContext('2d');
			let imageData = ctx.getImageData(0, 0, canvasWidth, canvasHeight);

			//importo i dati salvati per riapplicare la funzione dall'inizio
			let data = imageData.data;

			console.log('miao1');

			//faccio passare un pixel alla volta 
			for (let y = 0; y < canvasHeight; ++y) {
				for (let x = 0; x < canvasWidth; ++x) {
					let index = (y * canvasWidth + x) * 4;
					
					if ((Math.random() * 100) < n) { //rendo neri i 3/10 dei pixel 
						data[index] = 255;
						data[index + 1] = 255;
						data[index + 2] = 255;
					}
				}
			}

			ctx.putImageData(imageData, 0, 0);
			console.log('miao');

		}

		function RemoveOrderedPixel(n, id) {
		
		n = 100 - n;
		
        //estraggo l'immagine iniziale
        let img = document.getElementById(id);

        let canvasWidth = img.width;
        let canvasHeight = img.height;

        let ctx = img.getContext('2d');
        let imageData = ctx.getImageData(0, 0, canvasWidth, canvasHeight);

        //importo i dati salvati per riapplicare la funzione dall'inizio
        let data = imageData.data;

        console.log('miao3');

        //faccio passare un pixel alla volta 
        for (let y = 0; y < canvasHeight; ++y) {
            for (let x = 0; x < canvasWidth; ++x) {
                let index = (y * canvasWidth + x) * 4;
                if (index % 100 < n) { //rendo neri i 3/10 dei pixel 
                    data[index] = 255;
                    data[index + 1] = 255;
                    data[index + 2] = 255;
                }
            }
        }

        ctx.putImageData(imageData, 0, 0);
        console.log('MIAO MIAO MIAOOOOOO');

    }

		function ChangeAlpha(n, id) {
			n = (n/100)*255;
			
			let img = document.getElementById(id);
			
			let canvasWidth = img.width;
			let canvasHeight = img.height;

			let ctx = img.getContext('2d');
			let imageData = ctx.getImageData(0, 0, canvasWidth, canvasHeight);

			//importo i dati salvati per riapplicare la funzione dall'inizio
			let data = imageData.data;

			console.log('miao4');

			//faccio passare un pixel alla volta 
			for (let y = 0; y < canvasHeight; ++y) {
				for (let x = 0; x < canvasWidth; ++x) {
					let index = (y * canvasWidth + x) * 4;
					data[index + 3] = n;
				}
			}

			ctx.putImageData(imageData, 0, 0);
			console.log('miao5');

		}
		
		//non funziona
		function SwapPixel(n, id) {
			console.log('bau');
			
			n = 100 - n;
			
			let img = document.getElementById(id);

			let canvasWidth = img.width;
			let canvasHeight = img.height;

			let ctx = img.getContext('2d');
			let imageData = ctx.getImageData(0, 0, canvasWidth, canvasHeight);

			//importo i dati salvati per riapplicare la funzione dall'inizio
			let data = imageData.data;

			console.log('miao1');

			//faccio passare un pixel alla volta 
			for (let y = 0; y < canvasHeight; ++y) {
				for (let x = 0; x <= y; ++x) {
					let index = (y * canvasWidth + x) * 4;
					let index2 = (Math.random() * canvasWidth * canvasHeight) * 4;
					console.log('index2');
					
					
					if ((Math.random() * 100) < n) { 
					/*
						//scambio i pixel
						[data[index], data[index2]] = [data[index2], data[index]];
						[data[index+1], data[index2+1]] = [data[index2+1], data[index+1]];
						[data[index+2], data[index2+2]] = [data[index2+2], data[index+2]];
						*/
						a = data[index];				//scambio i pixel
						b = data[index + 1];
						c = data[index + 2];
						 
						data[index] = data[index2];
						data[index+1] = data[index2+1];
						data[index+2] = data[index2+2];
						
						data[index2] = a;
						data[index2+1] = b;
						data[index2+2] = c;
					
					}
				}
			}

			ctx.putImageData(imageData, 0, 0);
			console.log('miao');

		}

		
		
		//non funziona il reset nel blur
		function BlurImage(n, id){
			
			n = 100-n;
			let obj = document.getElementById(id);
			Caman(obj, function(){
				this.stackBlur(n);
				this.render();
			});
		}

});