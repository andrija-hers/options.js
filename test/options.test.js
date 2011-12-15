var Options = require('options');
require('should');

describe('Options', function() {
  describe('#ctor', function() {
    it('initializes options', function() {
      var option = new Options({a: true, b: false}); 
      option.value.a.should.be.ok;
      option.value.b.should.not.be.ok;
    })
  })
  describe('#merge', function() {
    it('merges options from another object', function() {
      var option = new Options({a: true, b: false}); 
      option.merge({b: true});
      option.value.a.should.be.ok;
      option.value.b.should.be.ok;
    })
    it('cannot set values that werent already there', function() {
      var option = new Options({a: true, b: false}); 
      option.merge({c: true});
      (typeof option.value.c).should.eql('undefined');
    })
  })
  describe('#value', function() {
    it('can be enumerated', function() {
      var option = new Options({a: true, b: false}); 
      Object.keys(option.value).length.should.eql(2);
    })
    it('can not be used to set values', function() {
      var option = new Options({a: true, b: false}); 
      option.value.b = true;
      option.value.b.should.not.be.ok;
    })
    it('can not be used to add values', function() {
      var option = new Options({a: true, b: false}); 
      option.value.c = 3;
      (typeof option.value.c).should.eql('undefined');
    })
  })
  describe('#reset', function() {
    it('resets options to defaults', function() {
      var option = new Options({a: true, b: false}); 
      option.merge({b: true});
      option.value.b.should.be.ok;
      option.reset();
      option.value.b.should.not.be.ok;
    })
  })
  it('is immutable', function() {
    var option = new Options({a: true, b: false}); 
    option.foo = 2;
    (typeof option.foo).should.eql('undefined');
  })
})