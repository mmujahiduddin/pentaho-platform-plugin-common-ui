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

define([ "common-ui/util/TextFormatter" ], function(TextFormatter) {

  describe("TextFormatter", function() {

    describe("getFormatType", function() {
      var typeMap = {
        'number': 'number',
        'java.lang.Number': 'number',
        'java.lang.Byte': 'number',
        'java.lang.Short': 'number',
        'java.lang.Integer': 'number',
        'java.lang.Long': 'number',
        'java.lang.Float': 'number',
        'java.lang.Double': 'number',
        'java.math.BigDecimal': 'number',
        'java.math.BigInteger': 'number',

        'date': 'date',
        'java.util.Date': 'date',
        'java.sql.Date': 'date',
        'java.sql.Time': 'date',
        'java.sql.Timestamp': 'date'
      };

      it("should return correct format type", function() {
        for (var prop in typeMap) {
          var type = TextFormatter.getFormatType(prop);
          expect(type).toBe(typeMap[prop]);
        }
      });
    });

    describe("createFormatter", function() {
      it("should not generate any formatter", function() {
        var formatter = TextFormatter.createFormatter("incorrect type", "yyyy-MM-dd");
        expect(formatter).not.toBeDefined();
      });

      it("should generate number formatter", function() {
        var numValue = 10023;
        var formatter = TextFormatter.createFormatter("number", "#,##0.0");
        expect(formatter).toBeDefined();
        var numStrValue = formatter.format(numValue);
        expect(numStrValue).toEqual("10,023.0");
        expect(formatter.parse(numStrValue)).toEqual(numValue);

        expect(formatter.format(null)).toBeNull();
        expect(formatter.parse(null)).toBeNull();
      });

      it("should generate date formatter", function() {
        var dateValue = new Date(2015, 10, 27);
        var formatter = TextFormatter.createFormatter("date", "yyyy-MM-dd");
        expect(formatter).toBeDefined();
        var dateStrValue = formatter.format(dateValue);
        expect(dateStrValue).toEqual("2015-11-27");
        expect(formatter.parse(dateStrValue)).toEqual(dateValue);

        expect(formatter.format(null)).toBeNull();
        expect(formatter.parse(null)).toBeNull();
      });
    });
  });

});
