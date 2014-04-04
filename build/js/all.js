// Initialize your app
var myApp = new Framework7({
	onPageInit: function (page) {
        // Do something on page init
         console.log(page);
    }
});
var $$=myApp.$;
var $=jQuery;
var $JSON='http://192.168.1.84:5000/rest/index'
	,NotesList=[];

var Notes={
	template:null,

	render:function(){
		if(Notes.template==null)
			Notes.template=$('#template');
		
		myApp.showPreloader('Cargando Noticias...');
		var self=Notes;
		$.ajax({
			url:$JSON,
			dataType:'json',
			success:function(data){
				myApp.hidePreloader();
				NotesList=data;

				var html='';

				for(i in data){
					var note=data[i];

					if(note.image){

						self.template
							.find('.item-title').html(note.title).end()
							.find('.item-media').css('background-image','url('+note.image+')').end()
							.find('.item-text').html(note.description).end()
							.find('.item-subtitle').html(note.subtitle.toLowerCase()).end()
							.find('.item-link').attr('href','view.html').attr('data-id',i).end()
							;


						html+='<li>';
						html+=self.template.html();
						html+='</li>';

					}
				}

				$('#listNotes ul').html(html);
				$('#listNotes .item-link').on('click touchend',to.link);





			}
		});




	}
}

var to={
	loadContent:false,
	ID:-1,
	link:function(){

		to.loadContent=true;

		to.ID=$(this).data('id');

	}
}



$(document).on('ready',Notes.render);



// Add view
var mainView = myApp.addView('.view-main', {
    // Because we use fixed-through navbar we can enable dynamic navbar
    dynamicNavbar: true,
    onPageBeforeAnimation:function(){

    		
    		
    	if(to.loadContent){

			var note=NotesList[to.ID];

			$('#pageTitle').html(note.subtitle);
			$('#title').html(note.title);
			$('#description').html(note.description); 
			$('#image').html('<img src="'+note.image+'" />');
			$('#content').html(note.content);

			to.loadContent=false;
    	}

    }
});





$$(document).on('pageInit', function (e) {
    var page = e.detail.page;
    console.log(page.name);

    if(page.name==='index'){

   	
    }
});



$$('.pull-to-refresh-content').on('refresh', function (e) {
// Emulate 2s loading
	setTimeout(function () {

		var html='';

		
			var note=NotesList[5];


				Notes.template
					.find('.item-title').html(note.title).end()
					.find('.item-media').css('background-image','url('+note.image+')').end()
					.find('.item-text').html(note.description).end()
					.find('.item-subtitle').html(note.subtitle.toLowerCase()).end()
					.find('.item-link').attr('href','view.html').attr('data-id',5).end()
					;


				html+='<li style="display:none">';
				html+=Notes.template.html();
				html+='</li>';			
		

		$('#listNotes ul').prepend(html).find('li:first').slideDown();		
		$('#listNotes .item-link').off('click touchend',to.link);
		$('#listNotes .item-link').on('click touchend',to.link);


	    myApp.pullToRefreshDone();
	}, 2000);


}); 