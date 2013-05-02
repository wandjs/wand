var expect = require('chai').expect;
var ColorUtils = require('../../lib/utils/Color');

describe('Color', function(){

  describe('rgbToHex()', function(){
    
    var rgbToHex = ColorUtils.rgbToHex;
    
    it('should return correct hex color value when separate arguments are used', function(){
      expect(rgbToHex(255,255,255)).to.equal('#ffffff');
      expect(rgbToHex(0,0,0)).to.equal('#000000');
      expect(rgbToHex(0,128,64)).to.equal('#008040');
    });
    it('should return correct hex color value when single object argument is used', function(){
      expect(rgbToHex({r:255,g:255,b:255})).to.equal('#ffffff');
      expect(rgbToHex({r:0,g:0,b:0})).to.equal('#000000');
      expect(rgbToHex({r:0,g:128,b:64})).to.equal('#008040');
    });
  });

  describe('hexToRgb()', function(){
    var hexToRgb = ColorUtils.hexToRgb;
    it('should return correct rgb colors for short 3-digit hex value', function(){
      expect(hexToRgb('#fff')).to.eql({r:255,g:255,b:255});
      expect(hexToRgb('#000')).to.eql({r:0,g:0,b:0});
      expect(hexToRgb('#084')).to.eql({r:0,g:136,b:68});
    });
    it('should return correct rgb colors for full 6-digit hex value', function(){
      expect(hexToRgb('#ffffff')).to.eql({r:255,g:255,b:255});
      expect(hexToRgb('#000000')).to.eql({r:0,g:0,b:0});
      expect(hexToRgb('#008844')).to.eql({r:0,g:136,b:68});
    });
    it('should return correct rgb colors when hex has no leading hash', function(){
      expect(hexToRgb('ffffff')).to.eql({r:255,g:255,b:255});
      expect(hexToRgb('000')).to.eql({r:0,g:0,b:0});
    });
  });

});