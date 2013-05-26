function onChangeHandler(event){
	var address = event.id.split("/");

	var multiAddress = findItem(address);

	var node = jsonDocument;

	for (var i = 0; i < multiAddress.arrayAddress.length; i++) {
		node = node.children[multiAddress.arrayAddress[i]];
	};

	node[multiAddress.field] = $(event.target).val();
}
//"adults/title"
function findItem(address, arrayAddress){
	if(typeof(arrayAddress) == undefined){
		arrayAddress = [];
	}


	var part = address.shift();

	if(part == "title" || part == "content"){
		return {'arrayAddress': arrayAddress, 'field': part};
	}else{
		for (var i = 0; i < address.length; i++) {
			if(jsonDocument.idTitle == part){
				arrayAddress.push(i);
				return findItem(address, arrayAddress);
			}
		};
	}
		
}