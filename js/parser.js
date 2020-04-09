$(document).ready(function(){

	// colorscheme
	const jsonstring1 = '{"name":"website_color_scheme","fields":[{"label":"Choose color scheme","input":{"type":"color","colors":["#3366ff","#009933","#990033","#996633"]}},{"input":{"type":"checkbox","checked":"false"},"label":"Turn on dark theme?"}]}';
	
	// signin
	const jsonstring2 = '{"name":"login","fields":[{"label":"Enter your login or email","input":{"type":"text","required":true,"placeholder": "login or email"}},{"label":"Enter your password","input":{"type":"password","required":true,"placeholder": "password"}}],"references":[{"text":"Forgot password?","ref":"rememberpassword"},{"text":"Create new account","ref":"signup"}],"buttons":[{"text":"Login"}]}';
	
	// signup
	const jsonstring3 = '{"name":"register","fields":[{"input":{"type":"text","required":true,"placeholder":"Enter full name"}},{"input":{"type":"email","required":true,"placeholder":"Enter email"}},{"input":{"type":"password","required":true,"placeholder":"password"}},{"input":{"type":"password","required":true,"placeholder":"Confirm password"}}],"references":[{"text without ref":"Already have account?","text":"Login","ref":"signin"}],"buttons":[{"text":"Sign Up"}]}';

	// addpost
	const jsonstring4 = '{"name":"addpost","fields":[{"label":"Title","input":{"type":"text","required":true}},{"label":"Description","input":{"type":"textarea","required":true}},{"label":"Image","input":{"type":"file","required":true}},{"label":"Publish Date","input":{"type":"date","required":true}},{"label":"Author","input":{"type":"text"}}],"references":[{"input":{"type":"checkbox","required":true,"checked":"false"}},{"text without ref":"View Author Post","text":"View Author Post","ref":"viewauthor"}],"buttons":[{"text":"Create Post"}]}'

	// interview
	const jsonstring5 = '{"name":"interview","fields":[{"label":"Введите своё ФИО","input":{"type":"text","required":true,"placeholder":"Иванов Иван Иванович"}},{"label":"Введите Номер телефона","input":{"type":"number","required":true,"mask":"+7 (999) 99-99-999"}},{"label":"Введите свою Почту","input":{"type":"email","required":true,"placeholder":"example@mail.com"}},{"label":"Введите свой возраст","input":{"type":"number","required":true}},{"label":"Введите вашу специальность","input":{"type":"text","required":true}},{"label":"Выберете технологии, с которыми вы работали","input":{"type":"technology","required":true,"technologies":["PHP","JS","Laravel","Express.js","Yii2","HTML","CSS","Java"],"multiple":true}},{"label":"Ваш срок работы","input":{"type":"number","required":true}},{"label":"Ваша фотография","input":{"type":"file","required":true}},{"label":"Серия, номер","input":{"type":"number","required":true,"mask":"99-99 999999"}},{"label":"Код подразделения","input":{"type":"number","required":true,"mask":"999-999"}},{"label":"Скан / Фото паспорта (1 страница)","input":{"type":"file","required":true,"multiple":true,"filetype":["png","jpeg","pdf"]}},{"label":"Расскажите немного о себе","input":{"type":"textarea","required:":true}}],"references":[{"input":{"type":"checkbox","required":true,"checked":"false"}},{"text without ref":"I accept the","text":"Terms & Conditions","ref":"termsandconditions"}],"buttons":[{"text":"Send"},{"text":"Cancel"}]}'

	var obj = JSON.parse(jsonstring5);

	var titleText;
	
	var PageName = obj.name;
	switch(PageName){
		case 'login': titleText = 'Login'; break;
		case 'addpost': titleText = 'Add Post'; break;
		case 'website_color_scheme': titleText = 'Website color scheme'; break;
		case 'register': titleText = 'Register'; break;
		case 'interview': titleText = 'Интервью'; break;
		default: titleText = PageName;
	}
	

	var title = document.createElement('span');
	title.innerHTML = titleText;
	title.setAttribute('class', 'title');
	document.getElementById('content').appendChild(title);

	class labels{
		constructor(LabelText,i){
			this.LabelText = LabelText;
			this.i = i;
		}
		insertLbl(){
			let str_html = '';
			str_html = str_html + this.LabelText;
			if (str_html!="undefined"){
				let lbl = document.createElement('LABEL');
				lbl.setAttribute('class','content__label');				
				lbl.innerHTML = str_html;
				document.getElementById('content__block' + this.i).appendChild(lbl);
			}			
		}
	}

	class inputs{
		constructor(i,type,required,placeholder,mask,filetype,checked,multiple, technologies, colors){
			this.i = i;
			this.type = type;
			this.required = required;
			this.placeholder = placeholder;
			this.mask = mask;
			this.filetype = filetype;
			this.checked = checked;	
			this.multiple = multiple;	
			this.technologies = technologies;
			this.colors = colors;
		}
		insertInpts(){
			let input = document.createElement('input');
			if (this.mask != undefined){
				$(input).mask(this.mask);
				this.type = 'text';
			}
			input.setAttribute('type',this.type);
			input.setAttribute('class','inputs');
			// input.setAttribute('id','input_field'+this.i);			
			if ((this.placeholder !='')&&(this.placeholder != undefined)){input.setAttribute('placeholder',this.placeholder);}			
			if ((this.required != undefined)){
				// input.setAttribute('required','true');
				let attr = document.createAttribute('required');
				input.setAttributeNode(attr);
			}
			document.getElementById('content__block'+this.i).appendChild(input);
		}

		insertInptsFile(){
			let label_file = document.createElement('label');
			label_file.setAttribute('for','myfile'+this.i);
			label_file.setAttribute('class','chous');
			label_file.innerHTML = "Выберите файлы";
			document.getElementById('content__block' + this.i).appendChild(label_file);

			let input = document.createElement('input');
			input.setAttribute('type',this.type);
			if (this.filetype != undefined){input.setAttribute('accept', '.png,.jpeg,.pdf');}
			input.setAttribute('class','my');
			input.setAttribute('id','myfile'+this.i);
			input.setAttribute('name','myFile');
			if (this.multiple != undefined){input.setAttribute('multiple', this.multiple);}			
			document.getElementById('content__block' + this.i).appendChild(input);
				$('.my').change(function() {
   					if ($(this).val() != '') $(this).prev().text('Выбрано файлов: ' + $(this)[0].files.length);
   					else $(this).prev().text('Выберите файлы');
				});
		}
		insertSlcts(){
			let select = document.createElement('select');
			select.setAttribute('id','technologies_list');
			select.setAttribute('multiple',this.multiple);
			document.getElementById('content__block'+this.i).appendChild(select);

			let technologies_length = this.technologies.length;
			
			for (let j =0; j<technologies_length;j++){
				let str_option = '';
				str_option = str_option + this.technologies[j];
				let option = document.createElement('option');
				option.setAttribute('value',this.technologies[j]);
				option.innerHTML = str_option;
				document.getElementById('technologies_list').appendChild(option);
			}

			$('#technologies_list').multiselect();
		}
		InsertColors(){
			let input = document.createElement('input');
			input.setAttribute('type',this.type);
			if (this.colors != undefined){
				input.setAttribute('list','presetColors');
				let datalist = document.createElement('datalist');
				datalist.setAttribute('id','presetColors');
				document.getElementById('content__block'+this.i).appendChild(datalist);
				let colors_length = this.colors.length;
				for (let j = 0; j<colors_length;j++){
					let option = document.createElement('option');
					option.setAttribute('value', this.colors[j]);
					document.getElementById('presetColors').appendChild(option);
				}
			}
			input.setAttribute('class','colors');
			document.getElementById('content__block'+this.i).appendChild(input);
			input.setAttribute('value','#ffffff');
		}
		InsertCheckbox(){
			let input = document.createElement('input');
			input.setAttribute('type',this.type);
			input.setAttribute('class','checkbox');
			if (this.required == true){
				input.setAttribute('required','true');
			}
			if (this.checked == true){
				input.setAttribute('checked','true');
			}
			document.getElementById('content__block'+this.i).appendChild(input);
		}
		InsertCheckboxRef(){
			let input = document.createElement('input');
			input.setAttribute('type',this.type);
			input.setAttribute('class','checkbox');
			if (this.required == true){
				input.setAttribute('required','true');
			}
			if (this.checked == true){
				input.setAttribute('checked','true');
			}
			document.getElementById('content__block__ref').appendChild(input);
		}
		InsertTextArea(){
			let textarea_item = document.createElement('textarea');
			if ((this.required != undefined)){textarea_item.setAttribute('required','true');}
			document.getElementById('content__block'+this.i).appendChild(textarea_item);
		}

	}
	class references{
		constructor(i,text,ref,text_without_ref){
			this.i = i;
			this.text = text;
			this.ref = ref;
			this.text_without_ref = text_without_ref;
		}

		
		InsertReference(){
			if (this.text_without_ref != undefined){
				let textWithoutRef = document.createElement('p');
				textWithoutRef.setAttribute('class','text');
				textWithoutRef.innerHTML = this.text_without_ref;
				document.getElementById('content__block__ref').appendChild(textWithoutRef);
			}
			if (this.text != undefined){
				let link = document.createElement('a');
				link.setAttribute('class', 'link');
				link.setAttribute('href', this.ref);
				link.innerHTML = this.text;
				document.getElementById('content__block__ref').appendChild(link);
			}
			
		}
	}

	// fields
	let fieldslength = obj.fields.length;
	for (let i=0;i<fieldslength;i++){

		let div = document.createElement('div');
		div.className = "content__block";
		div.id = "content__block"+i;
		document.getElementById('content').appendChild(div);
		// labels
			let label = new labels(obj.fields[i].label,i);
			label.insertLbl();
		// inputs
			let inp = obj.fields[i].input;
			if ((inp.type != 'technology')&&(inp.type != 'file')&&(inp.type != 'color')&&(inp.type!='checkbox')&&(inp.type!='textarea')){
				let input = new inputs(i,inp.type,inp.required,inp.placeholder,inp.mask,inp.filetype,inp.checked,inp.multiple,inp.technologies,inp.colors)
				input.insertInpts();				
			}
			if(inp.type == 'technology'){
				let select = new inputs(i,inp.type,inp.required,inp.placeholder,inp.mask,inp.filetype,inp.checked,inp.multiple,inp.technologies,inp.colors);
				select.insertSlcts();
			}
			else if (inp.type == 'file'){
				let inpfile = new inputs(i,inp.type,inp.required,inp.placeholder,inp.mask,inp.filetype,inp.checked,inp.multiple,inp.technologies,inp.colors);
				inpfile.insertInptsFile();
			}
			else if (inp.type == 'color'){
				let color_scheme = new inputs(i,inp.type,inp.required,inp.placeholder,inp.mask,inp.filetype,inp.checked,inp.multiple,inp.technologies,inp.colors);
				color_scheme.InsertColors();
			}
			else if (inp.type == 'checkbox'){
				let checkbox_item = new inputs(i,inp.type,inp.required,inp.placeholder,inp.mask,inp.filetype,inp.checked,inp.multiple,inp.technologies,inp.colors);
				checkbox_item.InsertCheckbox(); 
			}
			else if (inp.type == 'textarea'){
				let textarea_item = new inputs(i,inp.type,inp.required,inp.placeholder,inp.mask,inp.filetype,inp.checked,inp.multiple,inp.technologies,inp.colors);
				textarea_item.InsertTextArea();
			}	
	}	

	// references	
	if (obj.references!=undefined){
		let ref_length = obj.references.length;
		let div = document.createElement('div');
		div.className = "content__block__ref";
		div.id = "content__block__ref";
		document.getElementById('content').appendChild(div);
		for (let i = 0; i < ref_length; i++){
			let reference = obj.references[i];
			let inp = reference.input;
			if (inp != undefined){
				let input =  new inputs(i,inp.type,inp.required,inp.placeholder,inp.mask,inp.filetype,inp.checked,inp.multiple,inp.technologies,inp.colors);
				input.InsertCheckboxRef();	
				console.log(i);			
			}
			let text_without_ref = obj.references[i]["text without ref"];
			let reference1 = new references(i,reference.text,reference.ref,text_without_ref);
			reference1.InsertReference();
		}
	}

	// buttons
	if (obj.buttons != undefined){
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