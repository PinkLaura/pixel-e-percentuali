 $(document).ready(function(){
			
			TurnInCanvas(document.getElementById("immagine1"));
			TurnInCanvas(document.getElementById("immagine2"));
			TurnInCanvas(document.getElementById("immagine3"));
			TurnInCanvas(document.getElementById("immagine4"));
			
			let input = document.getElementById('fileToUpload');
			input.addEventListener('change', submitImage);
			
			function submitImage(){
				let newImage = document.getElementById("fileToUpload").files[0];
					console.log(newImage);
					
				let reader  = new FileReader();
	
				reader.addEventListener("load", function () {
					document.getElementById("reset").src = reader.result;
				}, false);
				
				if (newImage) {
					reader.readAsDataURL(newImage);
				}
				 
			};


			// Evento chiamato al VIA!
			$('#submit').click(function(){
				resetImg("immagine1");
				resetImg("immagine2");
				resetImg("immagine3");
				resetImg("immagine4");
				
				//prendo il valore di n e applico la logica di conversione richiesta
				let n = $('#value').val();	
				let cLogic = $('#conversionLogic').val();
				n = applyConversionLogic ( n, cLogic);
				
				//prendo il valore di sfondo e lo imposto
				let bColor =  $('#backgroundColor').val();
				setBackgroundColor(bColor, "immagine1","immagine2","immagine3","immagine4" );
				
				RemoveRandomPixel(n, "immagine1");				
				BlurImage1(n, "immagine2");
				ChangeAlpha(n, "immagine3");
				SwapPixel(n, "immagine4");
			});
		
		//Setta lo sfondo di ogni immagine con il colore di sfondo scelto dal menù a tendina
		function setBackgroundColor (bColor, ...ids){			
			for (let i = 0; i < ids.length; i++){
				document.getElementById(ids[i]).style.backgroundColor = bColor;
			}
		}
		
		function applyConversionLogic (n, cLogic){
			
			if ( cLogic == "S-shaped" ){
				n =((1)/(1 + Math.pow(Math.E, (-10 * (((n)/(100))-0.5)))))*100
			}
			
			return n;
		}
		
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

			//faccio passare un pixel alla volta 
			for (let y = 0; y < canvasHeight; ++y) {
				for (let x = 0; x < canvasWidth; ++x) {
					let index = (y * canvasWidth + x) * 4;
					
					if ((Math.random() * 100) < n) { //rendo neri i 3/10 dei pixel 
						data[index+ 3] = 0;
					}
				}
			}

			ctx.putImageData(imageData, 0, 0);
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
		
		//faccio passare un pixel alla volta 
        for (let y = 0; y < canvasHeight; ++y) {
            for (let x = 0; x < canvasWidth; ++x) {
                let index = (y * canvasWidth + x) * 4;
                if (index % 100 < n) { //rendo neri i 3/10 dei pixel 
            		data[index+ 3] = 0;
				}
            }
        }

        ctx.putImageData(imageData, 0, 0);
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

			//faccio passare un pixel alla volta 
			for (let y = 0; y < canvasHeight; ++y) {
				for (let x = 0; x < canvasWidth; ++x) {
					let index = (y * canvasWidth + x) * 4;
					data[index + 3] = n;
				}
			}

			ctx.putImageData(imageData, 0, 0);
		}
		
		function SwapPixel(n, id) {
			
			n = 100 - n;
			
			let img = document.getElementById(id);

			let canvasWidth = img.width;
			let canvasHeight = img.height;

			let ctx = img.getContext('2d');
			let imageData = ctx.getImageData(0, 0, canvasWidth, canvasHeight);

			//importo i dati salvati per riapplicare la funzione dall'inizio
			let data = imageData.data;

			//faccio passare un pixel alla volta 
			for (let y = 0; y < canvasHeight; y++) {
				for (let x = 0; x < canvasWidth; x++) {
					let index = (y * canvasWidth + x) * 4;
					let index2 = Math.round(Math.random() * canvasWidth * canvasHeight) * 4;
					//console.log('SwapIteration');
					
					
					if ((Math.random() * 100) < n) { 
					
						//scambio i pixel
						[data[index], data[index2]] = [data[index2], data[index]];
						[data[index+1], data[index2+1]] = [data[index2+1], data[index+1]];
						[data[index+2], data[index2+2]] = [data[index2+2], data[index+2]];
											
					}
				}
			}

			ctx.putImageData(imageData, 0, 0);
		
		}

		//non funziona il reset nel blur
		function BlurImage1(n, id){
			
			n = 100-n;
			let obj = document.getElementById(id);
			Caman(obj, function(){
				this.reloadCanvasData();
				this.stackBlur(n);
				this.render();
			});
		}
		
		function BlurImage2 (n, id){
			
			let img = document.getElementById(id);
			let ctxImg = img.getContext('2d');
			
			ctxImg.filter = "blur(20px)";
			
		}
		
		function BlurImage (n, canvasId) {

			var c = document.getElementById(canvasId);
			var ctx = c.getContext("2d");
			ctx.globalAlpha = 0.1;

			var offset = 1;

			for (var i=1; i<=8; i+=1) {
				ctx.drawImage(c, offset, 0, c.width - offset, c.height, 0, 0, c.width-offset, c.height);
				ctx.drawImage(c, 0, offset, c.width, c.height - offset, 0, 0,c.width, c.height-offset);
			}
		}
		
		
		//https://github.com/flozz/StackBlur

});