(function() {

  return {
    
    defaultState: 'loading',

	requests: {
      getGeo: function(ip) {
        return {
          url: 'http://freegeoip.net/xml/' + ip,
          type: 'GET',
          dataType: 'xml'
        };
      },
      getIP: function() {
        return {
          url: 'http://icanhazip.com/',
          type: 'GET'
        };
      }
	},

    events: {
      'app.activated': 'geoipstart',

      'getIP.done': function(data) {
        console.dir(data);
        
        this.switchTo('iplist', {
        ipadr:            data.activeElement.childNodes[1].innerHTML.slice(0,data.activeElement.childNodes[1].innerHTML.indexOf(' '))
      });
      },

      'getIP.fail': function(data) {
        this.switchTo('getip_fail');
      },

      'getGeo.done': function(data) {
      console.dir(data);
      var latitude = data.getElementsByTagName("Latitude")[0].textContent;
      var longitude = data.getElementsByTagName("Longitude")[0].textContent;
      
       this.switchTo('geoloc', {
        lon:            latitude,
		lat:            longitude
      });
      },

      'getGeo.fail': function() {
        this.switchTo('getgeo_fail');
      },

      'addBookmark.always': function() {
        this.ajax('fetchBookmarks');
      },

      'click .lookup': 'geolocate',

      'click a[data-role="reload-bookmarks"]': 'requestBookmarks'
    },

	geolocate: function(data)
	{
      console.log('HELLO I AM ALSO A SCRIPT');
      console.dir(data);
      var temp_data = data;
      var the_length = data.target.attributes[3].nodeValue.length;
      console.log('Length is: ' + the_length);
      var slash_pos = the_length - temp_data.target.attributes[3].nodeValue.split("").reverse().join("").indexOf('/');
      console.log('Position of last slash: ' + slash_pos);
      var the_ip = data.target.attributes[3].nodeValue.slice(slash_pos, the_length);
      console.log('final ip string: ' + the_ip);
      this.ajax('getGeo',the_ip);
	},
	
	geoipstart: function()
	{
      console.log('HELLO I AM A SCRIPT');
      this.ajax('getIP');
	}
	


  };

}());
