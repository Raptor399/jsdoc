// Test how inheritance works using AMD notation with "exports", "class" and "lends".

/**
 * @exports Gnu
 */
define(["dojo/_base/declare"], function(declare) {
  /**
   * @class Gnu
   */
  return declare("Gnu", null,
    /** @lends Gnu.prototype */
    {
    /**
     * Not referenced with "this.prop1".
     * @private
     */
    prop1: null,

    /**
     * Referenced with "this.prop2", will it remain private?
     * @private
     */
    prop2: null,

    /**
     * Not referenced with "this.prop3".
     * @public
     */
    prop3: null,

    /**
     * Referenced with "this.prop4", will it remain public?
     * @public
     */
    prop4: null,

    /**
     * Some gnu function that sets "this.prop2" and "this.prop3".
     * @param val Value to set
     */
    setProps: function(val) {
      // Reference existing members.
      this.prop2 = val;
      this.prop4 = val;

      // This should create a new non-private property.
      this.prop5 = val;
    }
  });
});

/**
 * @exports Gnat
 */
define(["dojo/_base/declare", "Gnu"], function(declare, Gnu) {
  /**
   * Would expect this to contain "prop3" and "setProps()", but not "prop1" or "prop2"
   * as they are marked private.
   * @class Gnat
   * @extends Gnu
   */
  return declare("Gnat", null,
    /** @lends Gnat.prototype */
    {
    /**
     * Some gnat property.
     * @public
     */
    prop5: null
  });
});

