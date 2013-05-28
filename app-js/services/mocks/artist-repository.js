angular.module('artist-repository',[]).factory('ArtistRepository',
  function(){
    
    var artists = [
      {id: 1, name: 'Mario Junior'},
      {id: 2, name: 'Artist 2'},
      {id: 3, name: 'Artist 3'},
      {id: 4, name: 'Artist 4'},
      {id: 5, name: 'Artist 5'}
    ];

    var ArtistRepository=function(){};

    ArtistRepository.prototype.query = function(params, cb) {
        return cb(artists);
    }
    
    ArtistRepository.prototype.get = function(params,cb) {
      var result = null;

      for (var i = artists.length - 1; i >= 0; i--) {
        if (params.id == artists[i].id) {
          result = artists[i];
        }

      };

      return cb(result);
    }

    //factory's return
    return new ArtistRepository();
  }
);
