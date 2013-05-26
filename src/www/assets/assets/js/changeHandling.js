function onChangeHandler(event){
	var address = event.target.id.split("/");

	var multiAddress = findItem(address);

	var node = jsonDocument;

	for (var i = 0; i < multiAddress.arrayAddress.length; i++) {
		node = node.children[multiAddress.arrayAddress[i]];
	};

	node[multiAddress.field] = $(event.target).val();
}
//"0/0/1/3.title"
function setItem(arrayAddress, value){
	var node = jsonDocument;

	for (var i = 0; i < multiAddress.arrayAddress.length; i++) {
		if(i == arrayAddress.length - 1){
			var finalAddress = arrayAddress.split(".")
			node[finalAddress[0]][finalAddress[1]] = value;
		}
		node = node.children[arrayAddress[i]];
	};

	//node[multiAddress.field] = value;	
}