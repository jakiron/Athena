var Athena = (function(){
	return {
		sCCb:function(response){
				if(response.status == 'connected'){
					this.fF();
				}
				else if(response.status == 'not_authorized'){
					document.getElementById('status').innerHTML = 'Please authorize Athena to access your Facebook data';
				}
				else{
					document.getElementById('status').innerHTML = 'Please log into Facebook';
				}
			},
		cLS:function(){
				var self = this;
				FB.getLoginStatus(function(response){
					self.sCCb(response);
				});
			},
		fF:function(){
				FB.api('/me',function(response){
					var user_name = response.name, user_id = response.id;
					document.getElementById('status').innerHTML = '<div>Athena is fetching your feed...</div>';
					FB.api('/me/feed',function(response){
						if(response && !response.error){
							var response_data = response.data;
							document.getElementById('status').innerHTML = "";
							for(var i=0;i<response_data.length;++i){
								var resp = response_data[i],content = resp.story || resp.message || "";
								if(content !== ""){
									var from = resp.from.name;
									document.getElementById('status').innerHTML += '<div class="panel panel-primary"><div class="panel-heading">From:'+from+'</div><div class="panel-body">'+content+'</div></div>';
								}
							}
						}
						else{
							document.getElementById('status').innerHTML = response.error;
						}
					});
				});
			}
		};
	})();
window.athena = Athena;