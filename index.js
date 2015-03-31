/**
 * Generates a generic getter/setter method for the passed method name.
 * @param {Object} obj The object to add the getter/setter to.
 * @param {String} name The name of the getter/setter to generate.
 * @param {Function=} extend A method to call before executing the getter/setter.
 * The existing getter/setter can be accessed from the extend method via the
 * $super e.g. this.$super();
 */
var synthesize = function (obj, name, extend) {
	this._synth[name] = this._synth[name] || function (val) {
		if (val !== undefined) {
			this['_' + name] = val;
			return this;
		}

		return this['_' + name];
	};

	if (extend) {
		var self = this;

		obj[name] = function () {
			var tmp = this.$super,
				ret;

			this.$super = self._synth[name];
			ret = extend.apply(this, arguments);
			this.$super = tmp;

			return ret;
		};
	} else {
		obj[name] = this._synth[name];
	}
};

module.exports = synthesize;