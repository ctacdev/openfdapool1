// Define our Foo prototype
function Foo(){
	this.truth = true;
}

function Bar(age){
	this.age = age;

	this.isOld = function(){
		return this.age > 75;
	};
}

test("Foo always says the truth", function() {
  foo = new Foo();

  equal(foo.truth, true, "foo.truth is not true");
});

test("Bar.isOld() returns true when older than 75", function() {
	bar = new Bar(76);
	equal(bar.isOld(), true, "Is that what you call old?");
});

test("Bar.isOld() returns false when younger than 75", function(){
	bar = new Bar(35);
	equal(bar.isOld(), false, "I'm not that old!");
})

test("This test should fail", function(){
	equal(2+2, 5)
})