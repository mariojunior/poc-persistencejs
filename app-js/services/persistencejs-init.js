angular.module('persistencejs-engine',[])
	.factory('PersistenceJSEngineProvider', function(){

		var SIZE = 100*1024*1024; //100MB
		persistence.store.websql.config(persistence, 'music-library', 'A Personal Music Library database', SIZE);
		
		//defining our entities
		var Artist = persistence.define('artists', {
			name: 'TEXT'
		});

		var Track = persistence.define('tracks', {
			name: 'TEXT',
			length: 'TEXT',
			rating: 'INT'
		});

		var Album = persistence.define('albums', {
			name: 'TEXT',
			year: 'INT'
		});


		//defining the relationships
		// This defines a one-to-many relationship:
		// Album.hasMany('tracks', Track, 'album');
		Artist.hasMany('albums', Album, 'artist');

		//creating a INDEX UNIQUE CONSTRAINT
		Artist.index(['name'], {unique: true});

		// These two definitions define a many-to-many relationship
		//Entity1.hasMany('property-entity-1', Entity2, 'property-on-entity-2');
		//Entity2.hasMany('property-entity-2', Entity1, 'property-on-entity-1');


		// persistence.schemaSync();
		persistence.schemaSync(function(tx) { 
			console.log("####### Database done.");
		});

		var engine = function(){};

		engine.prototype.rebuildDB = function() {
			var action = confirm("All data will be erased. Are you sure?", "Hey dude, are you crazy?");
			if (action) {
				console.log("Is there any way to do it using persistencejs sync?");
			}
		}

		engine.prototype.getDao = function() {
			return persistence;
		}

		// #################### Methods for Album DAO ####################
		engine.prototype.saveAlbum = function(obj, cb) {
			var result; 
			if ((obj.id === null) || (typeof obj.id === 'undefined')) {
				result = newAlbum(obj);
			} else {
				result = editAlbum(obj);
			}

			return cb(result);
		}

		engine.prototype.fetchAllAlbums = function(cb) {
			Album.all().list(function(items){
				var result = [];
				// if (!items) {
					items.forEach(function(item){
						item._data.id = item.id;
						result.push(item._data);
					});
				// }
				return cb(result);
			});
		}

		engine.prototype.getAlbum = function(id, cb) {
			Album.all().filter('id','=',id).one(function(item){
				if (item === null) return cb(null);

				var result = {};
				item._data.id = item.id;
				var artist = item.artist;
				item._data.artist = artist._data;

				result = item._data;
				return cb(result);
			});
		}

		engine.prototype.removeAlbum = function(id, cb) {
			Album.all().filter('id','=',id).destroyAll();
			return cb();
		}

		// ---- private
		function newAlbum(obj) {
			var nA = new Album();
			nA.name = obj.name;
			nA.year = obj.year;
			nA.artist = obj.artist;
			// nA.tracks = obj.tracks;

			persistence.add(nA);
			persistence.flush();

			return nA;
		}

		function editAlbum(obj) {
			Album.all().filter('id','=',obj.id).one(function(item){
				item.name = obj.name;
				item.year = obj.year;
				item.artist = obj.artist;
				item.tracks = obj.tracks;

				persistence.flush();

				return item;
			});
		}

		// #################### END Album DAO ####################
		// #################### Methods for Artist DAO ####################
		engine.prototype.saveArtist = function(obj, cb) {
			var result; 
			if ((obj.id === null) || (typeof obj.id === 'undefined')) {
				result = newArtist(obj);
			} else {
				result = editArtist(obj);
			}

			return cb(result);
		}

		engine.prototype.fetchAllArtist = function(cb) {
			Artist.all().list(function(items){
				var result = [];
				// if (!items) {
					items.forEach(function(item){
						item._data.id = item.id;
						result.push(item._data);
					});
				// }
				return cb(result);
			});
		}

		engine.prototype.getArtist = function(id, cb) {
			Artist.all().filter('id','=',id).one(function(item){
				if (item === null) return cb(null);

				var result = {};
				// if (item) {
					item._data.id = item.id;
					result = item._data;
				// }
				return cb(result);
			});
		}

		engine.prototype.removeArtist = function(id, cb) {
			Artist.all().filter('id','=',id).destroyAll();
			return cb(null);
		}

		// ---- private
		function newArtist(obj) {
			var nA = new Artist();
			nA.name = obj.name;

			persistence.add(nA);
			persistence.flush();

			return nA;
		}

		function editArtist(obj) {
			Artist.all().filter('id','=',obj.id).one(function(item){
				item.name = obj.name;
				persistence.flush();

				return item;
			});
		}
		// #################### END Artist DAO ####################
		// #################### Methods for Track DAO ####################
		engine.prototype.saveTrack = function(obj, cb) {
			var result; 
			if (obj.id === null) {
				result = newTrack(obj);
			} else {
				result = editTrack(obj);
			}

			return cb(result);
		}

		engine.prototype.fetchAllTrack = function(cb) {
			Track.all().list(function(items){
				var result = [];
				items.forEach(function(item){
					item._data.id = item.id;
					result.push(item._data);
				});
				return cb(items);
			});
		}

		engine.prototype.getTrack = function(id, cb) {
			Track.all().filter('id','=',id).one(function(item){
				if (item === null) return cb(null);

				item._data.id = item.id;
				return cb(item);
			});
		}

		engine.prototype.removeTrack = function(id, cb) {
			Track.all().filter('id','=',id).destroyAll(); //or use persistence.remove(object);
			return cb(null);
		}

		// ---- private
		function newTrack(obj) {
			var t = new Track();
			t.name = obj.name;
			t.length = obj.length;
			t.album = obj.album;
			t.rating = obj.rating;

			persistence.add(t);
			persistence.flush();

			return t;
		}

		function editTrack(obj) {
			Track.all().filter('id','=',obj.id).one(function(item){
				item.name = obj.name;
				item.name = obj.name;
				item.length = obj.length;
				item.album = obj.album;
				item.rating = obj.rating;
				
				persistence.add(item);
				persistence.flush();

				return item;
			});
		}
		// #################### END Track DAO ####################

		var service = {
			getInstance:function(){ return new engine(); }
		};

		return service
	})
	.service("PersistenceJSEngine", ["PersistenceJSEngineProvider",
		function(PersistenceJSEngine) {
			return PersistenceJSEngine.getInstance();
		}
	]);



