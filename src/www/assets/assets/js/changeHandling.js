function onChangeHandler(event){
	var address = event.target.id.split("/");

	setItem(address, $(event.target).val());
}
//"0/0/1/3.title"
function setItem(arrayAddress, value){
	var node = jsonDocument;

	for (var i = 0; i < arrayAddress.length; i++) {

		if(i == arrayAddress.length - 1){
			var finalAddress = arrayAddress[i].split(".")
			node.children[finalAddress[0]][finalAddress[1]] = value;
			if(finalAddress[1] == "title"){
				node.children[finalAddress[0]]['idTitle'] = value.toLowerCase().replace(/ /g, "-");
			}
		}else{
			node = node.children[arrayAddress[i]];
		}
	};

	//node[multiAddress.field] = value;	
}