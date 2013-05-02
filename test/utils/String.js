var expect = require('chai').expect;
var StringUtils = require('../../lib/utils/string');

describe('String', function(){

  describe('replaceAll()', function(){
    var replaceAll = StringUtils.replaceAll;
    var phrase = 'the quick brown fox is quick and brown';
    it('should replace the search string with the replace string', function(){
      expect(replaceAll(phrase, 'quick', 'slow')).to.equal('the slow brown fox is slow and brown');
    });
    it('should replace multiple search strings with an object map of replacements', function(){
      expect(replaceAll(phrase, {
          'quick': 'slow',
          'brown': 'red'
        })).to.equal('the slow red fox is slow and red');
    });
    it('should return the original string if no search is provided', function(){
      expect(replaceAll(phrase)).to.equal(phrase);
    });
  });

});