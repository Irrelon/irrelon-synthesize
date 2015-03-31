# Synthesize
Automatically create simple methods to get and set properties for JavaScript
modules, similar to the @synthesize directive in iOS Objective-C.

## Usage
In this example we create a getter/setter method called name() on the MyClass prototype:
	
	var MyClass = function () {};
	synthesize(MyClass.prototype, 'name');

You can then call the name method with an argument to set or no argument to get:

	// Instantiate MyClass
	var myClass = new MyClass();
	
	// Set name
	myClass.name('Jerry');
	
	// Get name
	var name = myClass.name();

## Custom Behaviour
The synthesize method takes a third argument that allows you to write code that executes
when the method is called and can apply custom logic before a get or set action is done:

	var MyClass = function () {};
	synthesize(MyClass.prototype, 'name', function (name) {
		// Check if we were passed a name (setter mode)
		if (name !== undefined) {
			// Check if the name argument passes validation (in this case, it must be a string)
			if (typeof name === 'string') {
				// The passed name is a string, allow the setter to operate
				// by calling the getter / setter method by accessing it
				// through the this.$super() method:
				return this.$super(name);
			} else {
				throw('Passed name does not validate!');
			}
		} else {
			// Getter mode
			return this.$super();
		}
	});