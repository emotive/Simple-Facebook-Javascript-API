// Initiate Facebook

window.fbAsyncInit = function() {
	FB.init({appId: appid, status: true, cookie: true, xfbml: true});
 
	/* All the events registered */
	FB.Event.subscribe('auth.login', function(response) {
		// do something with response
		login();
	});
	FB.Event.subscribe('auth.logout', function(response) {
		// do something with response
		logout();
	});
 	FB.getLoginStatus(function(response) {
		if (response.session) {
			// logged in and connected user, someone you know
			login();
		}
	});
};
(function() {
	var e = document.createElement('script');
	e.type = 'text/javascript';
	e.src = document.location.protocol + '//connect.facebook.net/en_US/all.js';
	e.async = true;
	document.getElementById('fb-root').appendChild(e);
}());
 
// Facebook Login 
 
function login(redirect_action, var1, var2, var3, var4, var5, var6, var7) {
    FB.api('/me', function (response) {

        var query = FB.Data.query('select pic from user where uid={0}', response.id);

		// Fill items on refering page
        query.wait(function (rows) {
            document.getElementById('fbAvatar').innerHTML = '<img class="fbavatar" src="'+ rows[0].pic + '"/>';
            document.getElementById('fbName').innerHTML = response.name;
            document.getElementById('fbFName').innerHTML = response.first_name;
            document.getElementById('fbLName').innerHTML = response.last_name;
            document.getElementById('fbBirthday').innerHTML = response.birthday;
            document.getElementById('fbGender').innerHTML = response.gender;
            document.getElementById('fbRelationship').innerHTML = response.relationship_status;
            document.getElementById('fbParty').innerHTML = response.political;
            document.getElementById('fbReligion').innerHTML = response.religion;
            document.getElementById('fbEmail').innerHTML = response.email;
            document.getElementById('fbWebsite').innerHTML = response.website;
            document.getElementById('fbID').innerHTML = response.id;
            document.getElementById('fbLocation').innerHTML = response.location.name;
            document.getElementById('fbSpouse').innerHTML = response.significant_other.name;

        });
 	
 	// Redirect back to referring class if sent here from another place   
    if (redirect_action == 'fbBadge') {fbBadge(var1, var2, var3, var4);}
    if (redirect_action == 'fbVideo') {fbVideo(var1, var2, var3);}
    if (redirect_action == 'fbLink') {fbLink(var1, var2, var3);}
    if (redirect_action == 'fbMessage') {fbMessage(var1);}
    if (redirect_action == 'fbSharePage') {fbSharePage(var1);}
    if (redirect_action == 'fbEvent') {fbEvent(var1, var2, var3, var4, var5);}
    if (redirect_action == 'fbAutoFill') {fbAutoFill(var1, var2, var3);}
  
    });

    document.getElementById('login').style.display = "block";
    document.getElementById('on').style.display = "none";


}


// Logout function

function logout(){
	document.getElementById('login').style.display = "none";
	document.getElementById('fbname').style.display = "none";
	document.getElementById('fbavatar').style.display = "none";

}


// Post a badge to Facebook

function fbBadge(message, image, site_name, url){
	FB.api('/me/feed', 'post', { message: message, picture: image, caption: 'Click the link above to get your own badge.', name: site_name, link: url }, function(response) {
		if (!response || response.error) {
			login('fbBadge', message, image, site_name, url);
		} else {
			alert('The badge has been posted to your wall');
		}
	});
}

// Post a video to Facebook

function fbVideo(message, video_name, youtube_id){
	FB.api('/me/feed', 'post', { message: message, name: video_name, embed_html: 'http://www.youtube.com/watch?v=' + youtube_id }, function(response) {
		if (!response || response.error) {
			login('fbVideo', message, video_name, youtube_id);
		} else {
			alert('Your video has been posted');
		}
	});
}

// Post a link to Facebook

function fbLink(message, site_name, url){
	FB.api('/me/feed', 'post', { message: message, name: site_name, link: url }, function(response) {
		if (!response || response.error) {
			login('fbLink', message, site_name, url);
		} else {
			alert('Your link has been posted');
		}
	});
}

// Post a message to Facebook

function fbMessage(message){
	FB.api('/me/feed', 'post', { message: message}, function(response) {
		if (!response || response.error) {
			login('fbMessage', message);
		} else {
			alert('Your message has been posted');
		}
	});
}

// Post current page to Facebook

function fbSharePage(message){
	FB.api('/me/feed', 'post', { message: message , link: document.location.href, name: document.title}, function(response) {
		if (!response || response.error) {
			login('fbSharePage', message);
		} else {
			alert('Your page has been shared');
		}
	});
}

// Create an event in Facebook
// Start and End date are ISO format and can be generated using http://www.timestampgenerator.com/

function fbEvent(event_name, start, end, location, details){
	FB.api('/me/events', 'post', { name: event_name, start_time: start, end_time: end, location: location, description : details }, function(response) {
		if (!response || response.error) {
			login('fbEvent', event_name, start, end, location, details);
		} else {
			alert('Your event has been created');
		}
	});
}

// Auto-fill a form with Facebook data

function fbAutoFill(first, last, email) {
    FB.api('/me', function (response) {
    		if (!response || response.error) {
				login('fbAutoFill', first, last, email);
			} else {
    			for(var i = 0; i < 4; i++){
            		document.getElementsByName(first).item(i).value = response.first_name;
            		document.getElementsByName(last).item(i).value = response.last_name;
            		document.getElementsByName(email).item(i).value = response.email;
            	}
			}
        });    
}


// Send to a Friend box

function fbSendFriend(header,appname,message) {
	document.write ('<fb:serverFbml><script type="text/fbml"><fb:fbml><fb:request-form action="');
	document.write (window.location);
	document.write ('" invite="true" method="POST" type="');
	document.write (appname);
	document.write ('" content="');
	document.write (message);
	document.write ('" ><fb:multi-friend-selector row="7" email_invite="true" cols="3" import_external_friends="true" actiontext="');
	document.write (header);
	document.write ('" exclude_ids="" /><input type="hidden" name="ids[]" /></fb:request-form></fb:fbml></script></fb:serverFbml>');
}


