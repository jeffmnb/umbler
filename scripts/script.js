let body = document.getElementById('body');
let btnDownlaod = document.getElementById('btnDownlaod');
let btnUploud = document.getElementById('btnUploud');
let action = document.getElementById('action');
let action2 = document.getElementById('action2')
let divChoose = document.getElementById('divChoose');
let modalInput = document.getElementById('modalInput');
let modalConvert = document.getElementById('modalConvert');
let btnFechar = document.getElementById('btnFechar');
let btnFechar2 = document.getElementById('btnFechar2');
let btn2 = document.getElementById('btn2');
let selectInput = document.getElementById('selectInput');
let inputFile = document.getElementById('inputFile');

btnFechar.addEventListener('click', () => {
	modalInput.style = "visibility:hidden";
	modalConvert.style = "visibility:hidden";

	btn.disabled = false;
})

btnFechar2.addEventListener('click', () => {
	modalInput.style = "visibility:hidden";
	modalConvert.style = "visibility:hidden";

	btn.disabled = false;
})


modalConvert.addEventListener('click', () => {
	modalConvert.style.visibility = "hidden";
	btn.disabled = false;
	btn2.disabled = false;
})

modalInput.addEventListener('click', () => {
	modalInput.style.visibility = "hidden";
	btn.disabled = false;
})

modalInput.style.display = "none";
modalConvert.style.display = "none";

btnDownlaod.addEventListener('click', () => {
	divChoose.style.display = "none";
	action.style.display = "block";
	action2.style.display = "none";
})

btnUploud.addEventListener('click', () => {
	divChoose.style.display = "none";
	action.style.display = "none";
	action2.style.display = "block";
})


btn2.addEventListener('click', () => {
	if (inputFile.files.length != 0) {

		setTimeout(function () {
			btn2.disabled = true;
			modalConvert.style.display = "block";
			modalConvert.style.visibility = "visible";
		}, 1000)

	}


})



let Btn = document.getElementById('btn');
let URLinput = document.querySelector('.URL-input');
let select = document.querySelector('.opt');
let serverURL = 'http://localhost:3000';

Btn.addEventListener('click', () => {


	if (select.value == 'mp3') {
		downloadMp3(URLinput.value);
	} else if (select.value == 'mp4') {
		downloadMp4(URLinput.value);
	}



});

btn.addEventListener('click', () => {
	btn.disabled = true;
})

async function downloadMp3(query) {
	const res = await fetch(`${serverURL}/downloadmp3?url=${query}`);

	if (res.status == 200) {
		modalConvert.style.display = "block";
		modalConvert.style.visibility = "visible";

		setTimeout(function () {
			var a = document.createElement('a');
			a.href = `${serverURL}/downloadmp3?url=${query}`;
			a.setAttribute('download', '');
			a.click();
			btn.disabled = true;
		}, 1000)


	} else if (res.status == 400) {
		modalInput.style.display = "block";
		modalInput.style.visibility = "visible";
	}
}

async function downloadMp4(query) {
	const res = await fetch(`${serverURL}/downloadmp4?url=${query}`);

	if (res.status == 200) {
		modalConvert.style.display = "block";
		modalConvert.style.visibility = "visible";

		setTimeout(function () {
			var a = document.createElement('a');
			a.href = `${serverURL}/downloadmp4?url=${query}`;
			a.setAttribute('download', '');
			a.click();
			btn.disabled = true;
		}, 1000)

	} else if (res.status == 400) {
		modalInput.style.display = "block";
		modalInput.style.visibility = "visible";
	}
}