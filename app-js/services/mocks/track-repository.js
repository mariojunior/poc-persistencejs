angular.module('track-repository',[]).factory('TrackRepository',
  function(){
    
    var tracks = [
      { id: 1, name: "music 1", length: "1m56s", rating: 3, album: {id: 1}},
      { id: 2, name: "music 2", length: "6m23s", rating: 1, album: {id: 1}},
      { id: 3, name: "music 3", length: "4m10s", rating: 4, album: {id: 1}},
      { id: 4, name: "music 4", length: "9m56s", rating: 5, album: {id: 1}},
      { id: 5, name: "music 5", length: "8m36s", rating: 5, album: {id: 1}},
      { id: 6, name: "music 6", length: "13m27s", rating: 2, album: {id: 1}},
      { id: 7, name: "music 1 album 2", length: "1m56s", rating: 0, album: {id: 2}},
      { id: 8, name: "music 2 album 2", length: "6m23s", rating: 1, album: {id: 2}},
      { id: 9, name: "music 3 album 2", length: "4m10s", rating: 2, album: {id: 2}},
      { id: 10, name: "music 4 album 2", length: "9m56s", rating: 3, album: {id: 2}},
      { id: 11, name: "music 5 album 2", length: "8m36s", rating: 4, album: {id: 2}},
      { id: 12, name: "music 6 album 2", length: "13m27s", rating: 5, album: {id: 2}}
    ];

    var TrackRepository=function(){};

    TrackRepository.prototype.query = function(params, cb) {
        return cb(tracks);
    }
    
    TrackRepository.prototype.get = function(params, cb) {
      var result = null;

      for (var i = tracks.length - 1; i >= 0; i--) {
        if (params.id == tracks[i].id) {
          result = tracks[i];
        }

      };

      return cb(result);
    }

    //factory's return
    return new TrackRepository();
  }
);
