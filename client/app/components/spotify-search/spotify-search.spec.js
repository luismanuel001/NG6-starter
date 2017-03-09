import spotifySearch from './spotify-search'
import SpotifySearchController from './spotify-search.controller';
import spotifySearchComponent from './spotify-search.component';
import spotifySearchTemplate from './spotify-search.html';

describe('Component: spotifySearch', () => {
  let $rootScope, makeController;

  beforeEach(window.module(spotifySearch));
  beforeEach(inject((_$rootScope_) => {
    $rootScope = _$rootScope_;
    makeController = () => {
      return new SpotifySearchController();
    };
  }));

  describe('Module', () => {
    // top-level specs: i.e., routes, injection, naming
  });

  describe('Controller', () => {
    // controller specs
    it('has a name property [REMOVE]', () => { // erase if removing this.name from the controller
      let controller = makeController();
      expect(controller).to.have.property('name');
    });
  });

  describe('Template', () => {
    // template specs
    // tip: use regex to ensure correct bindings are used e.g., {{  }}
    it('has name in template [REMOVE]', () => {
      expect(spotifySearchTemplate).to.match(/{{\s?\$ctrl\.name\s?}}/g);
    });
  });

  describe('Component', () => {
      // component/directive specs
      let component = spotifySearchComponent;

      it('includes the intended template',() => {
        expect(component.template).to.equal(spotifySearchTemplate);
      });

      it('invokes the right controller', () => {
        expect(component.controller).to.equal(SpotifySearchController);
      });
  });
});
