import artist from './artist'
import ArtistController from './artist.controller';
import artistComponent from './artist.component';
import artistTemplate from './artist.html';

describe('Component: artist', () => {
  let $rootScope, makeController;

  beforeEach(window.module(artist));
  beforeEach(inject((_$rootScope_) => {
    $rootScope = _$rootScope_;
    makeController = () => {
      return new ArtistController();
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
      expect(artistTemplate).to.match(/{{\s?\$ctrl\.name\s?}}/g);
    });
  });

  describe('Component', () => {
      // component/directive specs
      let component = artistComponent;

      it('includes the intended template',() => {
        expect(component.template).to.equal(artistTemplate);
      });

      it('invokes the right controller', () => {
        expect(component.controller).to.equal(ArtistController);
      });
  });
});
