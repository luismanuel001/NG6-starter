import album from './album'
import AlbumController from './album.controller';
import albumComponent from './album.component';
import albumTemplate from './album.html';

describe('Component: album', () => {
  let $rootScope, makeController;

  beforeEach(window.module(album));
  beforeEach(inject((_$rootScope_) => {
    $rootScope = _$rootScope_;
    makeController = () => {
      return new AlbumController();
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
      expect(albumTemplate).to.match(/{{\s?\$ctrl\.name\s?}}/g);
    });
  });

  describe('Component', () => {
      // component/directive specs
      let component = albumComponent;

      it('includes the intended template',() => {
        expect(component.template).to.equal(albumTemplate);
      });

      it('invokes the right controller', () => {
        expect(component.controller).to.equal(AlbumController);
      });
  });
});
