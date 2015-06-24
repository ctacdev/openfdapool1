QUnit.module("FDA.Helpers.pageCount");
test("returns the total number of pages", function(){
  var metadata = {
    skip: 0,
    limit: 25,
    total: 100
  };

  equal(FDA.Helpers.pageCount(metadata), 4);
});

test("rounds the number of pages up when it does not divide evenly", function() {
  var metadata = {
    skip: 0,
    limit: 25,
    total: 110
  };

  equal(FDA.Helpers.pageCount(metadata), 5);
});

test("returns 1 page when there are less results" +
  " than the limit", function() {
  var metadata = {
    skip:0,
    limit: 25,
    total: 10
  }

  equal(FDA.Helpers.pageCount(metadata), 1);
})


QUnit.module("FDA.Helpers.currentPage");
test("returns 1 when skip = 0", function() {
  var metadata = {
    skip: 0,
    limit: 25,
    total: 100
  }
  equal(FDA.Helpers.currentPage(metadata), 1);
});

test("calculates the current page from skip and limit", function(){
  var metadata = {
    skip: 50,
    limit: 25,
    total: 100
  }
  equal(FDA.Helpers.currentPage(metadata), 3);
});
