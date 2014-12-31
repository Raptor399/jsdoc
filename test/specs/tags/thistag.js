'use strict';

describe('@this tag', function() {
    var docSet = jasmine.getDocSetFromFile('test/fixtures/thistag.js');
    var docSet2 = jasmine.getDocSetFromFile('test/fixtures/this4.js');

    var setName = docSet.getByLongname('setName')[0];
    var fooName = docSet.getByLongname('Foo#name')[0];

    it('When a symbol has a @this tag, the doclet has a this property that is set to that value.', function() {
        expect(setName['this']).toBe('Foo');
    });

    it('When a this symbol is documented inside a function with a @this tag, the symbol is documented as a member of that tags value.', function() {
        expect(typeof fooName).toBe('object');
        expect(fooName.name).toBe('name');
        expect(fooName.memberof).toBe('Foo');
        expect(fooName.scope).toBe('instance');
    });

    it('When a symbol inherits a member marked private it does not exist', function() {
        var gnatProp1 = docSet2.getByLongname('Gnat#prop1')[0];
        expect(gnatProp1).toBeUndefined();
    });

    it('When a symbol inherits a member marked private overwritten with "this" it does not exist', function() {
        var gnatProp2 = docSet2.getByLongname('Gnat#prop2')[0];
        expect(gnatProp2).toBeUndefined();
    });

    it('When a symbol inherits a member member marked public it exists', function() {
        var gnatProp3 = docSet2.getByLongname('Gnat#prop3')[0];
        expect(gnatProp3).toBeDefined();
        console.log(gnatProp3);
        expect(gnatProp3.access).toBe('public');
    });

    it('When a symbol inherits a member marked public overwritten with "this" it exists and is public', function() {
        var gnatProp4 = docSet2.getByLongname('Gnat#prop4')[0];
        expect(gnatProp4).toBeDefined();
        expect(gnatProp4.access).toBe('public');
    });

    it('When a symbol inherits a member created with "this" it exists', function() {
        var gnatProp5 = docSet2.getByLongname('Gnat#prop5')[0];
        expect(gnatProp5).toBeDefined();
    });
});
