$(document).ready(function() {

    TurnInCanvas(document.getElementById("immagine1"));
    TurnInCanvas(document.getElementById("immagine2"));

    let input = document.getElementById('fileToUpload');
    input.addEventListener('change', submitImage);

    function submitImage() {
        let newImage = document.getElementById("fileToUpload").files[0];
		
		let i = new Image(); 
		
		i.onload = function(){
			resizeImgs(i.width, i.height, "immagine1", "immagine2");
		};

        let reader = new FileReader();
        reader.addEventListener("load", function() {
			
			i.src = reader.result;
			
			document.getElementById("reset").src = reader.result;
        }, false);

        if (newImage) {
            reader.readAsDataURL(newImage);
        }
		
    };

    $('#submit').click(function(e) {
        e.preventDefault();

        toSliderPage();

        resetImgs("immagine1", "immagine2");

        //prendo il valore di n e applico la logica di conversione richiesta
        let n = $('#value').val();
        let cLogic = $('#conversionLogic').val();
        n = applyConversionLogic(n, cLogic);

        //prendo il valore di sfondo e lo imposto
        let bColor = $('#backgroundColor').val();
        setBackgroundColor(bColor);

        //applico l'effetto scelto
        let effect = $('#effect').val();
        applyEffect(effect, n, "immagine1");

    });

    $('#back').click(function(e) {
        e.preventDefault();

        toIndexPage();
    });

    $(document).on('input change', '#slider', function() {
		
		
        resetImg("immagine2");

        n = $(this).val();
		
		changeLabel(n);
		
        let cLogic = $('#conversionLogic').val();
        n = applyConversionLogic(n, cLogic);
		
        let effect = $('#effect').val();
        applyEffect(effect, n, "immagine2");
    });

	function changeLabel(n){
		document.getElementById("rangeLabel").innerHTML = '<span id="f" style="font-weight:bold">' + n + ' %</span>'
	}
	
	function resizeImgs( width, height, ...ids){
		for (let i = 0; i < ids.length; i++) {
				let im = document.getElementById(ids[i]);
				
				im.style.width = 40 + "%";
				im.style.height = 40 + "%";
				
				Caman(im, function() {
					this.resize({
						width: width,
						height: height});

					// You still have to call render!
					this.render();
				});
		}
	}

    function applyEffect(effect, n, id) {
        switch (effect) {
            case "1":
                RemoveRandomPixel(n, id);
                break;
            case "2":
                RemoveOrderedPixel(n, id);
                break;
            case "3":
                ChangeAlpha(n, id);
                break;
            case "4":
                SwapPixel(n, id);
                break;
            case "5":
                BlurImage(n, id);
                break;

            default:
                console.log("Error");
        }
    }

    function toSliderPage() {
        let x = document.getElementById('indexPage');
        x.style.display = 'none';
        let y = document.getElementById('sliderPage');
        y.style.display = 'block';
    }

    function toIndexPage() {
        let y = document.getElementById('sliderPage');
        y.style.display = 'none';
        let x = document.getElementById('indexPage');
        x.style.display = 'block';
		
        document.body.className = "container bg-white text-black";
    }

    function resetImgs(...ids) {
        for (let i = 0; i < ids.length; i++) {
            resetImg(ids[i]);
        }
    }

    //Setta lo sfondo 
    function setBackgroundColor(bColor) {
        if(bColor == "Black"){
			document.body.className = "container bg-dark text-white";
		}
    }

    function applyConversionLogic(n, cLogic) {

        if (cLogic == "S-shaped") {
            n = ((1) / (1 + Math.pow(Math.E, (-10 * (((n) / (100)) - 0.5))))) * 100
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

                if ((Math.random() * 100) < n) { //rendo tresparenti i n/100 dei pixel 
                    data[index + 3] = 0;
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
                    data[index + 3] = 0;
                }
            }
        }

        ctx.putImageData(imageData, 0, 0);
    }

    function ChangeAlpha(n, id) {
        n = (n / 100) * 255;

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
						[data[index + 1], data[index2 + 1]] = [data[index2 + 1], data[index + 1]];
						[data[index + 2], data[index2 + 2]] = [data[index2 + 2], data[index + 2]];

                }
            }
        }

        ctx.putImageData(imageData, 0, 0);

    }

    function BlurImage(n, id) {

        n = 100 - n;
        let obj = document.getElementById(id);
        Caman(obj, function() {
            this.reloadCanvasData();
            this.stackBlur(n);
            this.render();
        });
    }

});