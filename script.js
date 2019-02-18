var swatches = ['#F44336', '#9C27B0', '#3F51B5', '#2196F3','#009688','#4CAF50','#FFC107','#FF9800','#CDDC39','#00BCD4'];

var words1 = ['Prairie', 'Woodland', 'Avian', 'Somerset', 'Ashton', 'Austen', 'Belmont', 'Deer', 'Cardinal', 'Burnham', 'Hunter\'s', 'Saddle', 'Hawthorne', 'Fairview', 'Pemberley', 'Coventry', 'Cicely', 'Roslyn', 'Harper', 'Darrowby', 'Downton', 'Dunphy', 'Windsor', 'Griswold', 'Cherry', 'Hornet\'s Nest', 'Walnut', 'Blackberry', 'Gazpacho', 'Fox', 'Coyote', 'Forest', 'Willow', 'Sycamore', 'Turtle', 'Hawk\'s', 'Slippery Slope'];

var words2 = ['Crossing', 'Woods', 'Meadow', 'Estates', 'Lakes', 'Park', 'Creek', 'Ridge', 'Hills', 'Oaks', 'Pines', 'Valley', 'Path', 'Farms', 'Brooke', 'Trail', 'Mill', 'Village', 'Grove', 'Crest', 'Summit'];

var wordsArr;
var nameArr;
var name;
var used = [];
var swatchesArr;
var clicked;

//2 or 3 words
function nameLength() {
	num = Math.round(Math.random());
  	if (num === 1){
  		wordsArr = [words2, words1, words2];
  	} else {
  		wordsArr = [words1, words2];
	}
}

function makeNameArr(){
	nameArr = [];
	for (var i = 0; i < wordsArr.length; i++){
		num = Math.floor(Math.random() * wordsArr[i].length);
		nameArr.push(wordsArr[i][num]);
	}

	if (nameArr[0] === nameArr[nameArr.length-1]){	
		makeNameArr();
	} else {
		makeName();
	}
}

function makeName(){
	if (nameArr.length === 3) {
		name = 'The ' + nameArr[0] + ' at ' + '<br>' + nameArr[1] + ' ' + nameArr[2];
	} else {
		name = nameArr[0] + '<br>' + nameArr[1];
	}
}

function makeSwatchArr(){
	swatchesArr = [];
	//to identify whether there are 2 or 3 swatches
	for (var i = 0; i < wordsArr.length; i++){ 
		num = Math.floor(Math.random() * swatches.length); 
		swatchesArr.push(swatches[num]);
	}
	if (dupSearch(swatchesArr) == true){
		makeSwatchArr();
	};
}

//1st 2 lines for both 2 and 3 words
function assignIcon(){
	iconLeft = String("icons/" + nameArr[0] + "-icon.svg");	
	iconRight = String("icons/" + nameArr[nameArr.length - 1] + "-icon.svg");
	if (nameArr.length === 3) {
		iconMid = String("icons/" + nameArr[1] + "-icon.svg");
	}
}

function dupSearch(arr){  
	ordered = arr.sort();
	//must not reorder actual short array--esp words must be in certain order
	for (var i = 0; i < ordered.length - 1; i++) {
    	if (ordered[i + 1] == ordered[i]) {
    		return true;	
		}
	}; 
}

document.getElementById('advance').addEventListener('click', displayResult); 

function displayResult(){
	nameLength();
	makeNameArr();
	makeSwatchArr();
	makeName();
	assignIcon();
			document.querySelector('.icon-panel').style.display = 'block';
			document.getElementById('desc').style.display = 'none';
			document.getElementById('result-container').style.display = 'block';
			document.getElementById('result').style.display = 'block';
			document.getElementById('box-1').style.background = swatchesArr[0];
			$('#box-1').hide().fadeIn('slow');
			document.getElementById('name-text').innerHTML = name;
			document.getElementById('advance').textContent = 'Next';
			document.querySelector('.icon-panel').style.width = '192px';
			document.querySelector('#icon-left img').setAttribute('src', iconLeft);
			document.querySelector('#icon-right img').setAttribute('src', iconRight);
			if (nameArr.length === 2) {
				document.getElementById('box-2').style.display = 'none'; //after 2 words/boxes, middle box in 3 word fades in, bc this hid it
				document.getElementById('box-3').style.background = swatchesArr[1];
				$('#box-3').hide().delay(800).fadeIn('slow');
			};
			if (nameArr.length === 3) {
				document.querySelector('.icon-panel').style.width = '288px';
				document.getElementById('box-3').style.background = swatchesArr[2];
				$('#box-3').hide().delay(1600).fadeIn('slow');
				document.getElementById('box-2').style.display = 'block';
				$('#box-2').hide().delay(800).fadeIn('slow'); 				
				document.getElementById('box-2').style.background = swatchesArr[1];
				document.querySelector('#icon-mid img').setAttribute('src', iconMid);
			};
}	