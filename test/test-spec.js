// This test file is purely for proof that mocha is installed and operational.
// It can be deleted after writing real tests.

// require chai and the chai http plugin...this must be done if using chai or chai http assertions

// Chai will be used for the assertion library with the mocha test framework to provide the describe/it
//  and running of tests.

const chai = require('chai'),
	chaiHttp = require('chai-http')

chai.use(chaiHttp)

var assert = require('assert')
describe('Array', function() {
	describe('#indexOf()', function() {
		it('should return -1 when the value is not present', function() {
			assert.equal([1, 2, 3].indexOf(4), -1)
		})
	})
})
