$(document).ready(function(){
	// colorscheme
	const jsonstring1 = '{"name":"website_color_scheme","fields":[{"label":"Choose color scheme","input":{"type":"color","colors":["#3366ff","#009933","#990033","#996633"]}},{"input":{"type":"checkbox","checked":"false"},"label":"Turn on dark theme?"}]}';
	
	// signin
	const jsonstring2 = '{"name":"login","fields":[{"label":"Enter your login or email","input":{"type":"text","required":true,"placeholder": "login or email"}},{"label":"Enter your password","input":{"type":"password","required":true,"placeholder": "password"}}],"references":[{"text":"Forgot password?","ref":"rememberpassword"},{"text":"Create new account","ref":"signup"}],"buttons":[{"text":"Login"}]}';
	
	// signup
	const jsonstring3 = '{"name":"register","fields":[{"input":{"type":"text","required":true,"placeholder":"Enter full name"}},{"input":{"type":"email","required":true,"placeholder":"Enter email"}},{"input":{"type":"password","required":true,"placeholder":"password"}},{"input":{"type":"password","required":true,"placeholder":"Confirm password"}}],"references":[{"text without ref":"Already have account?","text":"Login","ref":"signin"}],"buttons":[{"text":"Sign Up"}]}';

	var obj = JSON.parse(jsonstring2);

	let Fieldslength = obj.fields.length;
	var titleText;
	
	var PageName = obj.name;
	if (PageName == 'login'){
		titleText = 'Login';
		console.log(titleText);
	} else if (PageName == 'website_color_scheme'){
		titleText = 'Website color scheme';
		console.log(titleText);
	} else if(PageName == 'register'){
		titleText = 'Register';
		console.log(titleText);
	}else{titleText == PageName;}

	var title = document.createElement('span');
	title.innerHTML = titleText;
	title.setAttribute('class', 'title');
	document.getElementById('content').appendChild(title);

	//fields
	for (let i=0; i<Fieldslength;i++){
		// создание div для каждого поля
		let div = document.createElement('div');
		div.className = "content__block";
		div.id = "content__block"+i;
		document.getElementById('content').appendChild(div);

		// вставка label
		var labelText = obj.fields[i].label;
		if (typeof labelText == "undefined"){
			console.log('no label in json');
		} else{
			var label = document.createElement('LABEL');
			label.setAttribute('class','content__label');
			label.innerHTML = labelText;
			document.getElementById('content__block'+i).appendChild(label);
		}
		
		//вставка input-ов
		let inputType = obj.fields[i].input.type;
		if (inputType == 'color'){

			var input = document.createElement('input');
			input.setAttribute('type','color');
			input.setAttribute('list','presetColors');
			input.setAttribute('value','#ffffff');
			input.setAttribute('class','colors');
			document.getElementById('content__block'+i).appendChild(input);

			var datalist = document.createElement('datalist');
			datalist.setAttribute('id','presetColors');
			document.getElementById('content__block'+i).appendChild(datalist);

			let INP_colors_length = obj.fields[i].input.colors.length;	
			for (let j=0;j<INP_colors_length;j++){
				var option = document.createElement('option');
				var inp_color = obj.fields[i].input.colors[j];
				option.setAttribute('value',inp_color);
				document.getElementById('presetColors').appendChild(option);
			}	
		} 

		if (inputType == 'checkbox'){
			var input = document.createElement('input');
			input.setAttribute('type','checkbox');
			input.setAttribute('class','checkbox');
			if (obj.fields[i].input.checked == 'true'){
				input.setAttribute('checked',true);
			}

			document.getElementById('content__block'+i).appendChild(input);
		}

		if (inputType == 'text'){
			var input = document.createElement('input');
			input.setAttribute('type','text');
			input.setAttribute('class','inputs');
			if (obj.fields[i].input.required == 'true'){
				input.setAttribute('required',true);
			}
			if (obj.fields[i].input.placeholder == 'undefined'){
				console.log('no placeholder for inputs');
			}else{input.setAttribute('placeholder',obj.fields[i].input.placeholder);}

			document.getElementById('content__block'+i).appendChild(input);
		}

		if (inputType == 'email'){
			var input = document.createElement('input');
			input.setAttribute('type','email');
			input.setAttribute('class','inputs');
			if (obj.fields[i].input.required == 'true'){
				input.setAttribute('required',true);
			}
			if (obj.fields[i].input.placeholder == 'undefined'){
				console.log('no placeholder for inputs');
			}else{input.setAttribute('placeholder',obj.fields[i].input.placeholder);}

			document.getElementById('content__block'+i).appendChild(input);
		}

		if (inputType == 'password'){
			var input = document.createElement('input');
			input.setAttribute('type','password');
			input.setAttribute('class','inputs');
			if (obj.fields[i].input.required == 'true'){
				input.setAttribute('required',true);
			}
			if (obj.fields[i].input.placeholder == 'undefined'){
				console.log('no placeholder for inputs');
			}else{input.setAttribute('placeholder',obj.fields[i].input.placeholder);}

			document.getElementById('content__block'+i).appendChild(input);
		}
	}

	//references
	if (typeof obj['references'] !== "undefined"){
		console.log('references exist');
		let RefLength = obj.references.length;
		//создаем div
			let div = document.createElement('div');
			div.className = "content__block__ref";
			div.id = "content__block__ref";
			document.getElementById('content').appendChild(div);

		for (let t=0; t<RefLength;t++){
			//проверяем на наличие и вставляем ссылки с текстом
			let text_without_ref = obj.references[t]["text without ref"];
			if (typeof text_without_ref !== "undefined"){
				//текст
				let text = document.createElement('p');
				text.setAttribute('class','text');
				text.innerHTML = text_without_ref;
				document.getElementById('content__block__ref').appendChild(text);
				//ссылка
				let link = document.createElement('a');
				link.setAttribute('class', 'link');
				link.setAttribute('href', obj.references[t].ref);
				link.innerHTML = obj.references[t].text;
				document.getElementById('content__block__ref').appendChild(link);
			} else {
				let link = document.createElement('a');
				link.setAttribute('class', 'link');
				link.setAttribute('href', obj.references[t].ref);
				link.innerHTML = obj.references[t].text;
				document.getElementById('content__block__ref').appendChild(link);
			}

			
		}
	}

	//btns
	if (typeof obj['buttons'] !== "undefined"){
		console.log('buttons');
		console.log(obj.buttons[0].text);
		//создаем div
		let div = document.createElement('div');
			div.className = "content__block__btns";
			div.id = "content__block__btns";
			document.getElementById('content').appendChild(div);

		let Btns_length = obj.buttons.length;
		for (let u=0;u<Btns_length;u++){
			let btn = document.createElement('button');
			btn.setAttribute('class','btns');
			btn.innerHTML = obj.buttons[u].text;
			document.getElementById('content__block__btns').appendChild(btn);
		}
	}
})