(function($){
	var messages = null;
	var file = 'i18n_'
	$.loadMessages = function(settings){
		var conf = {
				uri_messages:'/site/i18n',
				type:'json',
				lang:'pt',
		};
		if(settings){$.extend(conf, settings);}
		
		file += conf.lang;
		var loaded = sessionStorage.getItem(file);
		if(loaded == null){
			requestMessages(conf);
		}else{
			messages = $.parseJSON(loaded);
		}
	}
	
	
	$.msg = function(key, params){
		var m = messages[key];
		if(m != null){
			$.each(params, function(index, value){
				m = m.replace('{' + index +'}', value);
			});
		}
		return m;
	}
	
function requestMessages(conf){
	$.ajax({
		  type: 'GET',
		  data:{'lang':conf.lang},
		  url: conf.uri_messages,
		  dataType: conf.type,
		  success: function (data) {
			  if(data.success){
				  loaded = data.messages;
				  sessionStorage.setItem(file, JSON.stringify(loaded));
			  }
		  },
		  error: function (req, err, ex) {
			  //TODO O que fazer neste caso?
			  console.warn(ex);
		  }, 
		});
}
})(jQuery);

