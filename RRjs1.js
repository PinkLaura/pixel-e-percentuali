 $(document).ready(function(){
			
			//var newImage = document.getElementById("reset")
			
			$('#submitImage').click(function(){
				newImage = document.getElementById('fileToUpload').files[0];
				console.log(newImage);
				
				let res = document.getElementById("reset");
				let ctxRes = res.getContext('2d');
				let imgData = ctxImg.getImageData(0, 0, img.width, img.height).data;

				ctxRes.drawImage(newImage, 0, 0);
				
				
				/*let Res = document.getElementById("reset");
				reset.setAttribute("src", newImage);
				console.log(document.getElementById("reset").src);*/
				
				/*
				document.getElementById("reset").src = newImage;				
				Res.parentNode.replaceChild(newImage, Res);*/
			});
	
			
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
				//SwapPixel(n, "immagine4");
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