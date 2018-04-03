(function(){

document.addEventListener("deviceready", onDeviceReady, false);

function onDeviceReady() {

var db = window.sqlitePlugin.openDatabase({name: 'user_data.db', location: 'default'});

	 //------------------------Crear tabla sql-----------------------------------------------//

	db.transaction(function (tx) {
		tx.executeSql('CREATE TABLE IF NOT EXISTS user_table(id integer primary key, name text, email text, address text, password text, category text)');

		}, errorcb, successcb);

	function errorcb(err) {
		 // alert('error in table' + err.code);
}

	function successcb() {
		
		// alert('success in table');
}


//------------------------Registrar usuario-----------------------------------------------//

	var enter = document.querySelector('#registerUser'),
			nameBox = document.querySelector('#name'),
			emailBox = document.querySelector('#email'),
			addressBox = document.querySelector('#address');
			passwordBox = document.querySelector('#password');
			categoryBox = document.querySelector('#category');

	enter.onclick = function() {


		var nameValue = nameBox.value,
				emailValue = emailBox.value,
				addressValue = addressBox.value,
				passwordValue = passwordBox.value,
				categoryValue = categoryBox.value;
	
		db.transaction(function(tx) {

			tx.executeSql("INSERT INTO user_table (name, email, address, password, category) VALUES (?,?,?,?,?)", [nameValue, emailValue, addressValue, passwordValue, categoryValue]);


	}, errorcbk, successcbk);

	function errorcbk(err) {
		 alert('error al registar' + err.code);

	}

	function successcbk() {
		
		alert('Usuario registrado con exito');

	}


 }

 //------------------------Buscar usuario-----------------------------------------------//

var btnSeacrh = document.querySelector('#btnSeacrh'),
		id;

		btnSeacrh.onclick = function() {

		var searchUser = document.querySelector('#searchText'), 
				searchValue = searchUser.value;

		db.transaction(function (tx) {
					 tx.executeSql("SELECT * from user_table where email like('%" + searchValue + "%')", [], function(tx, res) {
							var len = res.rows.length;
							alert(len);
							console.log(res.rows);
							if(len>0){
								for (var j = 0; j < len; j++) {
									$("#pageRegister, #btn_options").show();
									$("#btnRegister,#navbar, #resume,#help_form, #btn_form, #updateUser").hide();
									id = res.rows.item(j).id;
									nameBox.value = res.rows.item(j).name;
									emailBox.value = res.rows.item(j).email;
									addressBox.value = res.rows.item(j).address;
									passwordBox.value = res.rows.item(j).password;
									categoryBox.value = res.rows.item(j).category;
									nameBox.disabled = true;
									emailBox.disabled = true;
									addressBox.disabled = true;
									passwordBox.disabled = true;
									categoryBox.disabled = true;
							 }
							}else{
								alert('No se encontraron resultados');
							}
					});
				});
			}

//-------------------------Actualizar usuario------------------------//

var updateUser = document.querySelector('#updateUser'); 


	
	updateUser.onclick = function() {

	var nameValue = nameBox.value,
					emailValue = emailBox.value,
					addressValue = addressBox.value,
					passwordValue = passwordBox.value,
					categoryValue = categoryBox.value;
		
	db.transaction(function (tx) {
		var executeQuery = "UPDATE user_table SET name=?, email=?, address=?, password=?, category=? WHERE id=?";
					 tx.executeSql(executeQuery, [nameValue, emailValue,addressValue,passwordValue,categoryValue, id], function(tx, rec) {
							alert('Usuario modificado con exito');
							$("#updateUser").hide();
							$("#modifyUser").show();
							nameBox.disabled = true;
							emailBox.disabled = true;
							addressBox.disabled = true;
							passwordBox.disabled = true;
							categoryBox.disabled = true;
					}, function(err){
						alert('error' + err);
					});
				});

 }

// function alert(){
//     $(".alert").toggleClass('in out'); 
//     return false; 
// }

 //---------------------Eliminar Usuario-----------------------//

 	var deleteUser = document.querySelector('#deleteUser');

 	deleteUser.onclick = function() {

 		db.transaction(function (tx){
 			var executeQuery = "DELETE FROM user_table where id=?";
 			tx.executeSql(executeQuery, [id], function(tx, rec){
 				alert('Usuario eliminado');
 				// restoreInputs;
 			}, function(err){
 				alert('error '+ err);
 			});
 		});
 	}


	$("#btnRegister").on('click', function(){
		$("#btnRegister, #navbar, #resume, #btn_options").hide();
		$("#pageRegister").show();
	});	

	$("#Home").on('click', function(){
		$("#btnRegister, #navbar, #resume").show();
		$("#pageRegister").hide();
	});	

	$("#modifyUser").on('click', function(){
		$("#updateUser").show();
		$("#modifyUser").hide();
		nameBox.disabled = false;
		emailBox.disabled = false;
		addressBox.disabled = false;
		passwordBox.disabled = false;
		categoryBox.disabled = false;
	});

var restoreInputs = function(){
		$("#btnRegister, #navbar, #resume, #btn_form, #modifyUser, #help_form").show();
		nameBox.value = '';
		emailBox.value = '';
		addressBox.value = '';
		passwordBox.value = '';
		categoryBox.value = '';
		nameBox.disabled = false;
		emailBox.disabled = false;
		addressBox.disabled = false;
		passwordBox.disabled = false;
		categoryBox.disabled = false;
		$("#pageRegister, #btn_options, #updateUser").hide();
	};
	$("#exit").on('click', restoreInputs);
};
})();