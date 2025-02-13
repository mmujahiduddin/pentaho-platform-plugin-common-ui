/*! ******************************************************************************
 *
 * Pentaho
 *
 * Copyright (C) 2024 by Hitachi Vantara, LLC : http://www.pentaho.com
 *
 * Use of this software is governed by the Business Source License included
 * in the LICENSE.TXT file.
 *
 * Change Date: 2029-07-20
 ******************************************************************************/

define([
  "pentaho/visual/Model",
  "pentaho/data/filter/IsIn",
  "pentaho/data/filter/IsEqual",
  "pentaho/data/filter/And",
  "pentaho/data/filter/Or",
  "pentaho/data/filter/Not",
  "pentaho/data/Table",
  "pentaho/visual/action/SelectionModes"
], function(Model, IsInFilter, IsEqFilter, AndFilter, OrFilter, NotFilter, Table, SelectionModes) {

  "use strict";

  describe("pentaho.visual.action.SelectionModes", function() {

    var sales12k;
    var inStock;
    var model;

    beforeEach(function() {
      sales12k = new IsInFilter({property: "sales", values: [{_: "number", v: 12000}]});
      inStock = new IsEqFilter({property: "inStock", value: {_: "string", v: "true"}});

      var dataSpec = {
        model: [
          {name: "country", type: "string"},
          {name: "sales", type: "number"},
          {name: "inStock", type: "string"}
        ],
        rows: [
          {c: [{v: "Portugal"}, {v: 12000}, {v: "true"}]},
          {c: [{v: "Ireland"}, {v:  6000}, {v: "false"}]},
          {c: [{v: "France"}, {v: 50000}, {v: "true"}]},
          {c: [{v: "Germany"}, {v: 12000}, {v: "false"}]},
          {c: [{v: "Italy"}, {v: 12000}, {v: "false"}]}
        ]
      };

      model = new Model({
        data: new Table(dataSpec)
      });
    });

    describe("replace", function() {
      it("should discard current selection and return input selection", function() {
        var result = SelectionModes.replace.call(model, sales12k, inStock);

        expect(result).toBe(inStock);
      });
    });

    describe("toggle", function() {
      it("should remove the input selection from the current selection when " +
         "the input selection is fully contained in the current selection", function() {

        spyOn(SelectionModes, "add").and.callThrough();
        spyOn(SelectionModes, "remove").and.callThrough();

        var currentFilter = sales12k;
        var inputFilter = sales12k.and(inStock);

        var result = SelectionModes.toggle.call(model, currentFilter, inputFilter);

        expect(SelectionModes.add.calls.count()).toBe(0);

        expect(SelectionModes.remove.calls.count()).toBe(1);
        expect(SelectionModes.remove.calls.first().object).toBe(model);

        var args = SelectionModes.remove.calls.first().args;
        expect(args[0]).toBe(currentFilter);
        expect(args[1]).toBe(inputFilter);
      });

      it("should add the input selection from the current selection when " +
          "the input selection is partially contained in the current selection", function() {

        spyOn(SelectionModes, "add").and.callThrough();
        spyOn(SelectionModes, "remove").and.callThrough();

        // Portugal & France
        var inputFilter = inStock;

        // Portugal & Germany & Italy
        var currentFilter = sales12k;

        var result = SelectionModes.toggle.call(model, currentFilter, inputFilter);

        expect(SelectionModes.remove.calls.count()).toBe(0);

        expect(SelectionModes.add.calls.count()).toBe(1);
        expect(SelectionModes.add.calls.first().object).toBe(model);

        var args = SelectionModes.add.calls.first().args;
        expect(args[0]).toBe(currentFilter);
        expect(args[1]).toBe(inputFilter);

        expect(result instanceof OrFilter).toBe(true);
      });

      it("should add the input selection from the current selection when " +
          "the input selection is disjoint from the current selection", function() {

        spyOn(SelectionModes, "add").and.callThrough();
        spyOn(SelectionModes, "remove").and.callThrough();

        // Portugal & France
        var inputFilter = inStock;

        // Germany
        var currentFilter = new IsEqFilter({property: "country", value: {_: "string", v: "Germany"}});

        var result = SelectionModes.toggle.call(model, currentFilter, inputFilter);

        expect(SelectionModes.remove.calls.count()).toBe(0);

        expect(SelectionModes.add.calls.count()).toBe(1);
        expect(SelectionModes.add.calls.first().object).toBe(model);

        var args = SelectionModes.add.calls.first().args;
        expect(args[0]).toBe(currentFilter);
        expect(args[1]).toBe(inputFilter);

        expect(result instanceof OrFilter).toBe(true);
      });
    });

    describe("add", function() {
      it("should add the input selection to the current selection", function() {
        var result = SelectionModes.add.call(model, sales12k, inStock);

        expect(result instanceof OrFilter).toBe(true);
        expect(result.operands.at(0)).toBe(sales12k);
        expect(result.operands.at(1)).toBe(inStock);
      });
    });

    describe("remove", function() {
      it("should remove the input selection from the current selection", function() {
        var result = SelectionModes.remove.call(model, sales12k, inStock);

        expect(result.toDnf().$contentKey).toBe("(or (and (in sales 12000) (not (= inStock true))))");
      });
    });
  });
});
